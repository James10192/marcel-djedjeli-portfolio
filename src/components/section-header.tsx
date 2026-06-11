import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Parallax } from '@/components/primitives/gsap-fx'

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin)

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

type SectionHeaderProps = {
  num: string
  title: string
  caption?: string
}

export function SectionHeader({ num, title, caption }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const digits = num.match(/\d+/)?.[0] ?? ''
  const target = digits ? parseInt(digits, 10) : 0
  const pad = digits.length || 2
  const suffix = num.replace(/^\s*\d+/, '')

  useGSAP(
    () => {
      if (reduced() || !ref.current) return

      // Titre : révélation pilotée par le scroll (scrub).
      // fromTo + immediateRender:false => si le trigger ne se déclenche jamais,
      // le titre reste visible (jamais de contenu masqué).
      if (titleRef.current) {
        // opacity + y uniquement (compositor-friendly) : pas de filter blur
        // qui repeint à chaque frame de scrub — gain net sur mobile.
        gsap.fromTo(
          titleRef.current,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: { trigger: ref.current, start: 'top 88%', end: 'top 50%', scrub: 0.6 },
          },
        )
      }

      // Compteur + tracé du filet doré : une fois à l'entrée
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
      if (lineRef.current) {
        tl.from(lineRef.current, { drawSVG: '0%', duration: 0.85, ease: 'power2.inOut' }, 0.1)
      }
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-3 sm:gap-5">
        <Parallax speed={18} className="shrink-0">
          <span className="font-mono text-[11px] tracking-widest text-accent">
            <span ref={numRef}>{String(target).padStart(pad, '0')}</span>
            {suffix}
          </span>
        </Parallax>
        <h2 ref={titleRef} className="heading min-w-0 text-[clamp(23px,6vw,52px)] [overflow-wrap:anywhere]">
          {title}
        </h2>
      </div>

      {/* Filet doré tracé au scroll (DrawSVG) */}
      <svg className="mt-5 hidden h-[2px] w-[140px] md:ml-[3.4rem] md:block" viewBox="0 0 140 2" preserveAspectRatio="none" aria-hidden>
        <line ref={lineRef} x1="0" y1="1" x2="140" y2="1" stroke="var(--color-accent)" strokeWidth="2" />
      </svg>

      {caption && <p className="mt-4 max-w-xl text-sm text-muted md:ml-[3.4rem]">{caption}</p>}
    </div>
  )
}
