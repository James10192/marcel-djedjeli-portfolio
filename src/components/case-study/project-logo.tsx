import { cn } from '@/lib/utils'

/**
 * Logo d'un projet. Quand un vrai fichier de marque existe (public/logos), on
 * l'affiche ; sinon repli sur un monogramme sobre (initiale sur fond charte).
 * Les fichiers sont optimisés (<=256px). klassci-landing réutilise la marque
 * Klassci (même produit).
 */
const LOGO_BY_SLUG: Record<string, string> = {
  klassci: '/logos/klassci.png',
  'klassci-landing': '/logos/klassci.png',
  esbtp: '/logos/esbtp.png',
  smartlink: '/logos/smartlink.png',
  itm: '/logos/itm.png',
  fejeci: '/logos/fejeci.png',
  'adc-paie': '/logos/adc-paie.png',
  'adc-website': '/logos/adc-website.png',
  akwaba: '/logos/akwaba.svg',
  'la-victoire': '/logos/la-victoire.png',
}

/** Initiales de repli depuis le titre (1 à 2 lettres). */
function monogram(title: string): string {
  const cleaned = title.split(/[·,]/)[0].trim()
  const words = cleaned.split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return cleaned.slice(0, 2).toUpperCase()
}

export function ProjectLogo({
  slug,
  title,
  className,
}: {
  slug: string
  title: string
  className?: string
}) {
  const src = LOGO_BY_SLUG[slug]
  if (src) {
    return (
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-paper',
          className,
        )}
      >
        <img
          src={src}
          alt={`Logo ${title.split(/[·,]/)[0].trim()}`}
          loading="lazy"
          className="h-full w-full object-contain p-1"
        />
      </span>
    )
  }
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md border border-line bg-ink2 font-display text-xs font-extrabold tracking-tight text-accent',
        className,
      )}
    >
      {monogram(title)}
    </span>
  )
}
