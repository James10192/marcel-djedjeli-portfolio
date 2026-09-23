import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { Plate, PlateLabel } from '@/components/primitives/plate'
import { projects } from '@/data/projects'

// La pièce maîtresse et sa vitrine publique, lues dans les données projets :
// un renommage de slug ou de capture ne laisse pas de lien mort au premier écran.
const flagship = projects.find((p) => p.slug === 'klassci')
const showcase = projects.find((p) => p.slug === 'klassci-landing')

/**
 * La preuve du premier écran : la pièce maîtresse, vue en production.
 *
 * Statique et rendue côté serveur (aucun appel réseau dans le hero). Elle ne
 * répète pas les chiffres, déjà portés par les cotes « mesures relevées » :
 * elle montre le produit et mène à son étude de cas.
 */
export function HeroProof() {
  if (!flagship || !showcase?.shot) return null
  return (
    <Plate label="en production" labelRight="2024 → auj." size="sm" tint live className="p-0">
      <Link
        to="/projets/$slug"
        params={{ slug: flagship.slug }}
        className="group/proof block px-4 pb-4 pt-5 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center sm:gap-6 lg:block"
        aria-label={`${flagship.title}, ${flagship.tagline} Lire l'étude de cas`}
      >
        <div className="overflow-hidden rounded-[10px] border border-line bg-ink">
          <img
            src={showcase.shot}
            alt={`La page d'accueil de ${flagship.title} sur klassci.com`}
            width={1280}
            height={800}
            decoding="async"
            className="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] motion-safe:group-hover/proof:scale-[1.04]"
          />
        </div>
        <div className="sm:py-2 lg:py-0">
        <div className="mt-4 flex items-end justify-between gap-3 sm:mt-0 lg:mt-4">
          <div className="min-w-0">
            <p className="font-display text-lg font-extrabold leading-tight tracking-tight">{flagship.title}</p>
            <p className="mt-1 text-[12px] leading-snug text-muted">
              La gestion scolaire de 5 écoles, en ligne chaque jour.
            </p>
          </div>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover/proof:-translate-y-0.5 group-hover/proof:translate-x-0.5 group-hover/proof:text-accent"
            aria-hidden
          />
        </div>
        <PlateLabel accent className="mt-3 block">lire l'étude de cas</PlateLabel>
        </div>
      </Link>
    </Plate>
  )
}
