import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Plate, PlateLabel } from '@/components/primitives/plate'
import { useGsapEffect } from '@/lib/use-gsap'
import { prefersReducedMotion } from '@/lib/utils'
import {
  episodeLabel,
  formatNoteDate,
  notes,
  publishedNotes,
  readingMinutes,
  type Note,
  type PublishedNote,
} from '@/data/notes'

gsap.registerPlugin(ScrollTrigger)

/**
 * Le journal du bâtisseur.
 *
 * Une de journal posée sur la planche : la pensée passe devant les ouvrages.
 * La note la plus récente occupe le grand cadre, les autres épisodes forment
 * la colonne d'appui à droite (à venir en crochets sourds, non cliquables).
 *
 * Volontairement différent des cartes projets : pas de grille de blocs
 * identiques, une seule hiérarchie forte suivie d'un sommaire compact.
 *
 * Tout le contenu est dans le HTML serveur : les animations ne font que
 * rejouer une entrée déjà visible, et sont neutres si le visiteur a demandé
 * moins de mouvement.
 */

/**
 * Le mot du titre porté en italique serif lime, par épisode. Repère de
 * composition, pas de la donnée : il vit donc ici et non dans `src/data`.
 * Un slug absent retombe sur le dernier mot du titre.
 */
const TITLE_EMPHASIS: Record<string, string> = {
  'le-code-n-est-pas-le-produit': 'le produit',
  'former-des-batisseurs': 'bâtisseurs',
  'la-souverainete-se-finance': 'se finance',
  '7600-etudiants-en-production': 'en production',
}

function splitTitle(note: Note): { before: string; emphasis: string; after: string } {
  const title = note.title
  const fallback = title.replace(/[.?!·]+\s*$/, '').trim().split(/\s+/).at(-1) ?? ''
  const target = TITLE_EMPHASIS[note.slug] ?? fallback
  const at = target ? title.indexOf(target) : -1
  if (at < 0) return { before: title, emphasis: '', after: '' }
  return {
    before: title.slice(0, at),
    emphasis: target,
    after: title.slice(at + target.length),
  }
}

export function Journal() {
  const ref = useRef<HTMLElement>(null)

  // La une : la note publiée la plus récente. Si rien n'est publié, la
  // section ne s'affiche pas plutôt que de livrer un cadre vide.
  const featured: PublishedNote | undefined = [...publishedNotes].sort((a, b) =>
    b.date.localeCompare(a.date),
  )[0]

  useGsapEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    gsap.from('[data-journal-lead]', {
      autoAlpha: 0,
      y: 30,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
    })

    const items = ref.current.querySelectorAll<HTMLElement>('[data-journal-item]')
    if (items.length) {
      gsap.from(items, {
        autoAlpha: 0,
        y: 18,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.09,
        delay: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      })
    }
  }, ref)

  if (!featured) return null

  const rest = notes.filter((n) => n.slug !== featured.slug)
  const upcomingCount = notes.length - publishedNotes.length
  const { before, emphasis, after } = splitTitle(featured)

  return (
    <section
      ref={ref}
      id="journal"
      className="relative overflow-hidden px-6 pb-20 pt-6 md:px-12 md:pb-28 md:pt-8"
    >
      {/* Chiffre géant décoratif */}
      <div
        className="pointer-events-none absolute right-2 top-8 font-display text-[100px] font-extrabold leading-none text-accent opacity-[0.025] md:right-12 md:top-12 md:text-[260px]"
        aria-hidden
      >
        06
      </div>

      <SectionHeader
        num="06"
        state="parution en cours"
        title="Le journal du bâtisseur"
        caption="Ce que je construis me donne de quoi écrire. African Builder Notes : une thèse par épisode, tirée de ce qui casse et de ce qui tient en production, et une question ouverte à la fin."
      />

      {/* Bandeau de une : le titre du journal, son millésime. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-line pb-3">
        <PlateLabel accent>African Builder Notes</PlateLabel>
        <PlateLabel>
          Abidjan · n° {episodeLabel(featured.episode)} ·{' '}
          <span className="tabular-nums">{publishedNotes.length}</span> parue
          {publishedNotes.length > 1 ? 's' : ''} ·{' '}
          <span className="tabular-nums">{upcomingCount}</span> en écriture
        </PlateLabel>
      </div>

      {/* Composition asymétrique : la une, puis la colonne d'appui. */}
      <div className="mt-9 grid grid-cols-1 gap-y-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-0">
        {/* LA UNE */}
        <article data-journal-lead className="min-w-0">
          <Plate
            size="lg"
            tint
            live
            label="note de la semaine"
            labelRight={`épisode ${episodeLabel(featured.episode)}`}
            className="@container h-full px-5 py-8 sm:px-8 sm:py-10"
          >
            <Link
              to="/notes/$slug"
              params={{ slug: featured.slug }}
              className="group flex h-full min-w-0 flex-col"
            >
              {/* Ligne de repères : l'épisode en gros chiffre, la date, la durée. */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span
                  className="font-display text-[34px] font-extrabold leading-none tracking-tighter tabular-nums text-accent sm:text-[46px]"
                  aria-hidden
                >
                  {episodeLabel(featured.episode)}
                </span>
                <span className="plate-dash hidden min-w-[40px] sm:block" aria-hidden />
                <PlateLabel>{formatNoteDate(featured.date)}</PlateLabel>
                <PlateLabel className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" aria-hidden />
                  {readingMinutes(featured)} min de lecture
                </PlateLabel>
              </div>

              <h3 className="heading mt-6 text-[clamp(28px,10cqi,64px)] leading-[1.02] [overflow-wrap:anywhere]">
                {before}
                {emphasis && <em>{emphasis}</em>}
                {after}
              </h3>

              <p className="mt-6 max-w-2xl text-[14.5px] leading-[1.75] text-muted md:text-[15.5px]">
                {featured.chapo}
              </p>

              <div className="mt-7 flex flex-1 flex-col justify-end">
                <PlateLabel className="mb-2 block">écrit pour</PlateLabel>
                <p className="mb-7 max-w-xl font-mono text-[11.5px] leading-relaxed text-muted">
                  {featured.audience}
                </p>

                <span className="inline-flex h-12 w-fit items-center gap-2.5 bg-accent px-6 font-mono text-[11px] font-medium uppercase tracking-wider transition-colors group-hover:bg-accent-soft" style={{ color: '#0a0a08' }}>
                  Lire la note
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Plate>
        </article>

        {/* COLONNE D'APPUI : le sommaire de la série. */}
        <aside className="min-w-0 lg:border-l lg:border-line lg:pl-10">
          <PlateLabel className="mb-4 block">au sommaire</PlateLabel>

          <ul className="flex flex-col gap-3">
            {rest.map((note) => (
              <li key={note.slug} data-journal-item>
                {note.status === 'publie' ? (
                  <Link
                    to="/notes/$slug"
                    params={{ slug: note.slug }}
                    className="group block"
                  >
                    <Plate
                      size="sm"
                      live
                      className="flex min-h-[3.75rem] items-start gap-3.5 px-4 py-3.5"
                    >
                      <span
                        className="mt-0.5 shrink-0 font-mono text-[11px] leading-none tabular-nums text-accent"
                        aria-hidden
                      >
                        {episodeLabel(note.episode)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[14.5px] font-bold leading-snug tracking-tight text-paper transition-colors group-hover:text-accent">
                          {note.title}
                        </span>
                        <span className="mt-1.5 block font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-muted">
                          {formatNoteDate(note.date)}
                          <span aria-hidden> · </span>
                          {readingMinutes(note)} min
                        </span>
                      </span>
                      <ArrowUpRight
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        aria-hidden
                      />
                    </Plate>
                  </Link>
                ) : (
                  <Plate
                    size="sm"
                    quiet
                    aria-disabled="true"
                    className="flex min-h-[3.75rem] items-start gap-3.5 px-4 py-3.5"
                  >
                    <span
                      className="mt-0.5 shrink-0 font-mono text-[11px] leading-none tabular-nums text-line2"
                      aria-hidden
                    >
                      {episodeLabel(note.episode)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[14.5px] font-bold leading-snug tracking-tight text-muted">
                        {note.title}
                      </span>
                      <PlateLabel className="mt-1.5 block">[ à venir ]</PlateLabel>
                    </span>
                  </Plate>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line pt-5">
            <PlateLabel className="mb-2 block">rythme</PlateLabel>
            <p className="text-[12.5px] leading-relaxed text-muted">
              Une note quand le chantier m'a appris quelque chose, pas quand le calendrier
              la réclame. Les épisodes annoncés sont en cours d'écriture.
            </p>
          </div>
        </aside>
      </div>

      {/* Pied de section : la démarche en une phrase, puis la section entière. */}
      <div className="mt-12 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between md:mt-14">
        <p className="max-w-xl text-[13.5px] leading-relaxed text-muted">
          J'écris ce que je n'ai trouvé nulle part quand j'en avais besoin : ce que coûte
          vraiment un logiciel dont d'autres dépendent, ici, à Abidjan.
        </p>
        <Link
          to="/notes"
          className="group inline-flex h-12 shrink-0 items-center gap-2.5 border border-line px-6 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-accent hover:text-accent"
        >
          Toutes les notes
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
