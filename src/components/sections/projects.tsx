import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapEffect } from '@/lib/use-gsap'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { projects } from '@/data/projects'
import { ProjectCard } from './project-card'

gsap.registerPlugin(ScrollTrigger)

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
        className="relative flex items-center overflow-hidden lg:h-[100svh] lg:pt-[68px]"
      >
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-5 px-6 will-change-transform md:px-12 lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:pr-[12vw]"
        >
          {projects.map((p) => (
            <div
              key={p.slug}
              className="w-full shrink-0 lg:w-[clamp(380px,40vw,540px)] lg:h-[min(680px,calc(100svh-68px-2.5rem))]"
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
