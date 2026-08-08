import { describe, it, expect } from 'vitest'
import {
  episodeLabel,
  formatNoteDate,
  nextPublishedNote,
  notes,
  publishedNoteBySlug,
  publishedNotes,
  readingMinutes,
} from './notes'

describe('notes data', () => {
  it('a des slugs et des numéros d\'épisode uniques', () => {
    const slugs = notes.map((n) => n.slug)
    const episodes = notes.map((n) => n.episode)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(new Set(episodes).size).toBe(episodes.length)
  })

  it('donne à chaque note un titre, une thèse et une audience', () => {
    for (const n of notes) {
      expect(n.title.length).toBeGreaterThan(0)
      expect(n.thesis.length).toBeGreaterThan(0)
      expect(n.audience.length).toBeGreaterThan(0)
    }
  })

  it('fournit un corps complet pour chaque note publiée', () => {
    expect(publishedNotes.length).toBeGreaterThan(0)
    for (const n of publishedNotes) {
      expect(n.chapo.length).toBeGreaterThan(0)
      expect(n.debate.length).toBeGreaterThan(0)
      expect(n.sections.length).toBeGreaterThanOrEqual(3)
      for (const s of n.sections) {
        expect(s.heading.length).toBeGreaterThan(0)
        expect(s.paragraphs.length).toBeGreaterThan(0)
      }
    }
  })

  it("n'expose aucune note à venir en lecture", () => {
    for (const n of notes) {
      if (n.status === 'a-venir') expect(publishedNoteBySlug(n.slug)).toBeUndefined()
    }
    expect(publishedNoteBySlug('slug-inexistant')).toBeUndefined()
  })

  it('retrouve chaque note publiée par son slug', () => {
    for (const n of publishedNotes) {
      expect(publishedNoteBySlug(n.slug)?.slug).toBe(n.slug)
    }
  })

  it('enchaîne les notes publiées dans l\'ordre de la série', () => {
    const last = publishedNotes[publishedNotes.length - 1]
    expect(nextPublishedNote(last.slug)).toBeUndefined()
    if (publishedNotes.length > 1) {
      expect(nextPublishedNote(publishedNotes[0].slug)?.slug).toBe(publishedNotes[1].slug)
    }
  })

  it('formate les numéros et les dates sans dépendre de la locale machine', () => {
    expect(episodeLabel(1)).toBe('01')
    expect(episodeLabel(9)).toBe('09')
    expect(episodeLabel(12)).toBe('12')
    expect(formatNoteDate('2026-07-14')).toBe('14 juillet 2026')
  })

  it('estime un temps de lecture cohérent avec un article long', () => {
    for (const n of publishedNotes) {
      expect(readingMinutes(n)).toBeGreaterThanOrEqual(3)
      expect(readingMinutes(n)).toBeLessThanOrEqual(10)
    }
  })
})
