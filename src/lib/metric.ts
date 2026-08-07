/**
 * Parsing d'une métrique affichable ("7 600+", "76 specs Vitest", "BAC+3")
 * en préfixe / nombre cible / suffixe pour l'animation de comptage.
 * Retourne null si aucune valeur numérique animable.
 */
export function parseMetric(value: string): { prefix: string; target: number; suffix: string } | null {
  const match = value.match(/(\d[\d\s .,]*\d|\d)/)
  if (!match) return null
  const target = Number(match[1].replace(/[\s .,]/g, ''))
  return {
    prefix: value.slice(0, match.index),
    target,
    suffix: value.slice((match.index ?? 0) + match[1].length),
  }
}

/** Formate un nombre avec des espaces comme séparateurs de milliers (usage FR). */
export function formatMetric(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
