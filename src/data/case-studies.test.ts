import { describe, it, expect } from 'vitest'
import { caseStudies, publicCaseStudies, caseStudyBySlug } from './case-studies'
import { projects } from './projects'

describe('case-studies data', () => {
  it('a des slugs uniques', () => {
    const slugs = caseStudies.map((c) => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("n'expose aucune étude confidentielle dans la liste publique", () => {
    expect(publicCaseStudies.every((c) => !c.confidential)).toBe(true)
  })

  it('retourne undefined pour un slug inconnu', () => {
    expect(caseStudyBySlug('slug-inexistant')).toBeUndefined()
  })

  it('retrouve chaque étude publique par son slug', () => {
    for (const c of publicCaseStudies) {
      expect(caseStudyBySlug(c.slug)?.slug).toBe(c.slug)
    }
  })
})

describe('projects data', () => {
  it('a des slugs uniques', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('chaque projet a un titre, un type et une description', () => {
    for (const p of projects) {
      expect(p.title.length).toBeGreaterThan(0)
      expect(p.type.length).toBeGreaterThan(0)
      expect(p.description.length).toBeGreaterThan(0)
    }
  })
})
