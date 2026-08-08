import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Github, Package, Radio } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Plate } from '@/components/primitives/plate'
import { useGsapEffect } from '@/lib/use-gsap'
import { prefersReducedMotion } from '@/lib/utils'
import type { LiveMetric, LiveMetricsPayload } from '@/lib/live-metrics'

gsap.registerPlugin(ScrollTrigger)

const IROKO_NPM = 'https://www.npmjs.com/package/@james10192/iroko'
const IROKO_REPO = 'https://github.com/James10192/iroko'

/**
 * La salle des machines : trois compteurs récupérés côté serveur au rendu,
 * mis en cache une heure. Les valeurs arrivent déjà formatées dans le HTML
 * SSR : rien à charger côté client, rien à inventer si une source est muette.
 */
export function MachineRoom({ data }: { data: LiveMetricsPayload }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useGsapEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return
    const tiles = gridRef.current.querySelectorAll<HTMLElement>('[data-metric]')
    gsap.from(tiles, {
      autoAlpha: 0,
      y: 26,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
    })
  }, gridRef)

  return (
    <section
      id="machine-room"
      className="relative overflow-hidden px-6 pb-20 pt-6 md:px-12 md:pb-28 md:pt-8"
    >
      <div
        className="pointer-events-none absolute right-2 top-8 font-display text-[100px] font-extrabold leading-none text-accent opacity-[0.025] md:right-12 md:top-12 md:text-[260px]"
        aria-hidden
      >
        05
      </div>

      <SectionHeader
        num="05"
        state="lecture en direct"
        title="La salle des machines"
        caption="Les projets ci-dessus racontent ce que j'ai construit. Ces compteurs, eux, sont lus en direct sur npm et GitHub à chaque rendu de la page. Ni capture d'écran, ni chiffre saisi à la main."
      />

      <div className="overflow-hidden rounded-2xl border border-line bg-ink2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-surface/40 px-3 py-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-yellow-400/60" />
            <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-green-400/60" />
            <span className="ml-2 truncate font-mono text-[10.5px] text-muted sm:ml-3 sm:text-[11px]">
              marcel @ portfolio : ~/metrics
            </span>
          </div>
          <span className="flex-shrink-0 font-mono text-[10px] tracking-wider text-muted">live</span>
        </header>

        <div className="px-4 py-5 md:px-6 md:py-6">
          <div className="pb-5 font-mono text-[12.5px] text-muted">
            <span className="text-accent">$</span> curl --silent registry.npmjs.org api.github.com
          </div>

          <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {data.metrics.map((m) => (
              <MetricTile key={m.key} metric={m} />
            ))}
          </div>

          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11.5px] text-muted">
            <Radio
              className={data.anyAvailable ? 'h-3.5 w-3.5 text-accent' : 'h-3.5 w-3.5 text-muted'}
              strokeWidth={2}
              aria-hidden
            />
            <span className={data.anyAvailable ? 'text-accent' : 'text-muted'}>
              {data.anyAvailable ? 'Données récupérées en direct' : 'Sources momentanément injoignables'}
            </span>
            <span aria-hidden>·</span>
            <span>{data.fetchedLabel}</span>
            <span aria-hidden>·</span>
            <span>cache serveur 1 h</span>
          </p>
        </div>

        <footer className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line bg-surface/40 px-4 py-3 md:px-6">
          <a
            href={IROKO_NPM}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 font-mono text-[11.5px] text-muted transition-colors hover:text-accent"
          >
            <Package className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            @james10192/iroko
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
          <a
            href={IROKO_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 font-mono text-[11.5px] text-muted transition-colors hover:text-accent"
          >
            <Github className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            code source, licence MIT
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
        </footer>
      </div>

      <p className="mt-8 max-w-2xl text-[14.5px] leading-[1.75] text-muted">
        Pourquoi exposer ça ? Parce qu'un portfolio se relit facilement et se vérifie
        rarement. Ici, si une source ne répond pas, la case affiche « indisponible »
        plutôt qu'un chiffre arrangé.{' '}
        <a
          href="/methode"
          className="text-paper underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
        >
          La même exigence gouverne ma méthode de travail
        </a>
        .
      </p>
    </section>
  )
}

function MetricTile({ metric: m }: { metric: LiveMetric }) {
  const available = m.value !== null
  return (
    <Plate
      data-metric
      label={available ? 'relevé' : 'hors service'}
      size="sm"
      quiet={!available}
      className="px-4 py-6 md:px-5"
    >
      <div className="mono-caps text-[10px] text-muted">{m.label}</div>

      {available ? (
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-display text-[2rem] font-extrabold leading-none tabular-nums text-accent md:text-[2.4rem]">
            {m.value}
          </span>
          <span className="font-mono text-[11px] text-muted">{m.unit}</span>
        </div>
      ) : (
        <div className="mt-3 flex items-baseline gap-1.5">
          <span
            className="font-display text-[2rem] font-extrabold leading-none text-line2 md:text-[2.4rem]"
            aria-hidden
          >
            ···
          </span>
          <span className="font-mono text-[11px] text-muted">indisponible</span>
        </div>
      )}

      <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
        {available ? m.detail : `Source non contactée : ${m.reason}. Aucune valeur affichée.`}
      </p>
    </Plate>
  )
}
