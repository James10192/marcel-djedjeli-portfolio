export type Experience = {
  date: string
  status: 'active' | 'ended'
  company: string
  role: string
  url?: string
  bullets: string[]
}

export const experiences: Experience[] = [
  {
    date: 'Mars 2024 → Présent',
    status: 'active',
    company: 'African Digit Consulting',
    role: 'Head of Development · Fullstack Developer',
    url: 'https://africandigitconsulting.com',
    bullets: [
      "Direction technique du département développement (architecture, code review, mentoring).",
      "Conception et livraison de bout en bout de Klassci, SaaS multi-tenant de gestion scolaire (7 600+ étudiants, 5+ écoles en production).",
      "Mise en place du process qualité : conventions code, CI Vercel, pipeline de déploiement, tests automatisés.",
      "Réalisation de sites vitrines premium pour clients (Fejeci, SOPREMI, ITM, GUCE).",
    ],
  },
  {
    date: 'Fév. 2025 → Sept. 2025',
    status: 'ended',
    company: 'NSIA Banque CI',
    role: 'Full Stack Developer · Stage',
    bullets: [
      "Développement de SDAI, outil interne de régularisation des fichiers XML SMARTVISTA (~1000 comptes/seconde).",
      "Conception de webservices pour applications bancaires internes.",
      "Maintenance corrective et évolutive sur l'écosystème applicatif existant.",
    ],
  },
  {
    date: 'Nov. 2021 → Mars 2022',
    status: 'ended',
    company: 'ITF Bureau Afrique Francophone',
    role: 'Maintenancier Informatique',
    bullets: [
      "Mise en place de nouvelles technologies hardware et software.",
      "Assistance informatique complète au bureau régional.",
    ],
  },
  {
    date: 'Juin 2021 → Sept. 2021',
    status: 'ended',
    company: "Port Autonome d'Abidjan",
    role: 'Stagiaire Réseau Informatique',
    bullets: [
      "Mise en place d'une nouvelle installation réseau.",
      "Développement de composants front-end pour applications internes du port.",
    ],
  },
]
