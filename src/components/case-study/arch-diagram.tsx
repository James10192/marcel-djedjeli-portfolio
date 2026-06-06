import { useMemo } from 'react'
import type { DiagramEdge, DiagramNode } from '@/data/case-studies'

/**
 * Diagramme d'architecture rendu en SVG maison (pas une image) à partir des
 * nœuds/arêtes de l'étude de cas. Mise en page déterministe par colonnes selon
 * le type de nœud : client → server/job → db/service/external. Sur la charte
 * dark + accent lime, responsive (scale via viewBox).
 */

const KIND_ORDER: Record<DiagramNode['kind'], number> = {
  client: 0,
  job: 1,
  server: 1,
  service: 2,
  db: 3,
  external: 3,
}

const KIND_LABEL: Record<DiagramNode['kind'], string> = {
  client: 'Client',
  server: 'Serveur',
  db: 'Données',
  service: 'Service',
  external: 'Externe',
  job: 'Tâche',
}

const COL_W = 230
const ROW_H = 92
const BOX_W = 188
const BOX_H = 62
const PAD_X = 28
const PAD_Y = 28

type Placed = DiagramNode & { col: number; row: number; x: number; y: number }

export function ArchDiagram({
  nodes,
  edges,
}: {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}) {
  const { placed, byId, width, height, cols } = useMemo(() => {
    // Regroupe par colonne (ordre fixé par type), empile par ligne dans la colonne.
    const colMap = new Map<number, DiagramNode[]>()
    for (const n of nodes) {
      const c = KIND_ORDER[n.kind]
      const arr = colMap.get(c) ?? []
      arr.push(n)
      colMap.set(c, arr)
    }
    const sortedCols = [...colMap.keys()].sort((a, b) => a - b)
    const colIndex = new Map(sortedCols.map((c, i) => [c, i]))
    const maxRows = Math.max(...sortedCols.map((c) => colMap.get(c)!.length), 1)

    const placedArr: Placed[] = []
    for (const c of sortedCols) {
      const arr = colMap.get(c)!
      const ci = colIndex.get(c)!
      const offset = (maxRows - arr.length) / 2 // centre verticalement la colonne
      arr.forEach((n, r) => {
        placedArr.push({
          ...n,
          col: ci,
          row: r,
          x: PAD_X + ci * COL_W,
          y: PAD_Y + (r + offset) * ROW_H,
        })
      })
    }
    const idMap = new Map(placedArr.map((p) => [p.id, p]))
    const w = PAD_X * 2 + sortedCols.length * COL_W - (COL_W - BOX_W)
    const h = PAD_Y * 2 + maxRows * ROW_H - (ROW_H - BOX_H)
    return { placed: placedArr, byId: idMap, width: w, height: h, cols: sortedCols.length }
  }, [nodes])

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full min-w-[560px]"
        role="img"
        aria-label="Diagramme d'architecture"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#3a3a34" />
          </marker>
        </defs>

        {/* Arêtes */}
        {edges.map((e, i) => {
          const a = byId.get(e.from)
          const b = byId.get(e.to)
          if (!a || !b) return null
          const x1 = a.x + BOX_W
          const y1 = a.y + BOX_H / 2
          const x2 = b.x
          const y2 = b.y + BOX_H / 2
          const sameCol = a.col === b.col
          // Courbe de Bézier horizontale ; léger arc si même colonne (rare).
          const mx = (x1 + x2) / 2
          const d = sameCol
            ? `M${a.x + BOX_W / 2},${a.y + BOX_H} C${a.x + BOX_W / 2 + 60},${y1 + 30} ${b.x + BOX_W / 2 + 60},${y2 - 30} ${b.x + BOX_W / 2},${b.y}`
            : `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
          return (
            <g key={i}>
              <path
                d={d}
                fill="none"
                stroke="#3a3a34"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              {e.label ? (
                <text
                  x={sameCol ? a.x + BOX_W / 2 + 64 : mx}
                  y={(y1 + y2) / 2 - 5}
                  textAnchor="middle"
                  className="fill-muted"
                  style={{ fontSize: 9, fontFamily: 'DM Mono, monospace' }}
                >
                  {e.label}
                </text>
              ) : null}
            </g>
          )
        })}

        {/* Nœuds */}
        {placed.map((n) => {
          const accent = n.kind === 'db' || n.kind === 'external'
          return (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={BOX_W}
                height={BOX_H}
                rx={2}
                fill="#111110"
                stroke={accent ? '#d4f03c' : '#2a2a26'}
                strokeWidth={accent ? 1.25 : 1}
              />
              <text
                x={n.x + 12}
                y={n.y + 18}
                className="fill-accent"
                style={{ fontSize: 8, fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em' }}
              >
                {KIND_LABEL[n.kind].toUpperCase()}
              </text>
              <text
                x={n.x + 12}
                y={n.y + 38}
                className="fill-paper"
                style={{ fontSize: 11, fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
              >
                {truncate(n.label, 26)}
              </text>
            </g>
          )
        })}
      </svg>
      {cols > 0 ? null : null}
    </div>
  )
}

function truncate(s: string, n: number): string {
  return s.length <= n ? s : `${s.slice(0, n - 1)}…`
}
