import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Parallax } from '@/components/primitives/gsap-fx'
import { PlateLabel } from '@/components/primitives/plate'
import { useGsapEffect } from '@/lib/use-gsap'

gsap.registerPlugin(ScrollTrigger)

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

type SectionHeaderProps = {
  num: string
  title: string
  caption?: string
  /** Étiquette de droite : l'état de la section sur la planche. */
  state?: string
}

/**
 * En-tête de section en grammaire de plan : le numéro devient un repère cadré
 * par des crochets, le titre suit, un pointillé file jusqu'au bord et porte
 * l'état de la section. Le HTML serveur est complet : les animations ne font
 * que rejouer une entrée déjà visible.
 */
export function SectionHeader({ num, title, caption, state }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const dashRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const digits = num.match(/\d+/)?.[0] ?? ''
  const target = digits ? parseInt(digits, 10) : 0
  const pad = digits.length || 2

  useGsapEffect(() => {
    if (reduced() || !ref.current) return

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', end: 'top 50%', scrub: 0.6 },
        },
      )
    }

    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } })
    if (numRef.current && target) {
      const obj = { n: 0 }
      tl.to(
        obj,
        {
          n: target,
          duration: 0.9,
          ease: 'power2.out',
          onUpdate: () => {
            if (numRef.current) numRef.current.textContent = String(Math.round(obj.n)).padStart(pad, '0')
          },
        },
        0,
      )
    }
    if (dashRef.current) {
      tl.from(dashRef.current, { scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'power2.inOut' }, 0.1)
    }
  }, ref)

  return (
    <div ref={ref} className="mb-12 md:mb-16">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-3 sm:gap-x-5">
        {/* Repère de plan : le numéro de section dans son viseur. */}
        <Parallax speed={18} className="shrink-0">
          <span className="plate plate-sm inline-flex h-8 min-w-[2.5rem] items-center justify-center px-2 font-mono text-[11px] tracking-[0.16em] text-accent">
            <span ref={numRef}>{String(target).padStart(pad, '0')}</span>
          </span>
        </Parallax>

        <h2 ref={titleRef} className="heading min-w-0 flex-1 text-[clamp(23px,6vw,52px)] [overflow-wrap:anywhere]">
          {title}
        </h2>
      </div>

      {/* Filet du plan, tracé au scroll, avec l'état de la section. */}
      <div className="mt-5 flex items-center gap-4 md:ml-[3.5rem]">
        <span ref={dashRef} className="plate-dash max-w-[220px]" aria-hidden />
        {state && <PlateLabel className="shrink-0">{state}</PlateLabel>}
      </div>

      {caption && <p className="mt-4 max-w-xl text-sm text-muted md:ml-[3.5rem]">{caption}</p>}
    </div>
  )
}
