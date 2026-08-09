import { cn } from '@/lib/utils'

/**
 * Monogramme de marque : le vrai fichier logo (viseur MD.), fond détouré
 * pour se poser sur n'importe quelle surface. Utilisé dans la navigation
 * et le pied de page.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/logos/md-monogram.png"
      alt="Marcel DJEDJE-LI"
      width={96}
      height={96}
      className={cn('h-9 w-auto object-contain', className)}
    />
  )
}
