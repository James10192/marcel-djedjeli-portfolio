import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Révélation pilotée par le scroll (scrub) : le contenu monte et se défloute
 * EN SUIVANT la position de scroll, pas en un fondu ponctuel.
 * SSR-safe (useGSAP côté client) et neutre si prefers-reduced-motion.
 */
export function ScrubReveal({
  children,
  className,
  y = 42,
  blur = 8,
}: {
  children: ReactNode
  className?: string
  y?: number
  blur?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (reduced() || !ref.current) return
      gsap.from(ref.current, {
        opacity: 0,
        y,
        filter: `blur(${blur}px)`,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'top 52%', scrub: 0.6 },
      })
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

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
  useGSAP(
    () => {
      if (reduced() || !ref.current) return
      gsap.fromTo(
        ref.current,
        { yPercent: speed },
        {
          yPercent: -speed,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
