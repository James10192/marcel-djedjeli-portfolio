import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapEffect } from '@/lib/use-gsap'
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
import { Plate, PlateLabel } from '@/components/primitives/plate'
import { personal } from '@/data/personal'
import { prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * Le devis, en grammaire de plan.
 *
 * Chaque formule est une planche cadrée : le calque à gauche dit la famille
 * d'ouvrage, l'étiquette de droite porte la cote courte (ou la mention
 * « formule conseillée »). Le prix se lit comme une cote de plan : intitulé
 * mono, chiffre lime en Syne, unité en dessous. Les options ne sont plus des
 * badges bordés mais une nomenclature, comme les matériaux des cartes projets.
 *
 * Le lime reste rare : crochets, cotes, et le seul bouton principal.
 */

type Service = {
  icon: typeof Globe
  /** Numéro de repère sur la planche (08.1, 08.2...). */
  ref: string
  /** Calque : la famille d'ouvrage, étiquette de gauche. */
  tag: string
  /** Cote courte, étiquette de droite. */
  short: string
  name: string
  desc: string
  /** Intitulé de la cote de prix. */
  cote: string
  price: string
  unit?: string
  note?: string
  featured?: boolean
}

const SERVICES: Service[] = [
  {
    icon: Rocket,
    ref: '08.1',
    tag: 'site web',
    short: 'dès 200 k XOF',
    name: 'Landing page premium',
    desc: '1 page orientée conversion, responsive, SEO et mise en ligne clé en main.',
    cote: 'dès',
    price: '200 000',
    unit: 'XOF',
  },
  {
    icon: Globe,
    ref: '08.2',
    tag: 'site web',
    short: 'dès 450 k XOF',
    name: 'Site vitrine Essentiel',
    desc: '3 à 5 pages, responsive, formulaire de contact, SEO de base.',
    cote: 'dès',
    price: '450 000',
    unit: 'XOF',
  },
  {
    icon: Sparkles,
    ref: '08.3',
    tag: 'site web · cms',
    short: 'dès 850 k XOF',
    name: 'Site vitrine Premium',
    desc: 'Contenu éditable (CMS), animations soignées, Lighthouse 90+, SEO.',
    cote: 'dès',
    price: '850 000',
    unit: 'XOF',
    featured: true,
  },
  {
    icon: ShoppingCart,
    ref: '08.4',
    tag: 'e-commerce',
    short: 'dès 1,5 M XOF',
    name: 'Site marchand',
    desc: 'Catalogue, panier, paiement mobile money, gestion des commandes.',
    cote: 'dès',
    price: '1 500 000',
    unit: 'XOF',
  },
  {
    icon: LayoutDashboard,
    ref: '08.5',
    tag: 'application',
    short: 'sur devis',
    name: 'App web / SaaS sur mesure',
    desc: 'Authentification, tableau de bord, multi-tenant, temps réel, back-office.',
    cote: 'enveloppe',
    price: 'Sur devis',
    note: 'Projets dès 3 000 000 XOF',
  },
  {
    icon: PenTool,
    ref: '08.6',
    tag: 'design',
    short: 'dès 400 k XOF',
    name: 'Refonte & redesign UI/UX',
    desc: "Audit de l'existant, redesign premium, responsive, accessibilité.",
    cote: 'dès',
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

  useGsapEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return
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
  }, gridRef)

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
        08
      </div>

      <SectionHeader
        num="08"
        state="devis sur demande"
        title="Travaillons ensemble"
        caption="Sites, plateformes et applications sur mesure, du devis à la mise en ligne. Des formules claires pour démarrer vite, le sur-mesure pour les projets ambitieux."
      />

      {/* Bandeau de barème : ce que couvre la planche des formules. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-line pb-3">
        <PlateLabel accent>barème 2026</PlateLabel>
        <PlateLabel>
          <span className="tabular-nums">{SERVICES.length}</span> formules · hébergement au coût réel
        </PlateLabel>
      </div>

      {/* Grille des formules */}
      <div
        ref={gridRef}
        className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {SERVICES.map((s) => (
          <div key={s.name} data-svc className="will-change-transform">
            <ServiceCard service={s} />
          </div>
        ))}
      </div>

      {/* Nomenclature des options + le hors barème */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-3">
        <Plate
          label="options"
          labelRight="à la carte"
          tint
          className="px-6 py-9 md:col-span-2 md:px-8"
        >
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {OPTIONS.map((o) => (
              <span key={o} className="font-mono text-[11.5px] text-muted">
                {o}
              </span>
            ))}
          </div>
          <p className="mt-7 max-w-xl text-[13px] leading-relaxed text-muted">
            Maintenance dès <span className="text-paper">50 000 XOF/mois</span>. Nom
            de domaine et hébergement à votre charge, au coût réel (sans marge),
            tarifs communiqués selon l'extension et l'architecture.
          </p>
        </Plate>

        <Plate
          quiet
          label="hors barème"
          className="flex flex-col justify-between gap-6 px-6 py-9 md:px-7"
        >
          <div>
            <h3 className="font-display text-lg font-bold leading-snug tracking-tight">
              Projets ambitieux
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
              Plateformes d'intermédiation, applications mobiles, IA avancée.
              Chaque projet mérite une étude dédiée.
            </p>
          </div>
          <PlateLabel accent>sur devis</PlateLabel>
        </Plate>
      </div>

      {/* CTA : télécharger le catalogue + demander un devis */}
      <div className="mt-12 flex flex-col items-start gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[14px] leading-relaxed text-muted">
          Toutes les formules, options et tarifs détaillés dans le catalogue.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Magnetic strength={0.25}>
            <a
              href={personal.servicesPdf}
              download
              className="inline-flex h-12 items-center justify-center gap-2.5 bg-accent px-6 font-mono text-[11px] font-medium uppercase tracking-wider transition-colors hover:bg-accent-soft"
              style={{ color: '#0a0a08' }}
            >
              <Download className="h-4 w-4" aria-hidden />
              Télécharger le catalogue
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center justify-center gap-2.5 border border-line px-6 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-accent hover:text-accent"
            >
              Demander un devis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
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
    <TiltCard intensity={5} className="group flex h-full flex-col">
      <Plate
        label={s.tag}
        labelRight={s.featured ? '· formule conseillée' : s.short}
        tint
        live={s.featured}
        className="tilt-content relative z-10 flex h-full flex-col px-6 py-9 md:px-7 md:py-10"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
          <PlateLabel>réf. {s.ref}</PlateLabel>
        </div>

        <h3 className="mt-5 font-display text-xl font-extrabold leading-tight tracking-tight md:text-2xl">
          {s.name}
        </h3>
        <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-muted">
          {s.desc}
        </p>

        {/* La cote : intitulé mono, chiffre lime, unité en dessous. */}
        <div className="mt-7 border-t border-line pt-4">
          <PlateLabel>{s.cote}</PlateLabel>
          <div className="mt-2 font-display text-[clamp(22px,5.5vw,30px)] font-extrabold leading-none tabular-nums text-accent">
            {s.price}
          </div>
          <div className="mt-1.5 font-mono text-[11px] leading-tight text-muted">
            {s.unit ?? s.note}
          </div>
        </div>
      </Plate>
    </TiltCard>
  )
}
