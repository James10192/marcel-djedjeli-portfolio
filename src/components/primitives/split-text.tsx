import { useRef } from 'react'
import gsap from 'gsap'
import { useGsapEffect } from '@/lib/use-gsap'
import { cn, prefersReducedMotion } from '@/lib/utils'

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'span' | 'div'
}

/**
 * Titre révélé mot par mot derrière un masque (équivalent variants framer).
 * SSR-safe : le HTML serveur est entièrement visible, gsap.from ne masque
 * qu'au montage client avant de jouer. Neutre si prefers-reduced-motion.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  as = 'span',
}: SplitTextProps) {
  const words = text.split(' ')
  const Tag = as === 'div' ? 'div' : 'span'
  const ref = useRef<HTMLElement>(null)

  useGsapEffect(() => {
    const el = ref.current
    if (prefersReducedMotion() || !el) return
    gsap.from(el.querySelectorAll('[data-split-word]'), {
      yPercent: 110,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
      stagger,
      delay,
    })
  }, ref)

  return (
    <Tag ref={ref as React.RefObject<never>} className={cn('inline-block', className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block max-w-full overflow-hidden align-baseline pb-[0.18em] -mb-[0.18em]"
          aria-hidden
        >
          <span data-split-word className="inline-block">
            {word}
            {i < words.length - 1 && ' '}
          </span>
        </span>
      ))}
    </Tag>
  )
}
