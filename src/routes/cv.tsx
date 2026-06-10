import { createFileRoute, Link } from '@tanstack/react-router'
import { Download, ArrowLeft } from 'lucide-react'
import { personal } from '@/data/personal'
import { experiences } from '@/data/experiences'
import { skillGroups } from '@/data/skills'

export const Route = createFileRoute('/cv')({
  component: CVPage,
  head: () => ({
    meta: [
      { title: `CV — ${personal.shortName}` },
      {
        name: 'description',
        content: `CV de ${personal.shortName}, ${personal.role} basé à Abidjan.`,
      },
    ],
  }),
})

function CVPage() {
  return (
    <main className="min-h-dvh px-6 py-12 md:px-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header bar */}
        <div className="mb-8 flex items-center justify-between gap-4 print:hidden">
          <Link
            to="/"
            className="inline-flex h-10 items-center gap-2 border border-line px-4 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour
          </Link>
          <a
            href={personal.cvPdf}
            download
            className="inline-flex h-10 items-center gap-2 bg-accent px-5 font-mono text-xs font-medium transition-colors hover:bg-accent-soft"
            style={{ color: '#0a0a08' }}
          >
            <Download className="h-3.5 w-3.5" />
            Télécharger le PDF
          </a>
        </div>

        {/* CV content */}
        <article className="surface p-8 md:p-12">
          <header className="border-b border-line pb-6">
            <h1 className="heading text-3xl md:text-4xl">
              {personal.name.split(' ').slice(0, 2).join(' ')}
              <br />
              <em>{personal.name.split(' ').slice(2).join(' ')}</em>
            </h1>
            <p className="mono-caps mt-3 text-accent">
              {personal.currentRole}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-muted md:grid-cols-3">
              <div>{personal.location}</div>
              <div>{personal.email}</div>
              <div>{personal.phone}</div>
            </div>
          </header>

          {/* Summary */}
          <section className="mt-8">
            <h2 className="mono-caps mb-3 text-accent">Profil</h2>
            <p className="text-sm leading-relaxed text-paper">
              {personal.shortBio}
            </p>
          </section>

          {/* Experience */}
          <section className="mt-8">
            <h2 className="mono-caps mb-4 text-accent">Expérience</h2>
            <div className="space-y-6">
              {experiences.map((e) => (
                <div key={e.company + e.date}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-base font-bold">{e.company}</h3>
                    <span className="text-xs text-muted">{e.date}</span>
                  </div>
                  <div className="mono-caps mt-0.5 text-accent">{e.role}</div>
                  <ul className="mt-2 space-y-1 text-xs leading-relaxed text-muted">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="pl-4 before:absolute before:-ml-3 before:content-['·']">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mt-8">
            <h2 className="mono-caps mb-4 text-accent">Compétences</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {skillGroups.map((g) => (
                <div key={g.title}>
                  <h3 className="font-display text-sm font-bold">{g.title}</h3>
                  <p className="mt-1 text-xs text-muted">{g.tags.join(' · ')}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mt-8">
            <h2 className="mono-caps mb-4 text-accent">Formation</h2>
            <div className="space-y-3">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-bold">
                    BSc (Hons) Business Computing and Information Systems
                  </h3>
                  <span className="text-xs text-muted">Depuis 2019</span>
                </div>
                <p className="text-xs text-muted">
                  University of Central Lancashire via NCC Education · BAC+3
                </p>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-bold">
                    Baccalauréat série D
                  </h3>
                  <span className="text-xs text-muted">2019</span>
                </div>
                <p className="text-xs text-muted">Collège Catholique Saint Jean Bosco</p>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section className="mt-8">
            <h2 className="mono-caps mb-3 text-accent">Langues</h2>
            <p className="text-sm text-paper">{personal.languages}</p>
          </section>
        </article>

        <div className="mt-6 text-center text-xs text-muted print:hidden">
          Version PDF originale disponible via le bouton « Télécharger »
        </div>
      </div>
    </main>
  )
}
