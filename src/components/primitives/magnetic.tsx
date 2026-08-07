import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { cn, prefersReducedMotion } from '@/lib/utils'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

/**
 * Effet magnétique au survol : l'élément suit légèrement le curseur
 * (équivalent useMotionValue + useSpring). gsap.quickTo lisse le suivi,
 * le retour se fait avec un léger rebond élastique.
 */
export function Magnetic({ children, className, strength = 0.25 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const strengthRef = useRef(strength)
  strengthRef.current = strength

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })

    function onMove(e: MouseEvent) {
      if (!el) return
      const rect = el.getBoundingClientRect()
      xTo((e.clientX - rect.left - rect.width / 2) * strengthRef.current)
      yTo((e.clientY - rect.top - rect.height / 2) * strengthRef.current)
    }

    function onLeave() {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(el)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [])

  return (
    <div ref={ref} className={cn('inline-block', className)}>
      {children}
    </div>
  )
}
