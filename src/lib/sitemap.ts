import { publicCaseStudies } from '@/data/case-studies'
import { publishedNotes } from '@/data/notes'
import { absoluteUrl } from '@/lib/site'
import { xmlEscape } from '@/lib/xml'

type SitemapEntry = { path: string; lastmod?: string; priority: number }

/**
 * Toutes les pages indexables, dérivées des données : une note publiée ou une
 * étude de cas rendue publique apparaît dans le sitemap sans rien toucher ici.
 */
export function sitemapEntries(): SitemapEntry[] {
  const latestNote = publishedNotes.map((n) => n.date).sort().at(-1)
  return [
    { path: '/', priority: 1 },
    { path: '/projets', priority: 0.8 },
    ...publicCaseStudies.map((c) => ({ path: `/projets/${c.slug}`, priority: 0.7 })),
    { path: '/notes', lastmod: latestNote, priority: 0.8 },
    ...publishedNotes.map((n) => ({ path: `/notes/${n.slug}`, lastmod: n.date, priority: 0.7 })),
    { path: '/methode', priority: 0.6 },
    { path: '/cv', priority: 0.6 },
  ]
}

export function renderSitemap(entries: SitemapEntry[] = sitemapEntries()): string {
  const urls = entries
    .map((e) =>
      [
        '  <url>',
        `    <loc>${xmlEscape(absoluteUrl(e.path))}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        `    <priority>${e.priority.toFixed(1)}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function renderRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
}
