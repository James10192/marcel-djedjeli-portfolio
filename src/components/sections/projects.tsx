import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapEffect } from '@/lib/use-gsap'
import { Link } from '@tanstack/react-router'
import { ExternalLink, Github, BookOpen, ArrowUpRight, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/primitives/tilt-card'
import { Plate, PlateLabel } from '@/components/primitives/plate'
import { CountUp } from '@/components/primitives/count-up'
import { projects, type Project } from '@/data/projects'
import { publicCaseStudies } from '@/data/case-studies'
import { ProjectLogo } from '@/components/case-study/project-logo'
import { BrowserFrame } from '@/components/browser-frame'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

// Slugs disposant d'une étude de cas publique (pour afficher le lien dédié).
const caseStudySlugs = new Set(publicCaseStudies.map((c) => c.slug))

export function Projects() {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGsapEffect(() => {
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
  }, pinRef)

  return (
    <section id="projects" className="pb-20 pt-6 md:pb-28 md:pt-8">
      <div className="px-6 md:px-12">
        <SectionHeader
          num="04"
          state="ouvrages réalisés"
          title="Projets clés"
          caption="Quelques produits que j'ai conçus, codés et déployés. La plupart tournent en production aujourd'hui."
        />
      </div>

      {/* Zone épinglée : exactement une hauteur d'écran en desktop, pile
          verticale libre en mobile. La carte tient dans ce budget, jamais
          l'inverse : sur un portable 1280x720 comme sur un 27 pouces. */}
      <div
        ref={pinRef}
        className="relative flex items-center overflow-hidden lg:h-[100svh]"
      >
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-5 px-6 will-change-transform md:px-12 lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:pr-[12vw]"
        >
          {projects.map((p) => (
            <div
              key={p.slug}
              className="w-full shrink-0 lg:w-[clamp(380px,40vw,540px)] lg:h-[min(680px,calc(100svh-6rem))]"
            >
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
    <TiltCard intensity={6} className="group flex h-full flex-col">
      <Plate
        label={p.featured ? `${p.type} · pièce maîtresse` : p.type}
        labelRight={p.year}
        tint
        live
        /* Pas d'overflow-hidden ici : l'étiquette de calque chevauche le bord
           haut de la plaque et serait rognée en deux. Le budget de hauteur est
           tenu par flex + min-h-0 + line-clamp, pas par un rognage. */
        className="tilt-content relative z-10 flex h-full min-h-0 flex-col px-6 py-7 md:px-8 md:py-8"
      >
        <div className="flex items-start gap-4">
          <ProjectLogo slug={p.slug} title={p.title} className={cn('shrink-0', p.featured ? 'h-12 w-12' : 'h-10 w-10')} />
          <div className="min-w-0 flex-1">
            <h3 className={cn('font-display font-extrabold tracking-tight leading-[1.05] [overflow-wrap:anywhere]', p.featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl')}>
              {p.title}
            </h3>
            <p className={cn('mt-2 text-paper', p.featured ? 'text-[15px]' : 'text-sm')}>{p.tagline}</p>
          </div>
        </div>

        {/* La capture absorbe l'espace disponible : elle rétrécit sur un écran
            court et disparaît sous 720px de haut plutôt que de pousser les CTA
            hors de la carte. */}
        {p.shot && (
          <BrowserFrame
            src={p.shot}
            alt={`Le site ${p.title} en ligne`}
            url={p.liveUrl?.replace(/^https?:\/\//, '')}
            className="mt-4 hidden min-h-0 flex-1 lg:[@media(min-height:720px)]:block"
          />
        )}

        {p.metrics && (
          <div className="mt-4 flex flex-wrap gap-x-7 gap-y-1.5 border-y border-line py-3">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-xl font-extrabold text-accent tabular-nums">
                  <CountUp value={m.value} />
                </div>
                <div className="mono-caps text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 line-clamp-3 min-h-0 text-[13px] leading-[1.7] text-muted lg:[@media(min-height:900px)]:line-clamp-4">
          {p.description}
        </p>

        <div className="mt-auto pt-4">
          <PlateLabel className="mb-1.5 block">matériaux</PlateLabel>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {p.tech.slice(0, 6).map((t) => (
              <span key={t} className="font-mono text-[11px] text-muted">
                {t}
              </span>
            ))}
            {p.tech.length > 6 && (
              <span className="font-mono text-[11px] text-muted/70">+{p.tech.length - 6}</span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {caseStudySlugs.has(p.slug) && (
            <Link
              to="/projets/$slug"
              params={{ slug: p.slug }}
              className="inline-flex h-11 items-center gap-1.5 bg-accent px-4 font-mono text-[11px] font-medium transition-colors hover:bg-accent-soft"
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
                'inline-flex h-11 items-center gap-1.5 px-4 font-mono text-[11px] font-medium transition-colors',
                caseStudySlugs.has(p.slug) ? 'border border-line text-muted hover:border-accent hover:text-accent' : 'bg-accent hover:bg-accent-soft',
              )}
              style={caseStudySlugs.has(p.slug) ? undefined : { color: '#0a0a08' }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Voir le projet
            </a>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-1.5 border border-line px-4 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          {p.docsUrl && (
            <a href={p.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-1.5 border border-line px-4 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent">
              <BookOpen className="h-3.5 w-3.5" />
              Docs
            </a>
          )}
        </div>

      </Plate>
    </TiltCard>
  )
}
