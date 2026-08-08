import { Reveal } from '@/components/primitives/reveal'
import { SectionHeader } from '@/components/section-header'
import { Plate, PlateLabel } from '@/components/primitives/plate'

/**
 * Les pièces justificatives du plan : chaque diplôme est une planche cadrée.
 * Le calque de gauche porte le niveau, l'étiquette de droite le millésime,
 * exactement comme les épisodes du journal. Rien de bordé, rien de badgé :
 * le détail (établissement, mention) passe en nomenclature mono.
 */

const formations = [
  {
    year: '2019',
    badge: 'BAC+3',
    degree: 'BSc (Hons) Business Computing and Information Systems',
    institution: 'University of Central Lancashire',
    subtitle: 'via NCC Education · Abidjan',
    description:
      "Diplôme de niveau BAC+3 obtenu via un partenariat international avec l'University of Central Lancashire (UK). Formation couvrant le développement logiciel, l'architecture des systèmes, la gestion de bases de données et les systèmes d'information d'entreprise.",
  },
  {
    year: '2019',
    badge: 'BAC',
    degree: 'Baccalauréat série D',
    institution: 'Collège Catholique Saint Jean Bosco',
    subtitle: 'Abidjan, Côte d\'Ivoire',
    description:
      'Série scientifique D (sciences expérimentales). Fondation rigoureuse en mathématiques, sciences de la vie et de la terre, physique-chimie.',
  },
]

export function Formation() {
  return (
    <section
      id="formation"
      className="border-t border-line px-6 py-20 md:px-12 md:py-28"
    >
      <SectionHeader num="07" title="Formation" state="pièces justificatives" />

      {/* Bandeau de relevé : ce que couvre la planche. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-line pb-3">
        <PlateLabel accent>relevé de diplômes</PlateLabel>
        <PlateLabel>
          <span className="tabular-nums">{formations.length}</span> pièces · Abidjan
        </PlateLabel>
      </div>

      <div className="mt-9 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        {formations.map((f, i) => (
          <Reveal key={f.degree} delay={i * 0.1} className="flex">
            <Plate
              label={f.badge}
              labelRight={f.year}
              tint
              className="flex h-full w-full min-w-0 flex-col px-6 py-9 md:px-9 md:py-10"
            >
              {/* Ligne de repères : le millésime en cote, l'établissement. */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span
                  className="font-display text-[34px] font-extrabold leading-none tracking-tighter tabular-nums text-accent sm:text-[42px]"
                  aria-hidden
                >
                  {f.year}
                </span>
                <span className="plate-dash hidden min-w-[40px] sm:block" aria-hidden />
                <PlateLabel className="[overflow-wrap:anywhere]">{f.institution}</PlateLabel>
              </div>

              <h3 className="mt-6 font-display text-lg font-bold leading-snug tracking-tight [overflow-wrap:anywhere] md:text-xl">
                {f.degree}
              </h3>

              <PlateLabel className="mt-2.5 block [overflow-wrap:anywhere]">
                {f.subtitle}
              </PlateLabel>

              <p className="mt-5 flex-1 text-[13px] leading-[1.7] text-muted">
                {f.description}
              </p>
            </Plate>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
