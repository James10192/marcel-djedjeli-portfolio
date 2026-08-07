import { describe, it, expect } from 'vitest'
import { parseMetric, formatMetric } from './metric'

describe('parseMetric', () => {
  it('parse une valeur simple avec suffixe', () => {
    expect(parseMetric('10+')).toEqual({ prefix: '', target: 10, suffix: '+' })
  })

  it('parse les milliers à la française (espace)', () => {
    expect(parseMetric('7 600+')).toEqual({ prefix: '', target: 7600, suffix: '+' })
  })

  it('parse un suffixe texte', () => {
    expect(parseMetric('76 specs Vitest')).toEqual({ prefix: '', target: 76, suffix: ' specs Vitest' })
  })

  it('parse un préfixe texte (BAC+3)', () => {
    expect(parseMetric('BAC+3')).toEqual({ prefix: 'BAC+', target: 3, suffix: '' })
  })

  it('retourne null sans chiffre', () => {
    expect(parseMetric('Temps réel')).toBeNull()
  })
})

describe('formatMetric', () => {
  it('sépare les milliers par des espaces', () => {
    expect(formatMetric(7600)).toBe('7 600')
    expect(formatMetric(1234567)).toBe('1 234 567')
  })

  it('laisse les petits nombres intacts', () => {
    expect(formatMetric(42)).toBe('42')
    expect(formatMetric(0)).toBe('0')
  })

  it('arrondit les valeurs intermédiaires du tween', () => {
    expect(formatMetric(7599.6)).toBe('7 600')
  })
})
