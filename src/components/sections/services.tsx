import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Rocket,
  Globe,
  Sparkles,
  ShoppingCart,
  LayoutDashboard,
  PenTool,
  Download,
  ArrowRight,
} from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/primitives/tilt-card'
import { Magnetic } from '@/components/primitives/magnetic'
import { personal } from '@/data/personal'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

type Service = {
  icon: typeof Globe
  tag: string
  name: string
  desc: string
  prefix?: string
  price: string
  unit?: string
  note?: string
  featured?: boolean
}

const SERVICES: Service[] = [
  {
    icon: Rocket,
    tag: 'Site web',
    name: 'Landing page premium',
    desc: "1 page orientée conversion, responsive, SEO et mise en ligne clé en main.",
    prefix: 'Dès',
    price: '200 000',
    unit: 'XOF',
  },
  {
    icon: Globe,
    tag: 'Site web',
    name: 'Site vitrine Essentiel',
    desc: '3 à 5 pages, responsive, formulaire de contact, SEO de base.',
    prefix: 'Dès',
    price: '450 000',
    unit: 'XOF',
  },
  {
    icon: Sparkles,
    tag: 'Site web · CMS',
    name: 'Site vitrine Premium',
    desc: 'Contenu éditable (CMS), animations soignées, Lighthouse 90+, SEO.',
    prefix: 'Dès',
    price: '850 000',
    unit: 'XOF',
    featured: true,
  },
  {
    icon: ShoppingCart,
    tag: 'E-commerce',
    name: 'Site marchand',
    desc: 'Catalogue, panier, paiement mobile money, gestion des commandes.',
    prefix: 'Dès',
    price: '1 500 000',
    unit: 'XOF',
  },
  {
    icon: LayoutDashboard,
    tag: 'Application',
    name: 'App web / SaaS sur mesure',
    desc: 'Authentification, tableau de bord, multi-tenant, temps réel, back-office.',
    price: 'Sur devis',
    note: 'Projets dès 3 000 000 XOF',
  },
  {
    icon: PenTool,
    tag: 'Design',
    name: 'Refonte & redesign UI/UX',
    desc: "Audit de l'existant, redesign premium, responsive, accessibilité.",
    prefix: 'Dès',
    price: '400 000',
    unit: 'XOF',
  },
]

const OPTIONS = [
  'Paiement mobile money',
  'SEO avancé',
  'Back-office',
  'Génération de PDF',
  'Tableaux de bord',
  'IA & automatisation',
]

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reduced() || !gridRef.current) return
      const cards = gridRef.current.querySelectorAll<HTMLElement>('[data-svc]')
      // Une seule tween + stagger (compositor-friendly : transform + opacity).
      gsap.from(cards, {
        autoAlpha: 0,
        y: 34,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
      })
    },
    { scope: gridRef },
  )

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-line px-6 py-20 md:px-12 md:py-28"
    >
      {/* Chiffre géant décoratif */}
      <div
        className="pointer-events-none absolute right-2 top-8 font-display text-[100px] font-extrabold leading-none text-accent opacity-[0.025] md:right-12 md:top-12 md:text-[260px]"
        aria-hidden
      >
        06
      </div>

      <SectionHeader
        num="06 —"
        title="Travaillons ensemble"
        caption="Sites, plateformes et applications sur mesure, du devis à la mise en ligne. Des formules claires pour démarrer vite, le sur-mesure pour les projets ambitieux."
      />

      {/* Grille des formules */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {SERVICES.map((s) => (
          <div key={s.name} data-svc className="will-change-transform">
            <ServiceCard service={s} />
          </div>
        ))}
      </div>

      {/* Bande options + maintenance + coûts tiers */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-3">
        <div className="surface p-6 md:col-span-2">
          <div className="mono-caps text-accent">Options à la carte</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {OPTIONS.map((o) => (
              <span
                key={o}
                className="border border-line px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted"
              >
                {o}
              </span>
            ))}
          </div>
          <p className="mt-5 text-[13px] leading-relaxed text-muted">
            Maintenance dès <span className="text-paper">50 000 XOF/mois</span>. Nom
            de domaine et hébergement à votre charge, au coût réel (sans marge),
            tarifs communiqués selon l'extension et l'architecture.
          </p>
        </div>

        <div className="surface flex flex-col justify-between gap-5 p-6">
          <div>
            <div className="mono-caps text-accent">Projets ambitieux</div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
              Plateformes d'intermédiation, applications mobiles, IA avancée.
              Chaque projet mérite une étude dédiée.
            </p>
          </div>
          <div
            className="inline-flex w-max items-center gap-2 border border-accent/40 bg-accent-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-accent"
          >
            Sur devis
          </div>
        </div>
      </div>

      {/* CTA : télécharger le catalogue + demander un devis */}
      <div className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[15px] leading-relaxed text-paper">
          Toutes les formules, options et tarifs détaillés dans le catalogue.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Magnetic strength={0.25}>
            <a
              href={personal.servicesPdf}
              download
              className="inline-flex h-12 items-center justify-center gap-2 bg-accent px-7 font-mono text-sm font-medium transition-colors hover:bg-accent-soft"
              style={{ color: '#0a0a08' }}
            >
              <Download className="h-4 w-4" />
              Télécharger le catalogue
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center justify-center gap-2 border border-line px-7 font-mono text-sm text-paper transition-colors hover:border-accent hover:text-accent"
            >
              Demander un devis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service: s }: { service: Service }) {
  const Icon = s.icon
  return (
    <TiltCard
      intensity={5}
      className={cn(
        'surface group relative flex h-full flex-col p-6 md:p-7',
        s.featured && 'ring-1 ring-accent/40',
      )}
    >
      <div className="tilt-content flex h-full flex-col">
        {s.featured && (
          <div
            className="absolute right-0 top-0 bg-accent px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider"
            style={{ color: '#0a0a08' }}
          >
            ★ Recommandé
          </div>
        )}

        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line bg-ink2 text-accent transition-colors group-hover:border-accent">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="mono-caps text-muted">{s.tag}</span>
        </div>

        <h3 className="mt-5 font-display text-xl font-extrabold leading-tight tracking-tight md:text-2xl">
          {s.name}
        </h3>
        <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-muted">
          {s.desc}
        </p>

        <div className="mt-6 border-t border-line pt-4">
          {s.prefix && (
            <div className="mono-caps text-[10px] text-muted">{s.prefix}</div>
          )}
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-extrabold tabular-nums text-accent md:text-[1.7rem]">
              {s.price}
            </span>
            {s.unit && (
              <span className="font-mono text-xs text-muted">{s.unit}</span>
            )}
          </div>
          {s.note && (
            <div className="mt-1 font-mono text-[11px] text-muted">{s.note}</div>
          )}
        </div>
      </div>
    </TiltCard>
  )
}
