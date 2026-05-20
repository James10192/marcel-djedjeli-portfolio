export type Project = {
  slug: string
  type: string
  title: string
  tagline: string
  description: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  docsUrl?: string
  featured?: boolean
  year: string
  metrics?: { value: string; label: string }[]
}

export const projects: Project[] = [
  {
    slug: 'klassci',
    type: 'SaaS phare · Gestion scolaire',
    title: 'Klassci',
    tagline: 'La gestion scolaire, repensée pour l\'Afrique francophone.',
    description: "Plateforme SaaS multi-tenant complète pour l'enseignement supérieur : inscriptions, notes, bulletins PDF, emplois du temps, finances, paies du personnel, LMS, API REST. Conforme LMD UEMOA. Déployée en production dans 5+ établissements à Abidjan et Yamoussoukro, elle administre aujourd'hui plus de 7 600 étudiants.",
    tech: ['Laravel 12', 'PHP', 'MySQL', 'Alpine.js', 'Blade', 'Redis', 'Sanctum', 'REST API', 'Multi-tenant'],
    liveUrl: 'https://klassci.com',
    docsUrl: 'https://deepwiki.com/James10192/KLASSCIv2',
    githubUrl: 'https://github.com/James10192/KLASSCIv2',
    featured: true,
    year: '2024 → présent',
    metrics: [
      { value: '5+', label: 'Écoles en prod' },
      { value: '7 600+', label: 'Étudiants' },
    ],
  },
  {
    slug: 'klassci-landing',
    type: 'Vitrine SaaS',
    title: 'Klassci Landing',
    tagline: 'La page d\'acquisition de Klassci.',
    description: "Site marketing apex de Klassci, conçu pour convertir les directeurs d'écoles. i18n FR/EN, animations Motion, intégration PostHog pour le funnel d'acquisition.",
    tech: ['Next.js 14', 'next-intl', 'Tailwind CSS', 'Motion', 'PostHog', 'Vercel'],
    liveUrl: 'https://klassci-landing.vercel.app',
    githubUrl: 'https://github.com/James10192/klassci-landing',
    year: '2025',
  },
  {
    slug: 'smartlink',
    type: 'SaaS · Profil numérique',
    title: 'SmartLink',
    tagline: 'Votre carte de visite, en QR code dynamique.',
    description: "SaaS permettant aux professionnels de créer un profil numérique avec QR code dynamique. Un scan = contact enregistré, CV accessible. Paiements intégrés via CinetPay et Lemon Squeezy.",
    tech: ['Next.js 16', 'TypeScript', 'Supabase', 'Prisma', 'Better-Auth', 'Tailwind v4', 'Bun'],
    liveUrl: 'https://smartlink-roan.vercel.app',
    githubUrl: 'https://github.com/James10192/SmartLink-codeQR',
    year: '2025',
  },
  {
    slug: 'itm',
    type: 'Vitrine premium',
    title: 'ITM Construction Métallique',
    tagline: 'Site vitrine + CMS pour un industriel d\'Abidjan.',
    description: "Site vitrine premium pour ITM Construction Métallique : galerie de réalisations dynamique, formulaire de devis sécurisé, envoi email via Resend. Lighthouse mobile ≥ 90, SEO 100.",
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Resend', 'Vercel'],
    liveUrl: 'https://itm-website-henna.vercel.app',
    githubUrl: 'https://github.com/James10192/ITM-website',
    year: '2025',
  },
  {
    slug: 'sopremi',
    type: 'Cockpit B2B · Maquette',
    title: 'SOPREMI Cockpit',
    tagline: 'Cockpit opérationnel pour prestations minières.',
    description: "Maquette interactive d'un tableau de bord opérationnel pour SOPREMI, prestataire de services miniers. Démonstration B2B avec KPIs, plannings, alertes terrain.",
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    liveUrl: 'https://sopremi-maquette.vercel.app',
    githubUrl: 'https://github.com/James10192/sopremi-maquette',
    year: '2026',
  },
  {
    slug: 'iroko',
    type: 'Package open source · npm',
    title: 'iroko',
    tagline: 'La config Claude Code que je voulais pour mes équipes.',
    description: "Package npm publiant rules, skills, agents et hooks pour Claude Code. Sémantique versioning strict, distribution via npm registry. Utilisé pour standardiser les workflows IA entre développeurs.",
    tech: ['TypeScript', 'npm', 'Claude Code', 'Plugin marketplace'],
    githubUrl: 'https://github.com/James10192/iroko',
    liveUrl: 'https://iroko-site.vercel.app',
    year: '2026',
  },
  {
    slug: 'fejeci',
    type: 'Site vitrine client',
    title: 'Fejeci',
    tagline: 'Site institutionnel livré chez ADC.',
    description: "Site vitrine institutionnel livré en quelques jours pour le client Fejeci, dans le cadre de mon poste chez African Digit Consulting.",
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://fejeci-website.vercel.app',
    year: '2026',
  },
  {
    slug: 'sdai',
    type: 'Outil bancaire interne · NSIA',
    title: 'SDAI · Régularisation SMARTVISTA',
    tagline: 'Outil critique livré pour NSIA Banque CI.',
    description: "Application web interne pour NSIA Banque : traitement automatique de fichiers XML SMARTVISTA, correction des numéros de compte tronqués via table de correspondance. Dashboard de suivi et panel d'administration. ~1000 comptes/seconde.",
    tech: ['Python', 'Flask', 'MySQL', 'Bootstrap', 'JavaScript', 'XML'],
    githubUrl: 'https://github.com/James10192/SDAI-CompteSmartVtoCompeAmpli',
    year: '2025',
  },
]
