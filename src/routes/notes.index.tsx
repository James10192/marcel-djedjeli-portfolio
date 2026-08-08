import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight, Clock, Lock } from 'lucide-react'
import { Nav } from '@/components/nav'
import { RevealStagger } from '@/components/primitives/reveal'
import { Plate, PlateLabel, SheetHeader } from '@/components/primitives/plate'
import {
  episodeLabel,
  formatNoteDate,
  notes,
  publishedNotes,
  readingMinutes,
} from '@/data/notes'

export const Route = createFileRoute('/notes/')({
  component: NotesIndex,
  head: () => ({
    meta: [
      { title: 'African Builder Notes · Marcel DJEDJE-LI' },
      {
        name: 'description',
        content:
          "Une série d'épisodes écrits depuis Abidjan sur le passage du développeur au bâtisseur : produit, revenu, équipe, souveraineté numérique et logiciel en production.",
      },
      { property: 'og:title', content: 'African Builder Notes · Marcel DJEDJE-LI' },
      {
        property: 'og:description',
        content:
          'Ce que j\'apprends en construisant des plateformes qui tournent vraiment, en Afrique francophone.',
      },
    ],
  }),
})

function NotesIndex() {
  const upcomingCount = notes.length - publishedNotes.length

  return (
    <>
      <Nav />
      <main id="main" className="min-h-dvh pb-12 md:pb-20">
        {/* En-tête de planche : la page de section répond à l'accueil. */}
        <div style={{ paddingTop: 'calc(4.75rem + env(safe-area-inset-top))' }}>
          <SheetHeader
            reference="Planche · notes · African Builder Notes"
            revision={`rév. ${episodeLabel(publishedNotes.length)} · Abidjan`}
          />
        </div>

        <div className="px-6 pt-10 md:px-12 md:pt-14">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex h-11 items-center gap-2 border border-line px-4 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour
          </Link>

          <header className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-line pb-3">
              <PlateLabel accent>African Builder Notes</PlateLabel>
              <PlateLabel>série éditoriale · une thèse par épisode</PlateLabel>
            </div>

            <h1 className="heading mt-8 text-[clamp(32px,6vw,64px)]">
              Ce que j'apprends
              <br />
              en <em>construisant</em>
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              Une série d'épisodes écrits depuis Abidjan. Pas de tutoriel, pas de tendance :
              une thèse par note, tirée de ce que je vis en livrant des plateformes qui
              tournent vraiment, et une question ouverte à la fin. Les réponses m'intéressent
              autant que les notes.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted">
              <span className="text-accent tabular-nums">{publishedNotes.length}</span> note
              {publishedNotes.length > 1 ? 's' : ''} publiée{publishedNotes.length > 1 ? 's' : ''}
              <span className="mx-2 text-line2">·</span>
              <span className="text-accent tabular-nums">{upcomingCount}</span> à venir
            </p>
          </header>

          <RevealStagger className="mt-12 flex flex-col gap-4 md:mt-16 md:gap-5">
            {notes.map((note) =>
              note.status === 'publie' ? (
                <article key={note.slug}>
                  <Link to="/notes/$slug" params={{ slug: note.slug }} className="group block">
                    <Plate
                      tint
                      live
                      label={`épisode ${episodeLabel(note.episode)}`}
                      labelRight="publiée"
                      className="flex flex-col gap-5 px-6 py-8 sm:flex-row sm:gap-8 md:px-9 md:py-10"
                    >
                      <div
                        className="font-display text-[52px] font-extrabold leading-none tracking-tighter text-accent tabular-nums sm:text-[64px]"
                        aria-hidden
                      >
                        {episodeLabel(note.episode)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-wider text-muted">
                          <span>{formatNoteDate(note.date)}</span>
                          <span className="text-line2">/</span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            {readingMinutes(note)} min
                          </span>
                        </div>

                        <h2 className="mt-3 font-display text-xl font-extrabold leading-tight tracking-tight text-paper transition-colors group-hover:text-accent md:text-2xl">
                          {note.title}
                        </h2>

                        <p className="mt-3 text-[13.5px] leading-relaxed text-muted md:text-sm">
                          {note.chapo}
                        </p>

                        <span className="mt-5 inline-flex h-11 items-center gap-1.5 font-mono text-[11px] text-paper transition-colors group-hover:text-accent">
                          Lire la note
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </Plate>
                  </Link>
                </article>
              ) : (
                <article key={note.slug} aria-disabled="true">
                  <Plate
                    quiet
                    label={`épisode ${episodeLabel(note.episode)}`}
                    labelRight="[ à venir ]"
                    className="flex flex-col gap-5 px-6 py-8 sm:flex-row sm:gap-8 md:px-9 md:py-10"
                  >
                    <div
                      className="font-display text-[52px] font-extrabold leading-none tracking-tighter text-line2 tabular-nums sm:text-[64px]"
                      aria-hidden
                    >
                      {episodeLabel(note.episode)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <PlateLabel className="inline-flex items-center gap-1.5">
                        <Lock className="h-3 w-3" aria-hidden />
                        Épisode non publié
                      </PlateLabel>

                      <h2 className="mt-3 font-display text-xl font-extrabold leading-tight tracking-tight text-muted md:text-2xl">
                        {note.title}
                      </h2>

                      <p className="mt-3 text-[13.5px] leading-relaxed text-muted/80 md:text-sm">
                        {note.thesis}
                      </p>

                      <span className="mt-5 inline-block font-mono text-[11px] text-muted/70">
                        Épisode en cours d'écriture.
                      </span>
                    </div>
                  </Plate>
                </article>
              ),
            )}
          </RevealStagger>

          {/* CTA bas de page */}
          <div className="mt-16 border-t border-line pt-12 text-center md:mt-20">
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Chaque note se termine par une question. Si une réponse vous vient, elle
              m'intéresse plus que n'importe quel like.
            </p>
            <Link
              to="/"
              hash="contact"
              className="mt-6 inline-flex h-11 items-center gap-2 bg-accent px-6 font-mono text-xs font-medium transition-colors hover:bg-accent-soft"
              style={{ color: '#0a0a08' }}
            >
              Me répondre
            </Link>
          </div>
        </div>
        </div>
      </main>
    </>
  )
}
