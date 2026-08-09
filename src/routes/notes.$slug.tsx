import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Clock, Linkedin, Mail, MessageCircle, Users } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Reveal } from '@/components/primitives/reveal'
import { personal } from '@/data/personal'
import {
  LINKEDIN_URL,
  SITE_URL,
  episodeLabel,
  formatNoteDate,
  nextPublishedNote,
  publishedNoteBySlug,
  readingMinutes,
} from '@/data/notes'
import { ShareBar } from '@/components/share-bar'

export const Route = createFileRoute('/notes/$slug')({
  component: NotePage,
  loader: ({ params }) => {
    // Un slug inconnu ou un épisode encore « à venir » n'est pas lisible.
    const note = publishedNoteBySlug(params.slug)
    if (!note) throw notFound()
    return { note, next: nextPublishedNote(note.slug) ?? null }
  },
  head: ({ loaderData }) => {
    const note = loaderData?.note
    if (!note) return { meta: [{ title: 'Note introuvable · African Builder Notes' }] }
    const title = `${note.title} · African Builder Notes`
    const url = `${SITE_URL}/notes/${note.slug}`
    const image = `${SITE_URL}/og/notes/${note.slug}.png`
    return {
      meta: [
        { title },
        { name: 'description', content: note.thesis },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: note.thesis },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: note.thesis },
        { name: 'twitter:image', content: image },
        { property: 'article:published_time', content: note.date },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
})

function NotePage() {
  const { note, next } = Route.useLoaderData()

  return (
    <>
      <Nav />
      <div className="min-h-dvh">
        {/* Barre de retour */}
        <div className="px-6 pt-28 md:px-12 md:pt-32">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/notes"
              className="inline-flex h-11 items-center gap-2 border border-line px-4 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Toutes les notes
            </Link>
          </div>
        </div>

        {/* En-tête de la note */}
        <header id="main" className="px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted">
              <span className="text-accent">African Builder Notes</span>
              <span className="text-line2">/</span>
              <span>Épisode {episodeLabel(note.episode)}</span>
              <span className="text-line2">/</span>
              <span>{formatNoteDate(note.date)}</span>
              <span className="text-line2">/</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {readingMinutes(note)} min de lecture
              </span>
            </div>

            {/* Le numéro passe au-dessus du titre sur écran étroit : côte à
                côte, il ne laissait pas assez de largeur et coupait les mots
                longs du titre. */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5 md:gap-7">
              <span
                className="font-display text-[44px] font-extrabold leading-[0.8] tracking-tighter text-accent tabular-nums sm:text-[56px] md:text-[80px]"
                aria-hidden
              >
                {episodeLabel(note.episode)}
              </span>
              <h1 className="heading min-w-0 flex-1 text-[clamp(24px,5.5vw,50px)] [overflow-wrap:anywhere] [hyphens:auto]">
                {note.title}
              </h1>
            </div>

            <p className="mt-8 max-w-[68ch] border-l-2 border-accent pl-5 text-base leading-[1.8] text-paper md:text-lg">
              {note.chapo}
            </p>

            <div className="mt-8 flex max-w-[68ch] flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-muted">
                <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>
                  <span className="mono-caps text-accent">Pour qui · </span>
                  {note.audience}
                </span>
              </p>
              <div className="shrink-0">
                <ShareBar
                  compact
                  url={`${SITE_URL}/notes/${note.slug}`}
                  title={`${note.title} · African Builder Notes ${episodeLabel(note.episode)}`}
                  summary={note.thesis}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Corps de la note */}
        <div className="px-6 md:px-12">
          <div className="mx-auto max-w-3xl">
            {note.sections.map((section, i) => (
              <Reveal as="section" key={section.heading} className="pb-12 md:pb-14" y={24}>
                {/* Sous-titre en repère de plan : numéro cadré, titre, filet.
                    Sur mobile le numéro reste compact au-dessus du titre pour
                    laisser toute la largeur aux mots longs. */}
                <div className="mb-6 border-t border-line pt-6">
                  <span className="font-mono text-[11px] tracking-widest text-accent tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="heading mt-2 text-[clamp(21px,3.4vw,30px)]">{section.heading}</h2>
                </div>

                <div className="max-w-[68ch] space-y-5">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-[16px] leading-[1.85] text-paper/90">
                      {p}
                    </p>
                  ))}

                  {section.bullets ? (
                    <ul className="space-y-3 pt-1">
                      {section.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-[16px] leading-[1.8] text-paper/90"
                        >
                          <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Question de débat */}
        <div className="px-6 pb-16 md:px-12 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <aside className="surface max-w-[68ch] p-7 md:p-9">
              <span className="mono-caps text-accent">La question de cet épisode</span>
              <p className="mt-4 font-display text-xl font-extrabold leading-snug tracking-tight text-paper md:text-2xl">
                {note.debate}
              </p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
                Répondez-moi directement. Je lis tout, et les meilleures objections finissent
                souvent dans l'épisode suivant.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <a
                  href={`https://wa.me/${personal.whatsappIntl}?text=${encodeURIComponent(
                    `Bonjour Marcel, je réagis à la note ${episodeLabel(note.episode)} : ${note.title}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 bg-accent px-5 font-mono text-[11px] font-medium transition-colors hover:bg-accent-soft"
                  style={{ color: '#0a0a08' }}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Me répondre sur WhatsApp
                </a>
                {LINKEDIN_URL ? (
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 border border-line px-5 font-mono text-[11px] text-paper transition-colors hover:border-accent hover:text-accent"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    Commenter sur LinkedIn
                  </a>
                ) : null}
                <a
                  href={`mailto:${personal.email}?subject=${encodeURIComponent(
                    `African Builder Notes ${episodeLabel(note.episode)}`,
                  )}`}
                  className="inline-flex h-11 items-center gap-2 border border-line px-5 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Par e-mail
                </a>
              </div>
            </aside>

            {/* Partage : le lecteur convaincu devient distributeur */}
            <div className="mt-10 max-w-[68ch]">
              <ShareBar
                url={`${SITE_URL}/notes/${note.slug}`}
                title={`${note.title} · African Builder Notes ${episodeLabel(note.episode)}`}
                summary={note.thesis}
              />
            </div>
          </div>
        </div>

        {/* Navigation vers la note suivante */}
        <nav className="border-t border-line">
          {next ? (
            <Link
              to="/notes/$slug"
              params={{ slug: next.slug }}
              className="group block px-6 py-10 transition-colors hover:bg-ink2 md:px-12"
            >
              <div className="mx-auto flex max-w-3xl items-center justify-between gap-6">
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                    Note suivante · Épisode {episodeLabel(next.episode)}
                  </span>
                  <span className="mt-2 block font-display text-lg font-extrabold leading-snug text-paper transition-colors group-hover:text-accent md:text-xl">
                    {next.title}
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
              </div>
            </Link>
          ) : (
            <div className="px-6 py-10 text-center md:px-12">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                Dernière note publiée
              </p>
              <Link
                to="/notes"
                className="mt-4 inline-flex h-11 items-center gap-2 border border-line px-5 font-mono text-[11px] text-paper transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Revenir à la série
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  )
}
