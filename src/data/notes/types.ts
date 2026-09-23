// African Builder Notes · la série éditoriale de Marcel DJEDJE-LI (LeVraiMD_DEV).
// Chaque note est un épisode numéroté : une thèse, une audience, un corps rédigé
// et une question de débat qui appelle une réponse publique.
//
// Les épisodes marqués « a-venir » ne portent volontairement que le titre et la
// thèse : ils sont annoncés sur l'index mais ne sont pas lisibles (la route
// /notes/$slug renvoie un notFound() propre tant que le corps n'est pas écrit).

export type NoteStatus = 'publie' | 'a-venir'

export type NoteSection = {
  heading: string
  paragraphs: string[]
  /** Liste optionnelle rendue après les paragraphes de la section. */
  bullets?: string[]
}

type NoteBase = {
  slug: string
  /** Numéro d'épisode affiché en gros sur l'index (01, 02, 03, 09...). */
  episode: number
  title: string
  /** Thèse en une phrase : sert aussi de meta description SEO. */
  thesis: string
  /** À qui la note s'adresse en priorité. */
  audience: string
}

export type PublishedNote = NoteBase & {
  status: 'publie'
  /** Date de publication au format ISO (AAAA-MM-JJ). */
  date: string
  chapo: string
  sections: NoteSection[]
  /** Question ouverte posée en fin de note, mise en encadré. */
  debate: string
}

export type UpcomingNote = NoteBase & {
  status: 'a-venir'
}

export type Note = PublishedNote | UpcomingNote
