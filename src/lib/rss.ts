import { publishedNotes, type PublishedNote } from '@/data/notes'
import { absoluteUrl } from '@/lib/site'
import { xmlEscape } from '@/lib/xml'

const FEED_TITLE = 'African Builder Notes · Marcel DJEDJE-LI'
const FEED_DESCRIPTION =
  "Une thèse par épisode, tirée de ce qui casse et de ce qui tient en production, écrite depuis Abidjan."

/** RFC 822, exigé par RSS 2.0. Les notes sont datées au jour : midi UTC. */
function rfc822(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00Z`).toUTCString()
}

/** Flux RSS 2.0 des notes publiées, la plus récente en premier. */
export function renderRss(notes: PublishedNote[] = publishedNotes): string {
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date))
  const items = sorted
    .map((n) => {
      const url = absoluteUrl(`/notes/${n.slug}`)
      return [
        '    <item>',
        `      <title>${xmlEscape(n.title)}</title>`,
        `      <link>${xmlEscape(url)}</link>`,
        `      <guid isPermaLink="true">${xmlEscape(url)}</guid>`,
        `      <pubDate>${rfc822(n.date)}</pubDate>`,
        `      <description>${xmlEscape(n.chapo)}</description>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')
  const lastBuild = sorted[0] ? `\n    <lastBuildDate>${rfc822(sorted[0].date)}</lastBuildDate>` : ''
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(FEED_TITLE)}</title>
    <link>${absoluteUrl('/notes')}</link>
    <description>${xmlEscape(FEED_DESCRIPTION)}</description>
    <language>fr</language>
    <atom:link href="${absoluteUrl('/notes/rss.xml')}" rel="self" type="application/rss+xml" />${lastBuild}
${items}
  </channel>
</rss>
`
}
