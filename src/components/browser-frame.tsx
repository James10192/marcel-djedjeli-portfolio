/**
 * BrowserFrame · cadre navigateur minimal pour présenter une capture produit.
 *
 * Les captures sont déposées dans `public/shots/` par le processus de build de
 * contenu (ce composant ne les génère pas). Il se contente de les encadrer
 * proprement : barre de titre à trois points, URL en mono, ratio figé pour
 * éviter tout décalage de mise en page, chargement paresseux, et repli élégant
 * si le fichier est absent.
 *
 * EXEMPLE D'USAGE dans une étude de cas (`src/routes/projets.$slug.tsx`), après
 * le bloc Architecture :
 *
 *   import { BrowserFrame } from '@/components/browser-frame'
 *
 *   <Block num="03" title="Le produit en situation">
 *     <BrowserFrame
 *       src="/shots/klassci-dashboard.png"
 *       alt="Tableau de bord Klassci : effectifs, encaissements et alertes de scolarité."
 *       url="presentation.klassci.com/dashboard"
 *       caption="Le tableau de bord ouvert chaque matin par la direction."
 *     />
 *   </Block>
 *
 * Deux captures côte à côte :
 *
 *   <div className="grid gap-4 md:grid-cols-2">
 *     <BrowserFrame src="/shots/klassci-notes.png" alt="Saisie des notes" url="…/notes" ratio="4 / 3" />
 *     <BrowserFrame src="/shots/klassci-bulletin.png" alt="Bulletin PDF" url="…/bulletins" ratio="4 / 3" />
 *   </div>
 *
 * Capture cliquable vers le site en ligne :
 *
 *   <BrowserFrame src="/shots/fejeci.png" alt="Accueil Fejeci" url="fejeci.org" href="https://fejeci.org" />
 */

import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export type BrowserFrameProps = {
  /** Chemin public de la capture, par exemple `/shots/klassci-dashboard.png`. */
  src: string
  /** Description utile de ce que montre la capture (jamais « capture d'écran »). */
  alt: string
  /** URL affichée dans la barre d'adresse. Purement décorative. */
  url?: string
  /** Ratio CSS du cadre image. Figé pour éviter tout décalage au chargement. */
  ratio?: string
  /** Légende optionnelle affichée sous le cadre. */
  caption?: string
  /** Rend le cadre cliquable vers le site réel. */
  href?: string
  /** Passe la capture en chargement prioritaire (première image visible). */
  priority?: boolean
  className?: string
}

export function BrowserFrame({
  src,
  alt,
  url,
  ratio = '16 / 10',
  caption,
  href,
  priority = false,
  className,
}: BrowserFrameProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  const frame = (
    <div
      className={cn(
        'overflow-hidden rounded-[14px] border border-line bg-ink2',
        href && 'transition-colors group-hover:border-accent/50',
      )}
    >
      {/* Barre de titre */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
        </span>
        {url ? (
          <span className="min-w-0 flex-1 truncate rounded-sm bg-ink px-3 py-1 font-mono text-[10.5px] text-muted">
            {url}
          </span>
        ) : (
          <span className="flex-1" />
        )}
      </div>

      {/* Zone image, ratio figé */}
      <div className="relative w-full bg-ink" style={{ aspectRatio: ratio }}>
        {showImage ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <ImageOff className="h-5 w-5 text-line2" aria-hidden />
            <p className="font-mono text-[11px] leading-relaxed text-muted">
              Capture indisponible
            </p>
            <p className="max-w-xs text-[11px] leading-relaxed text-muted/70">{alt}</p>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <figure className={cn('m-0', className)}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
          {frame}
        </a>
      ) : (
        frame
      )}

      {caption ? (
        <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
