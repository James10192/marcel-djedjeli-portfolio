import { describe, it, expect } from 'vitest'
import { renderRss } from './rss'
import { publishedNotes, type PublishedNote } from '@/data/notes'
import { SITE_URL } from './site'

const base = publishedNotes[0]

describe('rss', () => {
  it('publie un item par note publiée, avec son URL absolue', () => {
    const xml = renderRss()
    expect(xml.match(/<item>/g)?.length).toBe(publishedNotes.length)
    for (const n of publishedNotes) expect(xml).toContain(`<link>${SITE_URL}/notes/${n.slug}</link>`)
  })

  it('met la note la plus récente en premier', () => {
    const older: PublishedNote = { ...base, slug: 'ancienne', title: 'Ancienne', date: '2026-01-01' }
    const newer: PublishedNote = { ...base, slug: 'recente', title: 'Récente', date: '2026-09-01' }
    const xml = renderRss([older, newer])
    expect(xml.indexOf('Récente')).toBeLessThan(xml.indexOf('Ancienne'))
    expect(xml).toContain('<lastBuildDate>Tue, 01 Sep 2026 12:00:00 GMT</lastBuildDate>')
  })

  it('échappe les caractères XML du contenu', () => {
    const xml = renderRss([{ ...base, title: 'Code & produit <v2>' }])
    expect(xml).toContain('<title>Code &amp; produit &lt;v2&gt;</title>')
  })
})
