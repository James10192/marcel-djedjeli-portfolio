import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapEffect } from '@/lib/use-gsap'

gsap.registerPlugin(ScrollTrigger)

/**
 * Parallaxe en couche : translation verticale continue tant que l'élément
 * traverse le viewport. `speed` = amplitude en pourcentage de sa hauteur.
 */
export function Parallax({
  children,
  className,
  speed = 12,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useGsapEffect(() => {
    // Parallaxe = desktop uniquement (perf mobile). transform-only (compositor).
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      if (!ref.current) return
      gsap.fromTo(
        ref.current,
        { yPercent: speed },
        {
          yPercent: -speed,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
  }, ref)
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
