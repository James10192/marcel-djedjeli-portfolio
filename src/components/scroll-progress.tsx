import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapEffect } from '@/lib/use-gsap'

gsap.registerPlugin(ScrollTrigger)

/**
 * Barre de progression de lecture (équivalent useScroll + useSpring).
 * scrub: 0.4 lisse le rattrapage comme le spring framer. SSR : scaleX(0),
 * état correct en haut de page.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useGsapEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: 0.4,
        },
      },
    )
  }, ref)

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden
    />
  )
}
