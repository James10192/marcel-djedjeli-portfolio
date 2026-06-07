import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { publicCaseStudies } from '@/data/case-studies'
import { FAMILY_LABEL, STATUS_META, familyOf, type Family } from '@/components/case-study/meta'
import { ProjectLogo } from '@/components/case-study/project-logo'
import { Nav } from '@/components/nav'
import { RevealStagger, staggerItem } from '@/components/primitives/reveal'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projets/')({
  component: ProjectsIndex,
  head: () => ({
    meta: [
      { title: 'Études de cas — Marcel DJEDJE-LI' },
      {
        name: 'description',
        content:
          "Études de cas détaillées des plateformes conçues par Marcel DJEDJE-LI : architecture, décisions techniques, défis et impact. Klassci, AKWABA, SmartLink et plus.",
      },
    ],
  }),
})

const FAMILIES: Array<Family | 'all'> = ['all', 'saas', 'vitrine', 'oss', 'interne']

function ProjectsIndex() {
  const [family, setFamily] = useState<Family | 'all'>('all')

  const items = useMemo(() => {
    const withFamily = publicCaseStudies.map((c) => ({ ...c, family: familyOf(c.slug) }))
    return family === 'all' ? withFamily : withFamily.filter((c) => c.family === family)
  }, [family])

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: publicCaseStudies.length }
    for (const c of publicCaseStudies) {
      const f = familyOf(c.slug)
      m[f] = (m[f] ?? 0) + 1
    }
    return m
  }, [])

  return (
    <>
    <Nav />
    <div className="min-h-dvh bg-ink px-6 pb-12 pt-28 md:px-12 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex h-10 items-center gap-2 border border-line px-4 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour
        </Link>

        <header className="mt-10">
          <span className="font-mono text-[11px] tracking-widest text-accent">ÉTUDES DE CAS</span>
          <h1 className="heading mt-3 text-[clamp(32px,6vw,64px)]">
            Comment je <em>construis</em>.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Pas seulement ce que j'ai livré : le problème métier, les contraintes du terrain
            africain, les décisions d'architecture et leurs arbitrages. Chaque étude est ancrée
            dans le code réel du projet.
          </p>
        </header>

        {/* Filtres famille */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FAMILIES.map((f) => {
            const active = family === f
            const label = f === 'all' ? 'Tout' : FAMILY_LABEL[f]
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFamily(f)}
                className={cn(
                  'inline-flex h-10 items-center gap-2 border px-4 font-mono text-[11px] uppercase tracking-wider transition-colors',
                  active
                    ? 'border-accent bg-accent text-ink'
                    : 'border-line text-muted hover:border-accent hover:text-accent',
                )}
                style={active ? { color: '#0a0a08' } : undefined}
              >
                {label}
                <span className={cn('tabular-nums', active ? 'opacity-70' : 'text-muted')}>
                  {counts[f] ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        {/* Grille */}
        <RevealStagger className="mt-8 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => {
            const st = STATUS_META[c.status]
            return (
              <motion.div key={c.slug} variants={staggerItem} className="bg-ink">
                <Link
                  to="/projets/$slug"
                  params={{ slug: c.slug }}
                  className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-ink2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-accent">
                      {FAMILY_LABEL[c.family]}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider',
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

                  <ProjectLogo slug={c.slug} title={c.title} className="mt-5 h-11 w-11" />

                  <h2 className="mt-4 font-display text-xl font-extrabold leading-tight tracking-tight">
                    {c.title.split(',')[0]}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
                    {c.oneLiner}
                  </p>

                  {c.headlineMetric ? (
                    <div className="mt-5 border-t border-line pt-4">
                      <div className="font-display text-2xl font-extrabold text-accent">
                        {c.headlineMetric.value}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        {c.headlineMetric.label}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {c.stack.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted"
                      >
                        {t}
                      </span>
                    ))}
                    {c.stack.length > 4 ? (
                      <span className="px-1 py-0.5 text-[10px] text-muted">
                        +{c.stack.length - 4}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] text-paper transition-colors group-hover:text-accent">
                    Lire l'étude de cas
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </RevealStagger>
      </div>
    </div>
    </>
  )
}
