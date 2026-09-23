import { Link } from '@tanstack/react-router'
import { ExternalLink, Github, BookOpen, ArrowUpRight } from 'lucide-react'
import { TiltCard } from '@/components/primitives/tilt-card'
import { Plate, PlateLabel } from '@/components/primitives/plate'
import { CountUp } from '@/components/primitives/count-up'
import { ProjectLogo } from '@/components/case-study/project-logo'
import { ArchDiagram } from '@/components/case-study/arch-diagram'
import { BrowserFrame } from '@/components/browser-frame'
import type { Project } from '@/data/projects'
import { publicCaseStudies } from '@/data/case-studies'
import { cn } from '@/lib/utils'

const caseStudyBySlug = new Map(publicCaseStudies.map((c) => [c.slug, c]))

/**
 * Le visuel absorbe l'espace disponible de la carte : il rétrécit sur un
 * écran court et disparaît sous 720 px de haut plutôt que de pousser les CTA
 * hors de la carte. Sans capture publique (Klassci vit derrière une
 * connexion), la carte montre le plan du système tiré de l'étude de cas.
 */
const VISUAL = 'mt-4 hidden min-h-0 flex-1 lg:[@media(min-height:720px)]:flex'

function ProjectVisual({ p }: { p: Project }) {
  if (p.shot) {
    return (
      <BrowserFrame
        src={p.shot}
        alt={`Le site ${p.title} en ligne`}
        url={p.liveUrl?.replace(/^https?:\/\//, '')}
        fill
        className={VISUAL}
      />
    )
  }
  const diagram = caseStudyBySlug.get(p.slug)?.architectureDiagram
  if (!diagram) return null
  return (
    <figure className={cn(VISUAL, 'm-0 flex-col overflow-hidden rounded-[14px] border border-line bg-ink')}>
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <PlateLabel accent>plan du système</PlateLabel>
        <PlateLabel>{diagram.nodes.length} composants</PlateLabel>
      </figcaption>
      <div className="flex min-h-0 flex-1 items-center px-2">
        <ArchDiagram nodes={diagram.nodes} edges={diagram.edges} compact />
      </div>
    </figure>
  )
}

const CTA = 'inline-flex h-11 items-center gap-1.5 px-4 font-mono text-[11px] transition-colors'
const PRIMARY_CTA = `${CTA} bg-accent font-medium text-ink hover:bg-accent-soft`
const GHOST_CTA = `${CTA} border border-line text-muted hover:border-accent hover:text-accent`

export function ProjectCard({ p }: { p: Project }) {
  const hasCaseStudy = caseStudyBySlug.has(p.slug)
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

        <ProjectVisual p={p} />

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

        <p className="mt-4 line-clamp-3 shrink-0 text-[13px] leading-[1.7] text-muted lg:[@media(min-height:900px)]:line-clamp-4">
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
          {hasCaseStudy && (
            <Link
              to="/projets/$slug"
              params={{ slug: p.slug }}
              className={PRIMARY_CTA}
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
              className={hasCaseStudy ? GHOST_CTA : PRIMARY_CTA}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Voir le projet
            </a>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className={GHOST_CTA}>
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          {p.docsUrl && (
            <a href={p.docsUrl} target="_blank" rel="noopener noreferrer" className={GHOST_CTA}>
              <BookOpen className="h-3.5 w-3.5" />
              Docs
            </a>
          )}
        </div>
      </Plate>
    </TiltCard>
  )
}
