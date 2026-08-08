import { cn } from '@/lib/utils'

/**
 * Monogramme « viseur du bâtisseur » : MD. entre quatre crochets d'angle,
 * le point final en lime (le curseur, ponctuation de la marque).
 * SVG inline : net à toute taille, aucune requête réseau.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('h-9 w-9', className)}
      fill="none"
      role="img"
      aria-label="MD"
    >
      {/* crochets d'angle */}
      <g stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="square">
        <path d="M2 10V2h8" />
        <path d="M38 2h8v8" />
        <path d="M46 38v8h-8" />
        <path d="M10 46H2v-8" />
      </g>
      {/* MD. */}
      <text
        x="23"
        y="31"
        textAnchor="middle"
        fill="var(--color-paper)"
        fontFamily="var(--font-display), sans-serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        MD
      </text>
      <rect x="34" y="25.5" width="4.5" height="4.5" fill="var(--color-accent)" />
    </svg>
  )
}
