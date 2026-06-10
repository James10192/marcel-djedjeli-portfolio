import { Reveal } from '@/components/primitives/reveal'
import { SectionHeader } from '@/components/section-header'

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
      <SectionHeader num="05 —" title="Formation" />

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        {formations.map((f, i) => (
          <Reveal key={f.degree} delay={i * 0.1} className="flex">
            <div className="surface group relative flex h-full w-full flex-col overflow-hidden p-8 md:p-10">
              <div
                className="pointer-events-none absolute -right-5 top-1/2 -translate-y-1/2 rotate-90 font-display text-6xl font-extrabold opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.06] md:text-7xl"
                aria-hidden
              >
                {f.badge}
              </div>

              <div className="font-display text-4xl font-extrabold leading-none text-accent md:text-5xl">
                {f.year}
              </div>
              <div className="mt-2 text-xs text-muted">
                {f.institution}
                <br />
                <em className="not-italic text-muted/80">{f.subtitle}</em>
              </div>

              <h3 className="mt-6 font-display text-lg font-bold leading-snug tracking-tight md:text-xl">
                {f.degree}
              </h3>

              <p className="mt-4 flex-1 text-[13px] leading-[1.7] text-muted">
                {f.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
