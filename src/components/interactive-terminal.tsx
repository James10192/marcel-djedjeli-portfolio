/**
 * InteractiveTerminal · un vrai mini terminal, sans aucune dépendance.
 *
 * OÙ L'INTÉGRER (non branché volontairement, pour ne pas entrer en conflit
 * avec le travail en cours sur les sections) :
 *
 *   1. Section About (`src/components/sections/about.tsx`) : remplacer ou
 *      compléter la colonne droite qui affiche le faux `profile.ts`. Le
 *      terminal reprend exactement la même grammaire visuelle (DM Mono,
 *      bordure `border-line`, fond `bg-ink2`) et occupe la même largeur.
 *
 *        import { InteractiveTerminal } from '@/components/interactive-terminal'
 *        ...
 *        <Reveal delay={0.1}>
 *          <InteractiveTerminal />
 *        </Reveal>
 *
 *   2. Section Contact : en variante compacte, sous les canaux de contact.
 *
 *        <InteractiveTerminal rows={10} label="contact.sh" />
 *
 * Contraintes respectées : aucune dépendance ajoutée, rendu serveur complet
 * (le message d'accueil est dans le HTML SSR), autofocus uniquement au clic
 * dans le terminal (jamais au chargement, pour ne pas voler le scroll),
 * navigation clavier complète, animation du curseur neutralisée par
 * `prefers-reduced-motion`.
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { personal } from '@/data/personal'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { episodeLabel, notes } from '@/data/notes'
import { cn } from '@/lib/utils'

type LineKind = 'prompt' | 'text' | 'accent' | 'muted' | 'warn'

type Line = {
  kind: LineKind
  text: string
  /** Rend la ligne cliquable (lien externe, mailto, tel...). */
  href?: string
}

type Command = {
  name: string
  hint: string
  run: () => Line[]
}

const PROMPT = 'marcel@abidjan:~$'

/** Message d'accueil : présent dans le HTML rendu côté serveur. */
const WELCOME: Line[] = [
  { kind: 'accent', text: 'African Digit Consulting · terminal portfolio v1.0' },
  { kind: 'text', text: `Session ouverte pour ${personal.shortName}, depuis Abidjan.` },
  { kind: 'muted', text: "Tapez help puis Entrée pour voir ce que cette machine sait faire." },
]

function openExternal(url: string) {
  if (typeof window === 'undefined') return
  window.open(url, '_blank', 'noopener,noreferrer')
}

function downloadFile(url: string, filename: string) {
  if (typeof document === 'undefined') return
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/** Distance d'édition bornée, pour suggérer la commande la plus proche. */
function editDistance(a: string, b: string): number {
  const m = a.length
  const n = b.length
  let prev = Array.from({ length: n + 1 }, (_, j) => j)
  for (let i = 1; i <= m; i++) {
    const curr = [i]
    for (let j = 1; j <= n; j++) {
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    prev = curr
  }
  return prev[n]
}

export type InteractiveTerminalProps = {
  /** Nombre de lignes visibles avant défilement interne. */
  rows?: number
  /** Nom affiché dans la barre de titre. */
  label?: string
  className?: string
}

export function InteractiveTerminal({
  rows = 14,
  label = 'marcel@abidjan',
  className,
}: InteractiveTerminalProps) {
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  // -1 = saisie en cours, 0 = commande la plus récente.
  const [historyIndex, setHistoryIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)
  const inputId = useId()

  const commands: Command[] = [
    {
      name: 'help',
      hint: 'liste les commandes disponibles',
      run: () => [
        { kind: 'accent', text: 'Commandes disponibles' },
        ...COMMAND_INDEX.map(
          (c): Line => ({ kind: 'text', text: `  ${c.name.padEnd(10)} ${c.hint}` }),
        ),
        { kind: 'muted', text: 'Flèches haut et bas pour retrouver vos commandes précédentes.' },
      ],
    },
    {
      name: 'whoami',
      hint: 'qui parle, et depuis où',
      run: () => [
        { kind: 'accent', text: personal.name },
        { kind: 'text', text: personal.currentRole },
        { kind: 'text', text: personal.location },
        { kind: 'muted', text: personal.tagline },
        { kind: 'text', text: `Disponibilité : ${personal.availability}` },
      ],
    },
    {
      name: 'projects',
      hint: 'les projets livrés et leur statut',
      run: () => [
        { kind: 'accent', text: `${projects.length} projets référencés` },
        ...projects.map(
          (p): Line => ({
            kind: 'text',
            text: `  ${p.title.padEnd(18)} ${p.year.padEnd(16)} ${p.type}`,
          }),
        ),
        { kind: 'muted', text: 'Les études de cas détaillées sont sur /projets.' },
      ],
    },
    {
      name: 'stack',
      hint: 'les outils du quotidien',
      run: () => [
        { kind: 'accent', text: 'Stack technique' },
        ...skillGroups.map(
          (g): Line => ({ kind: 'text', text: `  ${g.title.padEnd(20)} ${g.tags.join(', ')}` }),
        ),
        { kind: 'muted', text: `Au quotidien : ${personal.techHighlights.slice(0, 6).join(' · ')}` },
      ],
    },
    {
      name: 'notes',
      hint: 'la série African Builder Notes',
      run: () => [
        { kind: 'accent', text: 'African Builder Notes' },
        ...notes.map(
          (n): Line => ({
            kind: n.status === 'publie' ? 'text' : 'muted',
            text: `  ${episodeLabel(n.episode)}  ${n.status === 'publie' ? '[publié] ' : '[à venir]'} ${n.title}`,
          }),
        ),
        { kind: 'muted', text: 'Lecture complète sur /notes.' },
      ],
    },
    {
      name: 'cv',
      hint: 'télécharge le CV au format PDF',
      run: () => {
        downloadFile(personal.cvPdf, 'cv-djedje-li-marcel.pdf')
        return [
          { kind: 'accent', text: 'Téléchargement du CV lancé.' },
          { kind: 'muted', text: `Si rien ne se passe, ouvrez ${personal.cvPdf} directement.` },
          { kind: 'text', text: 'Ouvrir le CV', href: personal.cvPdf },
        ]
      },
    },
    {
      name: 'contact',
      hint: 'tous les canaux pour me joindre',
      run: () => [
        { kind: 'accent', text: 'Canaux de contact' },
        { kind: 'text', text: `  e-mail    ${personal.email}`, href: `mailto:${personal.email}` },
        { kind: 'text', text: `  téléphone ${personal.phone}`, href: `tel:${personal.phoneIntl}` },
        {
          kind: 'text',
          text: `  whatsapp  ${personal.whatsapp}`,
          href: `https://wa.me/${personal.whatsappIntl}`,
        },
        { kind: 'text', text: `  github    ${personal.github}`, href: personal.githubUrl },
        { kind: 'muted', text: 'Réponse sous 24h ouvrées, en général bien avant.' },
      ],
    },
    {
      name: 'whatsapp',
      hint: 'ouvre une conversation WhatsApp',
      run: () => {
        const url = `https://wa.me/${personal.whatsappIntl}`
        openExternal(url)
        return [
          { kind: 'accent', text: 'Ouverture de WhatsApp dans un nouvel onglet.' },
          { kind: 'text', text: `Discuter maintenant (${personal.whatsapp})`, href: url },
        ]
      },
    },
    {
      name: 'clear',
      hint: "efface l'écran",
      run: () => [],
    },
  ]

  const submit = useCallback(
    (raw: string) => {
      const input = raw.trim()
      setValue('')
      setHistoryIndex(-1)
      if (!input) {
        setLines((prev) => [...prev, { kind: 'prompt', text: '' }])
        return
      }

      setHistory((prev) => [input, ...prev])

      const name = input.split(/\s+/)[0].toLowerCase()
      const cmd = commands.find((c) => c.name === name)

      if (name === 'clear') {
        setLines([])
        return
      }

      if (!cmd) {
        const suggestion = commands
          .map((c) => ({ name: c.name, d: editDistance(name, c.name) }))
          .sort((a, b) => a.d - b.d)[0]
        const close = suggestion && suggestion.d <= 3 ? suggestion.name : null
        setLines((prev) => [
          ...prev,
          { kind: 'prompt', text: input },
          {
            kind: 'warn',
            text: close
              ? `« ${name} » n'existe pas ici. Vous vouliez sans doute ${close} ?`
              : `« ${name} » n'existe pas ici.`,
          },
          {
            kind: 'muted',
            text: `Commandes reconnues : ${commands.map((c) => c.name).join(', ')}.`,
          },
        ])
        return
      }

      const output = cmd.run()
      setLines((prev) => [...prev, { kind: 'prompt', text: input }, ...output])
    },
    // `commands` est reconstruit à chaque rendu mais son comportement est stable
    // (il ne dépend que de données statiques importées).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Défilement interne vers le bas à chaque nouvelle sortie. Jamais au premier
  // rendu : la page ne doit pas bouger au chargement.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const next = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(next)
      setValue(history[next])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex <= 0) {
        setHistoryIndex(-1)
        setValue('')
        return
      }
      const next = historyIndex - 1
      setHistoryIndex(next)
      setValue(history[next])
    }
  }

  // Focus uniquement sur interaction volontaire : jamais au chargement (cela
  // volerait le scroll), jamais pendant une sélection de texte, et jamais quand
  // l'utilisateur vient de cliquer un lien ou un bouton de la sortie.
  function focusInput(e: React.MouseEvent) {
    if (e.target instanceof Element && e.target.closest('a, button')) return
    if (typeof window !== 'undefined') {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0) return
    }
    inputRef.current?.focus()
  }

  return (
    <section
      aria-label="Terminal interactif du portfolio"
      onClick={focusInput}
      className={cn('overflow-hidden rounded-[14px] border border-line bg-ink2', className)}
    >
      <style dangerouslySetInnerHTML={{ __html: CURSOR_CSS }} />

      {/* Barre de titre */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        </span>
        <span className="ml-2 font-mono text-[11px] text-muted">{label}</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-muted/70">
          interactif
        </span>
      </div>

      {/* Sortie */}
      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Sortie du terminal"
        className="overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]"
        style={{ maxHeight: `${rows * 1.75}em` }}
      >
        {lines.length === 0 ? (
          <p className="text-muted/70">Écran effacé. Tapez help pour recommencer.</p>
        ) : null}

        {lines.map((line, i) =>
          line.kind === 'prompt' ? (
            <p key={i} className="break-words">
              <span className="text-accent">{PROMPT}</span>{' '}
              <span className="text-paper">{line.text}</span>
            </p>
          ) : line.href ? (
            <p key={i} className="break-words">
              <a
                href={line.href}
                target={line.href.startsWith('http') ? '_blank' : undefined}
                rel={line.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="whitespace-pre-wrap text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid"
              >
                {line.text}
              </a>
            </p>
          ) : (
            <p
              key={i}
              className={cn(
                'whitespace-pre-wrap break-words',
                line.kind === 'accent' && 'text-accent',
                line.kind === 'muted' && 'text-muted',
                line.kind === 'warn' && 'text-paper',
                line.kind === 'text' && 'text-paper/90',
              )}
            >
              {line.text}
            </p>
          ),
        )}
      </div>

      {/* Saisie */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
        }}
        className="flex min-h-[44px] items-center gap-2 border-t border-line px-4 py-2.5 font-mono text-[12.5px] sm:text-[13px]"
      >
        <label htmlFor={inputId} className="shrink-0 text-accent">
          {PROMPT}
        </label>
        <span className="terminal-field relative flex min-w-0 flex-1 items-center overflow-hidden">
          {/* Champ réel : invisible mais pleinement focusable, sélectionnable
              et compatible clavier mobile. Le rendu visible est juste dessous. */}
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-describedby={`${inputId}-hint`}
            /* 16px obligatoire : sous ce seuil, iOS Safari zoome sur la page à
               la prise de focus. Le champ étant transparent (le texte visible
               est le span voisin), cette taille ne change rien à l'affichage. */
            style={{ fontSize: '16px' }}
            className="terminal-input absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
          />
          <span
            className="terminal-display pointer-events-none flex min-w-0 items-center whitespace-pre text-paper"
            aria-hidden
          >
            {value}
            <i className="terminal-caret" />
            {value === '' ? (
              <span className="ml-2 text-muted/50">tapez help puis Entrée</span>
            ) : null}
          </span>
        </span>
        <button
          type="submit"
          className="ml-2 hidden h-9 shrink-0 items-center border border-line px-3 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent sm:inline-flex"
        >
          Entrée
        </button>
      </form>

      <p id={`${inputId}-hint`} className="sr-only">
        Tapez une commande puis validez avec la touche Entrée. Les flèches haut et bas
        parcourent l'historique. Tapez help pour la liste des commandes.
      </p>
    </section>
  )
}

/** Index statique utilisé par `help` : garde la liste lisible et testable. */
const COMMAND_INDEX: Array<{ name: string; hint: string }> = [
  { name: 'help', hint: 'liste les commandes disponibles' },
  { name: 'whoami', hint: 'qui parle, et depuis où' },
  { name: 'projects', hint: 'les projets livrés et leur statut' },
  { name: 'stack', hint: 'les outils du quotidien' },
  { name: 'notes', hint: 'la série African Builder Notes' },
  { name: 'cv', hint: 'télécharge le CV au format PDF' },
  { name: 'contact', hint: 'tous les canaux pour me joindre' },
  { name: 'whatsapp', hint: 'ouvre une conversation WhatsApp' },
  { name: 'clear', hint: "efface l'écran" },
]

/* Curseur bloc clignotant. Injecté localement pour ne pas toucher au CSS
   global partagé. La règle prefers-reduced-motion coupe le clignotement. */
const CURSOR_CSS = `
.terminal-field .terminal-caret {
  display: inline-block;
  width: 8px;
  height: 1.05em;
  margin-left: 1px;
  vertical-align: -2px;
  background: var(--color-accent);
  opacity: 0.35;
}
.terminal-field .terminal-input:focus ~ .terminal-display .terminal-caret {
  opacity: 1;
  animation: terminal-blink 1.1s steps(1, end) infinite;
}
@keyframes terminal-blink {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .terminal-field .terminal-input:focus ~ .terminal-display .terminal-caret {
    animation: none;
    opacity: 1;
  }
}
`
