import { createServerFn } from '@tanstack/react-start'
import { formatMetric } from '@/lib/metric'
import {
  countRecentPushEvents,
  formatFetchedAt,
  metric,
  unavailableMetrics,
  type LiveMetric,
  type LiveMetricsPayload,
} from '@/lib/live-metrics'

/** Durée de vie du cache mémoire : 1 heure. */
const TTL_MS = 60 * 60 * 1000
/** Au-delà, on considère la source injoignable plutôt que de retarder le rendu. */
const TIMEOUT_MS = 6000

const NPM_DOWNLOADS_URL = 'https://api.npmjs.org/downloads/point/last-week/@james10192/iroko'
const NPM_LATEST_URL = 'https://registry.npmjs.org/@james10192/iroko/latest'
const GITHUB_EVENTS_URL = 'https://api.github.com/users/James10192/events/public'

/**
 * Cache process-local. Le portfolio tourne en serverless : chaque instance
 * garde sa propre copie, ce qui suffit largement (3 appels externes par heure
 * et par instance) et évite toute dépendance de stockage.
 */
let cache: { payload: LiveMetricsPayload; expiresAt: number } | null = null

type FetchOutcome = { ok: true; data: unknown } | { ok: false; reason: string }

async function fetchJson(url: string): Promise<FetchOutcome> {
  try {
    const res = await fetch(url, {
      headers: {
        accept: 'application/json',
        // GitHub refuse les requêtes sans User-Agent identifiable.
        'user-agent': 'marcel-djedje-li-portfolio',
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })

    if (res.status === 403 || res.status === 429) {
      return { ok: false, reason: "quota de l'API atteint" }
    }
    if (res.status === 404) {
      return { ok: false, reason: 'ressource introuvable' }
    }
    if (!res.ok) {
      return { ok: false, reason: `réponse ${res.status}` }
    }
    return { ok: true, data: await res.json() }
  } catch (error) {
    const aborted = error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')
    return { ok: false, reason: aborted ? 'délai dépassé' : 'source injoignable' }
  }
}

function readNpmDownloads(outcome: FetchOutcome): LiveMetric {
  if (!outcome.ok) return metric('npm-downloads', null, outcome.reason)
  const raw = (outcome.data as { downloads?: unknown } | null)?.downloads
  if (typeof raw !== 'number' || !Number.isFinite(raw)) {
    return metric('npm-downloads', null, 'réponse inattendue')
  }
  return metric('npm-downloads', formatMetric(raw))
}

function readNpmVersion(outcome: FetchOutcome): LiveMetric {
  if (!outcome.ok) return metric('npm-version', null, outcome.reason)
  const raw = (outcome.data as { version?: unknown } | null)?.version
  if (typeof raw !== 'string' || raw.length === 0) {
    return metric('npm-version', null, 'réponse inattendue')
  }
  return metric('npm-version', `v${raw.replace(/^v/, '')}`)
}

function readGithubPushes(outcome: FetchOutcome, now: Date): LiveMetric {
  if (!outcome.ok) return metric('github-pushes', null, outcome.reason)
  const count = countRecentPushEvents(outcome.data, now)
  if (count === null) return metric('github-pushes', null, 'réponse inattendue')
  return metric('github-pushes', formatMetric(count))
}

async function collect(): Promise<LiveMetricsPayload> {
  const now = new Date()
  const [downloads, version, events] = await Promise.all([
    fetchJson(NPM_DOWNLOADS_URL),
    fetchJson(NPM_LATEST_URL),
    fetchJson(GITHUB_EVENTS_URL),
  ])

  const metrics = [
    readNpmDownloads(downloads),
    readNpmVersion(version),
    readGithubPushes(events, now),
  ]

  return {
    metrics,
    fetchedLabel: formatFetchedAt(now),
    anyAvailable: metrics.some((m) => m.value !== null),
  }
}

/**
 * Métriques vivantes de la salle des machines.
 *
 * Garanties :
 * · ne jette jamais (une page ne doit pas tomber parce que npm est lent) ;
 * · n'invente jamais de valeur : une source muette est rendue « indisponible » ;
 * · un cache mémoire d'une heure protège les API publiques et le temps de rendu ;
 * · si une collecte échoue entièrement, le dernier cache valide est réutilisé.
 */
export const getLiveMetrics = createServerFn({ method: 'GET' }).handler(
  async (): Promise<LiveMetricsPayload> => {
    const now = Date.now()
    if (cache && cache.expiresAt > now) return cache.payload

    try {
      const payload = await collect()
      // Une collecte totalement muette ne doit pas écraser un cache encore utile.
      if (!payload.anyAvailable && cache) return cache.payload
      cache = { payload, expiresAt: now + TTL_MS }
      return payload
    } catch {
      if (cache) return cache.payload
      return unavailableMetrics('collecte impossible', formatFetchedAt(new Date()))
    }
  },
)
