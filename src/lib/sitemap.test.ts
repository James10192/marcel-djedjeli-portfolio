import { describe, it, expect } from 'vitest'
import { renderRobots, renderSitemap, sitemapEntries } from './sitemap'
import { publicCaseStudies } from '@/data/case-studies'
import { publishedNotes } from '@/data/notes'
import { SITE_URL } from './site'

describe('sitemap', () => {
  it('liste chaque note publiée et chaque étude de cas publique', () => {
    const xml = renderSitemap()
    for (const n of publishedNotes) expect(xml).toContain(`<loc>${SITE_URL}/notes/${n.slug}</loc>`)
    for (const c of publicCaseStudies) expect(xml).toContain(`<loc>${SITE_URL}/projets/${c.slug}</loc>`)
  })

  it('n\'a aucune URL en double', () => {
    const paths = sitemapEntries().map((e) => e.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('échappe les caractères XML des chemins', () => {
    const xml = renderSitemap([{ path: '/a?b=1&c=2', priority: 0.5 }])
    expect(xml).toContain(`<loc>${SITE_URL}/a?b=1&amp;c=2</loc>`)
  })

  it('pointe robots.txt vers le sitemap du bon domaine', () => {
    expect(renderRobots()).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
  })
})
