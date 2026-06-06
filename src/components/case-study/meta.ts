import type { CaseStudy } from '@/data/case-studies'

/** Libellé + ton d'un statut projet. */
export const STATUS_META: Record<
  CaseStudy['status'],
  { label: string; tone: 'prod' | 'neutral' }
> = {
  prod: { label: 'En production', tone: 'prod' },
  livre: { label: 'Livré', tone: 'neutral' },
  maquette: { label: 'Maquette', tone: 'neutral' },
  dev: { label: 'En développement', tone: 'neutral' },
}

/** Famille d'un projet, dérivée du libellé de rôle/contenu, pour le filtre. */
export type Family = 'saas' | 'vitrine' | 'oss' | 'interne'

export const FAMILY_LABEL: Record<Family, string> = {
  saas: 'SaaS & produits',
  vitrine: 'Sites & vitrines',
  oss: 'Open source',
  interne: 'Outils internes',
}

/** Classe un projet dans une famille à partir de son slug (mapping explicite). */
const FAMILY_BY_SLUG: Record<string, Family> = {
  klassci: 'saas',
  'klassci-landing': 'vitrine',
  akwaba: 'saas',
  'adc-paie': 'saas',
  smartlink: 'saas',
  itm: 'vitrine',
  fejeci: 'vitrine',
  'adc-website': 'vitrine',
  'la-victoire': 'vitrine',
  wouri: 'vitrine',
  sopremi: 'vitrine',
  iroko: 'oss',
  sdai: 'interne',
}

export function familyOf(slug: string): Family {
  return FAMILY_BY_SLUG[slug] ?? 'saas'
}
