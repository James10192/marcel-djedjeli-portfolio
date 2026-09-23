import type { PublishedNote } from './types'
import { pad2 } from '@/lib/utils'

/** Numéro d'épisode formaté sur deux chiffres : 1 devient « 01 ». */
export function episodeLabel(episode: number): string {
  return pad2(episode)
}

/** Temps de lecture estimé, base 200 mots par minute, minimum 1 minute. */
export function readingMinutes(note: PublishedNote): number {
  const words = [
    note.chapo,
    ...note.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
    note.debate,
  ]
    .join(' ')
    .trim()
    .split(/\s+/).length

  return Math.max(1, Math.round(words / 200))
}

const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
]

/**
 * Formate une date ISO en français sans dépendre de Intl : le rendu serveur et
 * le rendu client produisent ainsi exactement la même chaîne (pas de mismatch
 * d'hydratation lié à la locale de la machine).
 */
export function formatNoteDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}

