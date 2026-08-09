import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Grammaire « plan d'exécution ».
 *
 * Le monogramme MD est un viseur : quatre crochets d'angle lime autour d'un
 * contenu. Ici ce viseur cesse d'être un logo posé dans un coin, il devient la
 * règle de composition de la page entière. Le site se lit alors comme une
 * planche technique : des blocs cadrés, des étiquettes de calque sur les bords,
 * des annotations alignées en marge, des chiffres présentés comme des mesures.
 *
 * Tout est rendu côté serveur, sans JavaScript : les crochets sont huit
 * dégradés plats posés dans un pseudo-élément (voir `.plate` dans styles.css),
 * les étiquettes sont du texte positionné. Aucune dépendance, aucun SVG.
 *
 * Vocabulaire :
 * - `Plate`        un bloc cadré, avec étiquettes optionnelles sur le bord haut
 * - `PlateLabel`   une étiquette mono isolée, réutilisable hors cadre
 * - `PlateMeasure` un cadre chiffré : intitulé, mesure lime, unité
 * - `MarginNote`   une annotation en marge, filet lime vertical
 * - `SheetHeader`  l'en-tête de planche (référence du plan, révision)
 * - `SectionCut`   un repère de coupe entre deux sections
 *
 * Règle de sobriété : le lime ne sert qu'aux crochets, aux étiquettes actives
 * et aux chiffres clés. Jamais en aplat large.
 */

type PlateSize = 'sm' | 'md' | 'lg'

type PlateProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> & {
  children: ReactNode
  /** Étiquette de calque, sur le bord haut gauche du cadre. */
  label?: ReactNode
  /** Seconde étiquette, sur le bord haut droit (millésime, état...). */
  labelRight?: ReactNode
  /** Longueur des crochets. `sm` pour les vignettes, `lg` pour le sujet. */
  size?: PlateSize
  /** Crochets sourds (gris) au lieu du lime : pour les blocs secondaires. */
  quiet?: boolean
  /** Fond de planche légèrement décollé du papier. */
  tint?: boolean
  /** Les crochets s'ouvrent au survol (blocs cliquables). */
  live?: boolean
  className?: string
}

const sizeClass: Record<PlateSize, string> = {
  sm: 'plate-sm',
  md: '',
  lg: 'plate-lg',
}

export function Plate({
  children,
  label,
  labelRight,
  size = 'md',
  quiet = false,
  tint = false,
  live = false,
  className,
  ...rest
}: PlateProps) {
  return (
    <div
      {...rest}
      className={cn(
        'plate',
        sizeClass[size],
        quiet && 'plate-quiet',
        tint && 'plate-tint',
        live && 'plate-live',
        className,
      )}
    >
      {/* Les étiquettes chevauchent le bord haut de la plaque : aucun parent ne
          doit poser overflow-hidden, sinon elles sont rognées en deux. Sur
          écran étroit, celle de gauche se tronque plutôt que de bousculer
          celle de droite. */}
      {(label || labelRight) && (
        <div className="pointer-events-none absolute inset-x-5 top-0 flex -translate-y-1/2 items-center justify-between gap-3 md:inset-x-7">
          {label ? <span className="plate-tag min-w-0 truncate">{label}</span> : <span />}
          {labelRight ? <span className="plate-tag shrink-0">{labelRight}</span> : null}
        </div>
      )}
      {children}
    </div>
  )
}

/** Étiquette mono isolée : sert de légende hors cadre (rangées, colonnes). */
export function PlateLabel({
  children,
  accent = false,
  className,
}: {
  children: ReactNode
  accent?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'font-mono text-[10px] uppercase leading-none tracking-[0.16em]',
        accent ? 'text-accent' : 'text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * Une mesure du plan : intitulé de cote, valeur en lime, unité.
 * Les chiffres du portfolio ne sont plus des « stats » mais des cotes.
 */
export function PlateMeasure({
  label,
  value,
  unit,
  className,
}: {
  label: string
  value: string
  unit: string
  className?: string
}) {
  return (
    <Plate size="sm" className={cn('px-4 py-4 sm:px-5', className)}>
      <PlateLabel>{label}</PlateLabel>
      <div className="mt-2 font-display text-[clamp(20px,5vw,28px)] font-extrabold leading-none tabular-nums text-accent">
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[11px] leading-tight text-muted">{unit}</div>
    </Plate>
  )
}

/**
 * Annotation en marge : un filet lime vertical, des lignes indexées A, B, C.
 * Sur petit écran, l'appelant place ce bloc sous le contenu principal.
 */
export function MarginNote({
  label,
  items,
  className,
}: {
  label?: string
  items: ReadonlyArray<{ key: string; text: string }>
  className?: string
}) {
  return (
    <div className={className}>
      {label && <PlateLabel className="mb-3 block">{label}</PlateLabel>}
      <ul className="plate-rule space-y-2 pl-3.5">
        {items.map((item) => (
          <li key={item.key} className="font-mono text-[11.5px] leading-relaxed text-muted">
            <span className="text-accent">{item.key}</span>
            <span aria-hidden> · </span>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * En-tête de planche : la référence du plan à gauche, la révision à droite.
 * Discret, posé une seule fois en haut de la page.
 */
export function SheetHeader({
  reference,
  revision,
  className,
}: {
  reference: string
  revision: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 border-b border-line px-6 py-2.5 md:px-12',
        className,
      )}
      aria-hidden
    >
      <PlateLabel>{reference}</PlateLabel>
      <PlateLabel className="hidden sm:inline">{revision}</PlateLabel>
    </div>
  )
}

/**
 * Repère de coupe entre deux sections : ce qui précède à gauche,
 * ce qui suit à droite, un pointillé au milieu.
 */
export function SectionCut({
  from,
  to,
  className,
}: {
  from: string
  to: string
  className?: string
}) {
  return (
    <div
      className={cn('flex items-center gap-4 px-6 py-6 md:px-12 md:py-8', className)}
      aria-hidden
    >
      <PlateLabel className="shrink-0">{from}</PlateLabel>
      <span className="plate-dash hidden sm:block" />
      <PlateLabel className="shrink-0 text-right">{to}</PlateLabel>
    </div>
  )
}
