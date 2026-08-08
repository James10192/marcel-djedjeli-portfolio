/**
 * Types et helpers purs de la « salle des machines ».
 *
 * Aucune I/O ici : la récupération réseau et le cache vivent dans
 * src/server/live-metrics.ts (côté serveur uniquement). Ce module est
 * importable partout et testable sans réseau.
 */

export type MetricKey = 'npm-downloads' | 'npm-version' | 'github-pushes'

export type LiveMetric = {
  key: MetricKey
  /** Libellé court, affiché en mono-caps. */
  label: string
  /** Valeur formatée, ou null si la source n'a pas répondu. */
  value: string | null
  /** Unité affichée à côté de la valeur (« /semaine », « commits »...). */
  unit: string
  /** Phrase d'explication sous la valeur. */
  detail: string
  /** Raison lisible de l'indisponibilité, seulement si value est null. */
  reason?: string
}

export type LiveMetricsPayload = {
  metrics: LiveMetric[]
  /** Horodatage formaté côté serveur : identique au rendu SSR et à l'hydratation. */
  fetchedLabel: string
  /** true si au moins une source a répondu. */
  anyAvailable: boolean
}

type GithubEvent = { type?: unknown; created_at?: unknown }

/**
 * Compte les PushEvent publics des `days` derniers jours.
 * Retourne null si la charge utile n'est pas exploitable (rate limit, format
 * inattendu) : on préfère afficher « indisponible » plutôt qu'un zéro trompeur.
 */
export function countRecentPushEvents(payload: unknown, now: Date, days = 30): number | null {
  if (!Array.isArray(payload)) return null
  const floor = now.getTime() - days * 24 * 60 * 60 * 1000
  let count = 0
  for (const raw of payload as Array<GithubEvent>) {
    if (!raw || typeof raw !== 'object') continue
    if (raw.type !== 'PushEvent') continue
    if (typeof raw.created_at !== 'string') continue
    const at = Date.parse(raw.created_at)
    if (Number.isNaN(at) || at < floor) continue
    count += 1
  }
  return count
}

/**
 * Horodatage déterministe (UTC) : le serveur rend la même chaîne que celle
 * réhydratée par le client, quel que soit le fuseau du visiteur.
 */
export function formatFetchedAt(date: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(date.getUTCDate())}.${p(date.getUTCMonth() + 1)}.${date.getUTCFullYear()} à ${p(
    date.getUTCHours(),
  )}h${p(date.getUTCMinutes())} UTC`
}

/** Charge utile de repli : toutes les sources marquées indisponibles. */
export function unavailableMetrics(reason: string, fetchedLabel: string): LiveMetricsPayload {
  return {
    fetchedLabel,
    anyAvailable: false,
    metrics: [
      metric('npm-downloads', null, reason),
      metric('npm-version', null, reason),
      metric('github-pushes', null, reason),
    ],
  }
}

const DESCRIPTORS: Record<MetricKey, { label: string; unit: string; detail: string }> = {
  'npm-downloads': {
    label: 'npm · téléchargements',
    unit: '/ 7 jours',
    detail: "Installations du package @james10192/iroko sur le registre npm.",
  },
  'npm-version': {
    label: 'npm · version publiée',
    unit: 'en ligne',
    detail: 'Dernière version publiée, lisible par tout le monde sur npm.',
  },
  'github-pushes': {
    label: 'github · pushes publics',
    unit: '/ 30 jours',
    detail: 'Activité publique du compte James10192 sur les 30 derniers jours.',
  },
}

/** Fabrique une métrique : value non nulle = disponible, sinon reason obligatoire. */
export function metric(key: MetricKey, value: string | null, reason?: string): LiveMetric {
  const d = DESCRIPTORS[key]
  return {
    key,
    label: d.label,
    value,
    unit: d.unit,
    detail: d.detail,
    ...(value === null ? { reason: reason ?? 'source injoignable' } : {}),
  }
}
