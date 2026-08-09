import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personal } from '@/data/personal'
import { SplitText } from '@/components/primitives/split-text'
import { Magnetic } from '@/components/primitives/magnetic'
import { Plate, PlateLabel, PlateMeasure, MarginNote } from '@/components/primitives/plate'
import { useGsapEffect } from '@/lib/use-gsap'
import { prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * Les cotes du plan. Les chiffres du portfolio sont présentés comme des
 * mesures d'ouvrage : ce que la structure porte, jusqu'où elle va, depuis
 * combien de temps elle tient.
 */
const measures = [
  { label: 'charge utile', value: '7 600+', unit: 'étudiants servis' },
  { label: 'portée', value: '5+', unit: 'établissements' },
  { label: 'résistance', value: '3 ans', unit: 'en production' },
] as const

/** Les quatre temps de la méthode, annotés en marge comme sur un plan. */
const annotations = [
  { key: 'A', text: 'cadrer avant de coder' },
  { key: 'B', text: 'montrer avant de construire' },
  { key: 'C', text: 'documenter avant de livrer' },
  { key: 'D', text: 'vérifier avant de merger' },
] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGsapEffect(() => {
    if (prefersReducedMotion()) return

    gsap.from('[data-hero-label]', { opacity: 0, x: -20, duration: 0.7, delay: 0.1, ease: 'power2.out' })
    gsap.from('[data-hero-tagline]', { opacity: 0, y: 16, duration: 0.6, delay: 0.55, ease: 'power2.out' })
    gsap.from('[data-hero-cta]', { opacity: 0, y: 16, duration: 0.6, delay: 0.7, ease: 'power2.out' })
    gsap.from('[data-hero-measure]', {
      opacity: 0,
      y: 18,
      duration: 0.5,
      delay: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
    })
    gsap.from('[data-hero-margin]', { opacity: 0, x: 20, duration: 0.7, delay: 0.85, ease: 'power2.out' })
    gsap.from('[data-hero-scroll-inner]', { opacity: 0, duration: 1, delay: 1.2, ease: 'power1.out' })

    gsap.to('[data-hero-scroll-line]', { y: 6, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    // Parallaxe légère : le fond descend, le contenu suit avec retard.
    gsap.fromTo(
      '[data-hero-bg]',
      { y: 0 },
      { y: -120, ease: 'none', scrollTrigger: { start: 0, end: 600, scrub: true } },
    )
    gsap.fromTo(
      '[data-hero-content]',
      { y: 0 },
      { y: 40, ease: 'none', scrollTrigger: { start: 0, end: 600, scrub: true } },
    )
    gsap.fromTo(
      '[data-hero-content]',
      { opacity: 1 },
      { opacity: 0.65, ease: 'none', scrollTrigger: { start: 0, end: 500, scrub: true } },
    )
  }, ref)

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden px-6 pb-12 pt-12 md:px-12 md:pt-16"
    >
      {/* Halo lime très diffus : la seule matière du fond. */}
      <div data-hero-bg className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="lime-glow absolute right-0 top-1/3 h-[620px] w-[620px] -translate-y-1/3 translate-x-1/3 opacity-70" />
      </div>

      <div
        data-hero-content
        className="relative z-10 grid grid-cols-1 gap-y-12 lg:grid-cols-[minmax(0,1fr)_286px] lg:gap-x-14"
      >
        {/* Colonne principale : le sujet du plan, ses cotes, les actions. */}
        <div className="@container flex min-w-0 flex-col gap-10">
          <Plate label="sujet" size="lg" className="px-5 py-7 sm:px-8 sm:py-9">
            <div data-hero-label className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-6 bg-accent" />
              <PlateLabel accent>Fullstack Developer · Abidjan, CI</PlateLabel>
            </div>

            <h1 className="heading leading-[1.02]">
              <span className="block text-[clamp(28px,9cqi,56px)] lg:text-[clamp(48px,9.6cqi,96px)]">
                <SplitText text="N'Guessan" delay={0.15} />
              </span>
              <span className="block text-[clamp(32px,11cqi,68px)] lg:text-[clamp(58px,11.6cqi,116px)]">
                <SplitText text="Marcel" delay={0.25} className="font-serif italic text-accent" />
              </span>
              <span className="block text-[clamp(26px,9.8cqi,52px)] lg:text-[clamp(44px,10.2cqi,86px)]">
                <SplitText text="DJEDJE-LI" delay={0.35} />
              </span>
            </h1>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Full Stack Developer · Head of Development
            </p>

            <p data-hero-tagline className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              {personal.tagline}
            </p>
          </Plate>

          {/* Rangée de cotes */}
          <div>
            <PlateLabel className="mb-4 block">mesures relevées</PlateLabel>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {measures.map((m, i) => (
                <PlateMeasure
                  key={m.label}
                  label={m.label}
                  value={m.value}
                  unit={m.unit}
                  className={i === 2 ? 'col-span-2 md:col-span-1' : undefined}
                />
              ))}
            </div>
          </div>

          <div data-hero-cta className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="inline-flex h-12 items-center bg-accent px-7 font-mono text-sm font-medium transition-colors hover:bg-accent-soft"
                style={{ color: '#0a0a08' }}
              >
                Voir mes projets →
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="plate plate-sm inline-flex h-12 items-center px-7 font-mono text-sm text-paper transition-colors hover:text-accent"
              >
                Me contacter
              </a>
            </Magnetic>
            <a
              href={personal.cvPdf}
              download
              className="inline-flex h-12 items-center gap-2 px-2 font-mono text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Télécharger le CV (PDF)
            </a>
          </div>

          {/* Nomenclature des matériaux : la pile technique, en légende de plan. */}
          <div>
            <PlateLabel className="mb-3 block">matériaux</PlateLabel>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {personal.techHighlights.map((t) => (
                <span key={t} className="font-mono text-[11px] text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Marge du plan : annotations et méthode publique.
            Sous le contenu principal sur petit écran, en colonne à droite au-delà. */}
        <div data-hero-margin className="flex flex-col gap-8 lg:justify-between">
          <MarginNote label="annotations" items={annotations} />

          <Plate label="méthode publique" size="sm" tint className="px-5 py-5">
            <p className="font-mono text-[12.5px] leading-relaxed text-paper">
              npx @james10192/iroko
              <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.12em] bg-accent" aria-hidden />
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-muted">
              Mes règles de travail, empaquetées et publiées sur npm. Ce que j'applique, vous
              pouvez l'installer.
            </p>
          </Plate>
        </div>
      </div>

      {/* Indicateur de descente */}
      <div className="mt-14 hidden justify-center md:flex">
        <div data-hero-scroll-inner className="flex flex-col items-center gap-2">
          <PlateLabel>défiler</PlateLabel>
          <span data-hero-scroll-line className="h-6 w-px bg-accent" />
        </div>
      </div>
    </section>
  )
}
