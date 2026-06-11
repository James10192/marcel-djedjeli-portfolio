import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Anime le nombre contenu dans une métrique (ex. "2 000+", "76 specs Vitest")
 * en le faisant défiler de 0 à sa valeur quand il entre dans le viewport.
 * - Le préfixe et le suffixe non numériques (" specs Vitest", "+") sont conservés.
 * - Le rendu SSR affiche déjà la valeur finale (pas de saut de layout, OK sans JS).
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

  // Découpe "préfixe NOMBRE suffixe" — le nombre peut contenir des espaces
  // (séparateur de milliers à la française) ou des séparateurs , et .
  const match = value.match(/(\d[\d\s .,]*\d|\d)/)
  const target = match ? Number(match[1].replace(/[\s .,]/g, '')) : null
  const prefix = match ? value.slice(0, match.index) : value
  const suffix = match ? value.slice((match.index ?? 0) + match[1].length) : ''

  const format = (n: number) =>
    Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') // espace fine insécable / milliers

  useGSAP(
    () => {
      if (target == null || !ref.current) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const node = ref.current
      const obj = { n: 0 }
      node.textContent = prefix + format(0) + suffix

      gsap.to(obj, {
        n: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: node, start: 'top 85%', once: true },
        onUpdate: () => {
          node.textContent = prefix + format(obj.n) + suffix
        },
        onComplete: () => {
          node.textContent = value // restaure le formatage exact d'origine
        },
      })
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {value}
    </span>
  )
}
