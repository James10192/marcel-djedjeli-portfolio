import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Github,
  Lightbulb,
  Scale,
  Wrench,
} from 'lucide-react'
import { caseStudyBySlug, publicCaseStudies } from '@/data/case-studies'
import { STATUS_META, familyOf, FAMILY_LABEL } from '@/components/case-study/meta'
import { ProjectLogo } from '@/components/case-study/project-logo'
import { Nav } from '@/components/nav'
import { ArchDiagram } from '@/components/case-study/arch-diagram'
import { Reveal } from '@/components/primitives/reveal'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projets/$slug')({
  component: CaseStudyPage,
  loader: ({ params }) => {
    const cs = caseStudyBySlug(params.slug)
    // Les projets confidentiels ne sont pas exposés publiquement.
    if (!cs || cs.confidential) throw notFound()
    return { cs }
  },
  head: ({ loaderData }) => {
    const cs = loaderData?.cs
    return {
      meta: cs
        ? [
            { title: `${cs.title.split(',')[0]} — Étude de cas · Marcel DJEDJE-LI` },
            { name: 'description', content: cs.oneLiner },
          ]
        : [{ title: 'Étude de cas' }],
    }
  },
})

function CaseStudyPage() {
  const { cs } = Route.useLoaderData()
  const st = STATUS_META[cs.status]

  // Navigation préc/suivant dans l'ordre public.
  const idx = publicCaseStudies.findIndex((c) => c.slug === cs.slug)
  const prev = idx > 0 ? publicCaseStudies[idx - 1] : null
  const next = idx >= 0 && idx < publicCaseStudies.length - 1 ? publicCaseStudies[idx + 1] : null

  return (
    <>
    <Nav />
    <div className="min-h-dvh bg-ink">
      {/* Barre de retour */}
      <div className="px-6 pt-28 md:px-12 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/projets"
            className="inline-flex h-10 items-center gap-2 border border-line px-4 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Toutes les études de cas
          </Link>
        </div>
      </div>

      {/* Hero */}
      <header className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
              {FAMILY_LABEL[familyOf(cs.slug)]}
            </span>
            <span className="text-line2">/</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {cs.year}
            </span>
            <span className="text-line2">/</span>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider',
                st.tone === 'prod' ? 'text-accent' : 'text-muted',
              )}
            >
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  st.tone === 'prod' ? 'bg-accent' : 'bg-muted',
                )}
              />
              {st.label}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <ProjectLogo slug={cs.slug} title={cs.title} className="h-16 w-16" />
            <h1 className="heading text-[clamp(30px,6vw,60px)]">{cs.title.split(',')[0]}</h1>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper md:text-lg">
            {cs.oneLiner}
          </p>

          {/* Métrique phare + liens */}
          <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-6">
            {cs.headlineMetric ? (
              <div>
                <div className="font-display text-4xl font-extrabold text-accent md:text-5xl">
                  {cs.headlineMetric.value}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {cs.headlineMetric.label}
                </div>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {cs.links?.live ? (
                <a
                  href={cs.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 bg-accent px-4 font-mono text-[11px] font-medium transition-colors hover:bg-accent-soft"
                  style={{ color: '#0a0a08' }}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Voir le projet
                </a>
              ) : null}
              {cs.links?.github ? (
                <a
                  href={cs.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 border border-line px-4 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
              ) : null}
              {cs.links?.docs ? (
                <a
                  href={cs.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 border border-line px-4 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Docs
                </a>
              ) : null}
            </div>
          </div>

          {/* Rôle + stack */}
          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="mono-caps text-accent">Mon rôle</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{cs.role}</p>
            </div>
            <div>
              <h2 className="mono-caps text-accent">Stack</h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {cs.stack.map((t) => (
                  <span
                    key={t}
                    className="border border-line px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-px bg-line">
        {/* Contexte */}
        <Block num="01" title="Contexte &amp; problème">
          <p className="text-[15px] leading-[1.8] text-paper">{cs.context}</p>
        </Block>

        {/* Architecture */}
        <Block num="02" title="Architecture">
          <p className="text-[15px] leading-[1.8] text-paper">{cs.architectureSummary}</p>
          <div className="mt-8 border border-line bg-ink p-4 md:p-6">
            <ArchDiagram
              nodes={cs.architectureDiagram.nodes}
              edges={cs.architectureDiagram.edges}
            />
          </div>
        </Block>

        {/* Décisions */}
        {cs.decisions.length > 0 ? (
          <Block num="03" title="Décisions techniques">
            <div className="space-y-px bg-line">
              {cs.decisions.map((d, i) => (
                <div key={i} className="bg-ink2 p-6 md:p-7">
                  <div className="flex items-start gap-3">
                    <Scale className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <h3 className="font-display text-lg font-bold leading-snug">{d.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-paper">
                    <span className="mono-caps text-accent">Choix · </span>
                    {d.choice}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    <span className="mono-caps text-muted">Pourquoi · </span>
                    {d.rationale}
                  </p>
                  <p className="mt-2 border-l-2 border-accent-2/40 pl-3 text-sm leading-relaxed text-muted">
                    <span className="mono-caps" style={{ color: 'var(--color-accent-2)' }}>
                      Arbitrage ·{' '}
                    </span>
                    {d.tradeoff}
                  </p>
                </div>
              ))}
            </div>
          </Block>
        ) : null}

        {/* Défis */}
        {cs.challenges.length > 0 ? (
          <Block num="04" title="Défis &amp; solutions">
            <div className="space-y-5">
              {cs.challenges.map((c, i) => (
                <div key={i}>
                  <div className="flex items-start gap-3">
                    <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                    <p className="text-[15px] font-medium leading-relaxed text-paper">
                      {c.problem}
                    </p>
                  </div>
                  <div className="mt-2 flex items-start gap-3 pl-7">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted">{c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </Block>
        ) : null}

        {/* Résultats */}
        {cs.results.length > 0 ? (
          <Block num="05" title="Résultats &amp; impact">
            <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-3">
              {cs.results.map((m, i) => (
                <div key={i} className="bg-ink2 p-6">
                  <div className="font-display text-3xl font-extrabold text-accent">{m.value}</div>
                  <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-wider text-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </Block>
        ) : null}
      </div>

      {/* Nav préc/suivant */}
      <nav className="mt-px grid grid-cols-1 gap-px bg-line md:grid-cols-2">
        {prev ? (
          <Link
            to="/projets/$slug"
            params={{ slug: prev.slug }}
            className="group flex items-center gap-3 bg-ink px-6 py-8 transition-colors hover:bg-ink2 md:px-12"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                Précédent
              </span>
              <span className="mt-1 block font-display font-bold text-paper transition-colors group-hover:text-accent">
                {prev.title.split(',')[0]}
              </span>
            </span>
          </Link>
        ) : (
          <span className="hidden bg-ink md:block" />
        )}
        {next ? (
          <Link
            to="/projets/$slug"
            params={{ slug: next.slug }}
            className="group flex items-center justify-end gap-3 bg-ink px-6 py-8 text-right transition-colors hover:bg-ink2 md:px-12"
          >
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                Suivant
              </span>
              <span className="mt-1 block font-display font-bold text-paper transition-colors group-hover:text-accent">
                {next.title.split(',')[0]}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
          </Link>
        ) : null}
      </nav>

      {/* CTA bas de page */}
      <div className="border-t border-line px-6 py-16 text-center md:px-12">
        <p className="text-sm text-muted">Un projet en tête, une équipe à renforcer ?</p>
        <Link
          to="/"
          hash="contact"
          className="mt-4 inline-flex h-11 items-center gap-2 bg-accent px-6 font-mono text-xs font-medium transition-colors hover:bg-accent-soft"
          style={{ color: '#0a0a08' }}
        >
          Me contacter
        </Link>
      </div>
    </div>
    </>
  )
}

function Block({
  num,
  title,
  children,
}: {
  num: string
  title: string
  children: React.ReactNode
}) {
  return (
    <Reveal as="section" className="bg-ink px-6 py-12 md:px-12 md:py-16" y={30}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-7 flex items-baseline gap-4">
          <span className="font-mono text-[11px] tracking-widest text-accent">{num} —</span>
          <h2 className="heading text-[clamp(22px,4vw,36px)]">{title}</h2>
        </div>
        {children}
      </div>
    </Reveal>
  )
}
