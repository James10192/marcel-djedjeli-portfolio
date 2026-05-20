import { motion } from 'motion/react'
import { ExternalLink, Github, BookOpen } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/primitives/tilt-card'
import { RevealStagger, staggerItem } from '@/components/primitives/reveal'
import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'

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

      <RevealStagger className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
        {projects.map((p) => (
          <motion.div
            key={p.slug}
            variants={staggerItem}
            className={cn(
              'bg-ink',
              p.featured && 'md:col-span-2'
            )}
          >
            <TiltCard
              intensity={p.featured ? 4 : 7}
              className="group relative h-full overflow-hidden p-8 transition-colors duration-300 hover:bg-ink2 md:p-12"
            >
              <div className="tilt-content relative z-10 flex h-full flex-col">
                {/* Type + Year */}
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="mono-caps text-accent">{p.type}</span>
                  <span className="mono-caps text-muted">{p.year}</span>
                </div>

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
                        <div className="font-display text-2xl font-extrabold text-accent">
                          {m.value}
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
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 bg-accent px-4 font-mono text-[11px] font-medium text-ink transition-colors hover:bg-accent-soft"
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
                  <div className="absolute right-0 top-0 bg-accent px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink">
                    ★ Flagship
                  </div>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  )
}
