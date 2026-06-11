import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from '@tanstack/react-router'
import { ExternalLink, Github, BookOpen, ArrowUpRight, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/primitives/tilt-card'
import { CountUp } from '@/components/primitives/count-up'
import { projects, type Project } from '@/data/projects'
import { publicCaseStudies } from '@/data/case-studies'
import { ProjectLogo } from '@/components/case-study/project-logo'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Slugs disposant d'une étude de cas publique (pour afficher le lien dédié).
const caseStudySlugs = new Set(publicCaseStudies.map((c) => c.slug))

export function Projects() {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Scroll horizontal épinglé UNIQUEMENT sur desktop + mouvement autorisé.
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current
        const pin = pinRef.current
        if (!track || !pin) return
        const distance = () => track.scrollWidth - pin.clientWidth + 96
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      })
    },
    { scope: pinRef },
  )

  return (
    <section id="projects" className="border-t border-line py-20 md:py-28">
      <div className="px-6 md:px-12">
        <SectionHeader
          num="04 —"
          title="Projets clés"
          caption="Quelques produits que j'ai conçus, codés et déployés. La plupart tournent en prod aujourd'hui. (Faites défiler : les cartes glissent à l'horizontale.)"
        />
      </div>

      {/* Zone épinglée (desktop) / pile verticale (mobile) */}
      <div ref={pinRef} className="relative flex items-center overflow-hidden lg:min-h-[100svh]">
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-5 px-6 will-change-transform md:px-12 lg:w-auto lg:flex-row lg:gap-6 lg:pr-[12vw]"
        >
          {projects.map((p) => (
            <div key={p.slug} className="w-full shrink-0 lg:w-[clamp(380px,42vw,560px)]">
              <ProjectCard p={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Vers l'index des études de cas */}
      <div className="mt-10 flex justify-center px-6 md:px-12">
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

function ProjectCard({ p }: { p: Project }) {
  return (
    <TiltCard intensity={6} className="surface group relative flex h-full flex-col overflow-hidden p-8 md:p-10">
      <div className="tilt-content relative z-10 flex h-full flex-col">
        <div className={cn('mb-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-2', p.featured && 'pr-24 sm:pr-32')}>
          <span className="mono-caps text-accent">{p.type}</span>
          <span className="mono-caps whitespace-nowrap text-muted">{p.year}</span>
        </div>

        <ProjectLogo slug={p.slug} title={p.title} className={cn('mb-4', p.featured ? 'h-14 w-14' : 'h-11 w-11')} />

        <h3 className={cn('font-display font-extrabold tracking-tight leading-[1.05]', p.featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl')}>
          {p.title}
        </h3>

        <p className={cn('mt-3 text-paper', p.featured ? 'text-base md:text-lg' : 'text-sm md:text-base')}>{p.tagline}</p>

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

        <p className="mt-5 flex-1 text-[13.5px] leading-[1.75] text-muted">{p.description}</p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="border border-line px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-muted">
              {t}
            </span>
          ))}
        </div>

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
                caseStudySlugs.has(p.slug) ? 'border border-line text-muted hover:border-accent hover:text-accent' : 'bg-accent hover:bg-accent-soft',
              )}
              style={caseStudySlugs.has(p.slug) ? undefined : { color: '#0a0a08' }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Voir le projet
            </a>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 border border-line px-4 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          {p.docsUrl && (
            <a href={p.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 border border-line px-4 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent">
              <BookOpen className="h-3.5 w-3.5" />
              Docs
            </a>
          )}
        </div>

        {p.featured && (
          <div className="absolute right-0 top-0 bg-accent px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider" style={{ color: '#0a0a08' }}>
            ★ Flagship
          </div>
        )}
      </div>
    </TiltCard>
  )
}
