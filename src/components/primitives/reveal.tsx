import type { ReactNode } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapEffect } from '@/lib/use-gsap'
import { prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'header'
  once?: boolean
  duration?: number
}

/**
 * Révélation à l'entrée dans le viewport (équivalent whileInView).
 * SSR-safe : l'état rendu serveur est l'état final visible, l'animation
 * n'est posée que côté client. Neutre si prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 50,
  className,
  as: Tag = 'div',
  once = true,
  duration = 0.9,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGsapEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    gsap.from(ref.current, {
      opacity: 0,
      y,
      duration,
      delay,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    })
  }, ref)

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  )
}

type RevealStaggerProps = {
  children: ReactNode
  stagger?: number
  delay?: number
  className?: string
}

/**
 * Cascade d'apparition des enfants directs du conteneur
 * (équivalent staggerChildren + variants staggerItem).
 */
export function RevealStagger({
  children,
  stagger = 0.1,
  delay = 0,
  className,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGsapEffect(() => {
    const el = ref.current
    if (prefersReducedMotion() || !el || el.children.length === 0) return
    gsap.from(el.children, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'expo.out',
      stagger,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
    })
  }, ref)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
