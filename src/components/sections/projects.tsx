import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapEffect } from '@/lib/use-gsap'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { projects } from '@/data/projects'
import { ProjectCard } from './project-card'
import { pad2 } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export function Projects() {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useGsapEffect(() => {
    const mm = gsap.matchMedia()
    // Scroll horizontal épinglé UNIQUEMENT sur desktop + mouvement autorisé.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const pin = pinRef.current
      if (!track || !pin) return
      const distance = () => track.scrollWidth - pin.clientWidth + 96
      const last = projects.length - 1
      // Le compteur et la barre suivent le scroll sans passer par React :
      // une écriture DOM par frame plutôt qu'un rendu par frame.
      let current = 0
      /** Carte visée par le clavier, tant que le scroll animé n'y est pas arrivé. */
      let target: number | null = null
      const onUpdate = (self: ScrollTrigger) => {
        current = Math.round(self.progress * last)
        if (current === target) target = null
        if (counterRef.current) counterRef.current.textContent = pad2(current + 1)
        if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
      }
      const tween = gsap.to(track, {
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
          onUpdate,
        },
      })

      // Flèches gauche/droite : une carte par appui, tant que la rangée est épinglée.
      const onKey = (e: KeyboardEvent) => {
        const st = tween.scrollTrigger
        if (!st?.isActive || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return
        if (e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable]')) return
        e.preventDefault()
        const step = (st.end - st.start) / last
        // Depuis la carte déjà visée si un scroll animé est en cours : deux
        // appuis rapides avancent bien de deux cartes.
        const from = target ?? current
        target = Math.max(0, Math.min(last, from + (e.key === 'ArrowRight' ? 1 : -1)))
        window.scrollTo({ top: st.start + target * step, behavior: 'smooth' })
      }
      window.addEventListener('keydown', onKey)
      // Le repère n'existe que si la rangée est réellement épinglée.
      pin.dataset.pinned = ''
      return () => {
        window.removeEventListener('keydown', onKey)
        delete pin.dataset.pinned
      }
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
        className="group/pin relative flex items-center overflow-hidden lg:h-[100svh] lg:pt-[68px]"
      >
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-5 px-6 will-change-transform md:px-12 lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:pr-[12vw]"
        >
          {projects.map((p) => (
            <div
              key={p.slug}
              className="w-full shrink-0 lg:w-[clamp(380px,40vw,540px)] lg:h-[min(680px,calc(100svh-68px-4.5rem))]"
            >
              <ProjectCard p={p} />
            </div>
          ))}
        </div>

        {/* Repère de lecture : quelle planche, combien il en reste. Affiché
            seulement quand la rangée est épinglée (desktop, mouvement autorisé). */}
        <div
          className="pointer-events-none absolute bottom-3 left-12 right-24 hidden items-center gap-4 group-data-[pinned]/pin:flex"
          aria-hidden
        >
          <span className="font-mono text-[11px] tabular-nums text-paper">
            <span ref={counterRef}>01</span>
            <span className="text-muted"> / {pad2(projects.length)}</span>
          </span>
          <span className="relative h-px flex-1 bg-line">
            <span
              ref={barRef}
              className="absolute inset-0 origin-left bg-accent"
              style={{ transform: 'scaleX(0)' }}
            />
          </span>
          <span className="mono-caps text-muted">← → pour parcourir</span>
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
