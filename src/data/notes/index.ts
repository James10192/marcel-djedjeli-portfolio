import type { Note, PublishedNote, UpcomingNote } from './types'
import { formerDesBatisseurs } from './episodes/01-former-des-batisseurs'
import { leCodeNestPasLeProduit } from './episodes/02-le-code-n-est-pas-le-produit'
import { laSouveraineteSeFinance } from './episodes/03-la-souverainete-se-finance'
import { upcomingNotes } from './upcoming'

export * from './types'
export { episodeLabel, readingMinutes, formatNoteDate } from './format'

/** Profil LinkedIn de Marcel, cible du CTA « répondre » en fin de note. */
export const LINKEDIN_URL = 'https://www.linkedin.com/in/marcel-djedje-li-099490235/'

/** La série complète, dans l'ordre des épisodes. */
export const notes: Note[] = [
  formerDesBatisseurs,
  leCodeNestPasLeProduit,
  laSouveraineteSeFinance,
  ...upcomingNotes,
].sort(
  (a, b) => a.episode - b.episode,
)

export const publishedNotes: PublishedNote[] = notes.filter(
  (n): n is PublishedNote => n.status === 'publie',
)

export function noteBySlug(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug)
}

/** Ne retourne la note que si son corps est écrit (statut « publié »). */
export function publishedNoteBySlug(slug: string): PublishedNote | undefined {
  return publishedNotes.find((n) => n.slug === slug)
}

/** Note publiée suivante dans l'ordre de la série, pour la navigation de fin de lecture. */
export function nextPublishedNote(slug: string): PublishedNote | undefined {
  const i = publishedNotes.findIndex((n) => n.slug === slug)
  if (i < 0) return undefined
  return publishedNotes[i + 1]
}

/**
 * Le prochain épisode annoncé. Seul lui est montré au lecteur : une liste de
 * huit titres « à venir » face à deux notes parues se lit comme un abandon.
 */
export const nextUpcomingNote: UpcomingNote | undefined = notes.find(
  (n): n is UpcomingNote => n.status === 'a-venir',
)

/** Ce que les index affichent : les notes parues, puis le prochain épisode. */
export const shelfNotes: Note[] = nextUpcomingNote
  ? [...publishedNotes, nextUpcomingNote]
  : [...publishedNotes]
