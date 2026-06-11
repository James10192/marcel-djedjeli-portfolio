import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { ExternalLink, Github, BookOpen, ArrowUpRight, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/primitives/tilt-card'
import { RevealStagger, staggerItem } from '@/components/primitives/reveal'
import { CountUp } from '@/components/primitives/count-up'
import { projects } from '@/data/projects'
import { publicCaseStudies } from '@/data/case-studies'
import { ProjectLogo } from '@/components/case-study/project-logo'
import { cn } from '@/lib/utils'

// Slugs disposant d'une étude de cas publique (pour afficher le lien dédié).
const caseStudySlugs = new Set(publicCaseStudies.map((c) => c.slug))

export function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-line px-6 py-20 md:px-12 md:py-28"
    >
      <SectionHeader
        num="04 —"
        title="Projets clés"
        caption="Quelques produits que j'ai conçus, codés et déployés. La plupart tournent en prod aujourd'hui."
      />

      <RevealStagger className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {projects.map((p) => (
          <motion.div
            key={p.slug}
            variants={staggerItem}
            className={cn(p.featured && 'md:col-span-2')}
          >
            <TiltCard
              intensity={p.featured ? 4 : 7}
              className="surface group relative h-full overflow-hidden p-8 md:p-12"
            >
              <div className="tilt-content relative z-10 flex h-full flex-col">
                {/* Type + Year */}
                <div className={cn('mb-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-2', p.featured && 'pr-24 sm:pr-32')}>
                  <span className="mono-caps text-accent">{p.type}</span>
                  {!p.featured && (
                    <span className="mono-caps whitespace-nowrap text-muted">{p.year}</span>
                  )}
                </div>

                {/* Logo + Title */}
                <ProjectLogo
                  slug={p.slug}
                  title={p.title}
                  className={cn('mb-4', p.featured ? 'h-14 w-14' : 'h-11 w-11')}
                />

                {/* Title */}
                <h3
                  className={cn(
                    'font-display font-extrabold tracking-tight leading-[1.05]',
                    p.featured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'
                  )}
                >
                  {p.title}
                </h3>

                {/* Tagline */}
                <p
                  className={cn(
                    'mt-3 text-paper',
                    p.featured ? 'text-base md:text-lg' : 'text-sm md:text-base'
                  )}
                >
                  {p.tagline}
                </p>

                {/* Metrics for featured */}
                {p.metrics && (
                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-4">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="font-display text-2xl font-extrabold text-accent tabular-nums">
                          <CountUp value={m.value} />
                        </div>
                        <div className="mono-caps text-muted">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <p className="mt-5 flex-1 text-[13.5px] leading-[1.75] text-muted">
                  {p.description}
                </p>

                {/* Tech tags */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="border border-line px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {caseStudySlugs.has(p.slug) && (
                    <Link
                      to="/projets/$slug"
                      params={{ slug: p.slug }}
                      className="inline-flex h-9 items-center gap-1.5 bg-accent px-4 font-mono text-[11px] font-medium transition-colors hover:bg-accent-soft"
                      style={{ color: '#0a0a08' }}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      Étude de cas
                    </Link>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'inline-flex h-9 items-center gap-1.5 px-4 font-mono text-[11px] font-medium transition-colors',
                        caseStudySlugs.has(p.slug)
                          ? 'border border-line text-muted hover:border-accent hover:text-accent'
                          : 'bg-accent hover:bg-accent-soft',
                      )}
                      style={caseStudySlugs.has(p.slug) ? undefined : { color: '#0a0a08' }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Voir le projet
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 border border-line px-4 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  )}
                  {p.docsUrl && (
                    <a
                      href={p.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 border border-line px-4 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Docs
                    </a>
                  )}
                </div>

                {/* Featured ribbon */}
                {p.featured && (
                  <div
                    className="absolute right-0 top-0 bg-accent px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider"
                    style={{ color: '#0a0a08' }}
                  >
                    ★ Flagship
                  </div>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </RevealStagger>

      {/* Vers l'index des études de cas */}
      <div className="mt-10 flex justify-center">
        <Link
          to="/projets"
          search={{ famille: 'all' }}
          className="group inline-flex h-12 items-center gap-2.5 border border-line px-6 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-accent hover:text-accent"
        >
          Voir toutes les études de cas
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
