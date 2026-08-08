import { describe, it, expect } from 'vitest'
import { countRecentPushEvents, formatFetchedAt, metric, unavailableMetrics } from './live-metrics'

const NOW = new Date('2026-08-07T12:00:00Z')

const evt = (type: string, iso: string) => ({ type, created_at: iso })

describe('countRecentPushEvents', () => {
  it('compte uniquement les PushEvent de la fenêtre', () => {
    const payload = [
      evt('PushEvent', '2026-08-07T09:00:00Z'),
      evt('PushEvent', '2026-07-20T09:00:00Z'),
      evt('WatchEvent', '2026-08-06T09:00:00Z'),
      evt('PushEvent', '2026-06-01T09:00:00Z'), // hors fenêtre 30 jours
    ]
    expect(countRecentPushEvents(payload, NOW)).toBe(2)
  })

  it('retourne 0 quand le tableau est vide', () => {
    expect(countRecentPushEvents([], NOW)).toBe(0)
  })

  it('retourne null sur une réponse non tabulaire (rate limit GitHub)', () => {
    expect(countRecentPushEvents({ message: 'API rate limit exceeded' }, NOW)).toBeNull()
    expect(countRecentPushEvents(null, NOW)).toBeNull()
  })

  it('ignore les entrées mal formées sans planter', () => {
    const payload = [null, 'nope', { type: 'PushEvent' }, evt('PushEvent', 'pas-une-date')]
    expect(countRecentPushEvents(payload, NOW)).toBe(0)
  })
})

describe('formatFetchedAt', () => {
  it('formate en UTC de façon déterministe', () => {
    expect(formatFetchedAt(new Date('2026-08-07T09:05:00Z'))).toBe('07.08.2026 à 09h05 UTC')
  })
})

describe('metric', () => {
  it("n'attache pas de raison quand la valeur existe", () => {
    const m = metric('npm-version', 'v2.1.0')
    expect(m.value).toBe('v2.1.0')
    expect(m.reason).toBeUndefined()
  })

  it('attache toujours une raison quand la valeur manque', () => {
    expect(metric('npm-downloads', null, 'délai dépassé').reason).toBe('délai dépassé')
    expect(metric('npm-downloads', null).reason).toBe('source injoignable')
  })
})

describe('unavailableMetrics', () => {
  it('produit un repli complet sans aucune valeur inventée', () => {
    const payload = unavailableMetrics('collecte impossible', '07.08.2026 à 12h00 UTC')
    expect(payload.anyAvailable).toBe(false)
    expect(payload.metrics).toHaveLength(3)
    expect(payload.metrics.every((m) => m.value === null)).toBe(true)
  })
})
