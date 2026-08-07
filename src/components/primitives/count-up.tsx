import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { parseMetric, formatMetric } from '@/lib/metric'

/**
 * Anime le nombre contenu dans une métrique (ex. "2 000+", "76 specs Vitest")
 * en le faisant défiler de 0 à sa valeur quand il entre dans le viewport.
 * - Le préfixe et le suffixe non numériques (" specs Vitest", "+") sont conservés.
 * - Le rendu SSR affiche la valeur finale (pas de saut de layout, OK sans JS).
 * - IntersectionObserver (pas ScrollTrigger) : fonctionne aussi dans la section
 *   projets à défilement horizontal, où les positions ScrollTrigger sont fausses.
 * - prefers-reduced-motion : aucune animation, valeur finale directe.
 */
export function CountUp({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const parsed = parseMetric(value)
    if (!parsed) return
    const { prefix, target, suffix } = parsed

    let tween: gsap.core.Tween | undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        const obj = { n: 0 }
        tween = gsap.to(obj, {
          n: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            node.textContent = prefix + formatMetric(obj.n) + suffix
          },
          onComplete: () => {
            node.textContent = value // restaure le formatage exact d'origine
          },
        })
      },
      { threshold: 0.4 },
    )
    io.observe(node)

    return () => {
      io.disconnect()
      tween?.kill()
      node.textContent = value
    }
  }, [value])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {value}
    </span>
  )
}
