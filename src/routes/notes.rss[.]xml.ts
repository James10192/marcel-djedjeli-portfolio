import { createFileRoute } from '@tanstack/react-router'
import { renderRss } from '@/lib/rss'

export const Route = createFileRoute('/notes/rss.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(renderRss(), {
          headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          },
        }),
    },
  },
})
