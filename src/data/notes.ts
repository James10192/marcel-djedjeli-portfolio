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

/**
 * Profil LinkedIn de Marcel. Laissé vide tant que l'URL exacte n'est pas
 * confirmée : le CTA LinkedIn n'est alors simplement pas rendu, plutôt que de
 * livrer un lien mort en production. Renseigner l'URL suffit à l'activer.
 */
export const LINKEDIN_URL = 'https://www.linkedin.com/in/marcel-djedje-li-099490235/'

export const notes: Note[] = [
  {
    slug: 'former-des-batisseurs',
    episode: 1,
    status: 'publie',
    date: '2026-07-14',
    title: 'On forme des développeurs. Mais forme-t-on des bâtisseurs ?',
    thesis:
      "Le talent technique est nécessaire, mais l'écosystème ne progresse vraiment que le jour où une compétence devient un produit, un revenu, une équipe et un actif durable.",
    audience:
      "Développeurs, formateurs et fondateurs d'Afrique francophone qui veulent dépasser le stade de la mission facturée.",
    chapo:
      "Nous n'avons jamais eu autant de talents techniques à Abidjan, Dakar, Lomé ou Douala. Et pourtant l'écosystème produit encore peu de produits, peu de revenus récurrents, peu d'actifs. Je ne crois pas que le problème soit la compétence.",
    sections: [
      {
        heading: "Ce qu'on apprend, et ce qu'on n'apprend pas",
        paragraphs: [
          "En trois ans, j'ai vu passer beaucoup de jeunes développeurs. Le niveau technique monte, et il monte vite. React, Laravel, Python, les modèles d'IA, Docker, le déploiement : tout cela s'apprend, et cela s'apprend bien. Les chaînes YouTube, la documentation, les bootcamps et les communautés locales font un travail remarquable, il faut le dire clairement.",
          "Ce qu'on n'apprend nulle part, c'est le reste. Choisir un problème qui vaut la peine d'être résolu. Aller parler à dix personnes qui vivent ce problème tous les jours. Fixer un prix, et le tenir. Facturer. Gérer un client mécontent un vendredi soir. Recruter quelqu'un de meilleur que soi sur un sujet précis. Maintenir un produit en production pendant deux ans sans y laisser sa santé.",
          "On sort de formation avec un certificat et un portfolio. On ne sort pas avec un client.",
        ],
      },
      {
        heading: 'Le plafond invisible',
        paragraphs: [
          "Le schéma que je croise le plus souvent est toujours le même : on apprend, on décroche une certification, on trouve une mission, on construit le produit d'un autre. C'est honorable, c'est formateur, et cela paie les factures. Mais l'horizon s'arrête là.",
          "Individuellement, ça marche. Collectivement, ça bloque. Parce qu'à la fin de l'année, l'écosystème a produit beaucoup d'heures facturées et très peu d'actifs. Un actif, c'est un produit qui continue de générer de la valeur pendant que tu dors. Une base de clients. Une marque que quelqu'un cite sans que tu sois dans la pièce. Un savoir-faire industrialisé. Une équipe qui sait livrer sans toi.",
          "Le jour où un développeur talentueux change de pays ou de secteur, il emporte tout avec lui, parce que rien n'a été capitalisé. On recommence à zéro, et on appelle ça un problème de fuite des cerveaux. C'est d'abord un problème d'accumulation.",
        ],
      },
      {
        heading: 'La chaîne : compétence, revenu, équipe, produit',
        paragraphs: [
          "Je crois à une chaîne très simple, et je crois qu'elle se casse presque toujours au même maillon.",
          "Une compétence devient un revenu. Ce revenu finance une équipe, même minuscule : deux personnes suffisent au début. Cette équipe construit un produit utile à un marché réel. Ce produit génère un revenu récurrent, qui finance à son tour la maintenance, la recherche, l'infrastructure et les salaires du mois prochain.",
          "Chez nous, la chaîne casse entre le premier et le deuxième maillon. Le revenu existe, mais il reste strictement individuel. Il ne finance jamais rien d'autre que la vie de celui qui l'a gagné. Résultat : pas d'équipe, donc pas de produit, donc pas de récurrence, donc retour à la case mission, année après année.",
          "La souveraineté numérique dont tout le monde parle commence exactement là. Pas dans un discours, pas dans un centre de données inauguré avec des ciseaux dorés. Dans le moment très concret où une compétence locale devient un revenu, et où ce revenu finance une équipe locale qui construit un produit dont un marché local a réellement besoin.",
        ],
      },
      {
        heading: "Ce que ça change dans la façon d'apprendre",
        paragraphs: [
          "Si on prend cette chaîne au sérieux, la formation change de forme. On n'apprend plus React pour savoir React. On apprend React pour livrer quelque chose à quelqu'un qui l'attend. La première ligne de code n'arrive pas au premier cours, elle arrive après la première conversation avec un utilisateur.",
          "Concrètement, cela veut dire poser trois questions avant d'ouvrir l'éditeur :",
        ],
        bullets: [
          "Qui a ce problème, et combien lui coûte-t-il aujourd'hui, en argent ou en heures ?",
          "Combien serait-il prêt à payer pour ne plus l'avoir, et à qui paie-t-il déjà pour cela ?",
          "Qu'est-ce qui fera qu'il ouvrira encore mon outil le mois prochain ?",
        ],
      },
      {
        heading: 'Ce que je ne dis pas',
        paragraphs: [
          "Je ne dis pas que tout le monde doit créer une entreprise. Beaucoup d'excellents développeurs n'ont aucune envie d'être entrepreneurs, et ils ont raison : c'est un autre métier, avec ses propres épreuves et ses propres nuits blanches.",
          "Je dis qu'il manque, dans nos parcours, une étape entre « je sais coder » et « je construis quelque chose qui dure ». Cette étape peut se vivre en salarié, dans une structure qui construit son propre produit. Elle peut se vivre à trois, entre amis, le soir. Elle peut se vivre dans une agence qui décide de garder un produit à elle en plus des missions clients. Ce qui compte, c'est de passer de l'exécution à la construction.",
        ],
      },
      {
        heading: 'Ce que je fais de mon côté',
        paragraphs: [
          "Chez African Digit Consulting, on a fait ce pari il y a trois ans. Un produit à nous, vendu à des écoles, maintenu par nous, avec les vraies contraintes : les rôles et les permissions, les migrations de données saisies avant nous, le support un vendredi soir, les exports que l'administration réclame dans un format précis.",
          "Aujourd'hui, plus de 7 600 étudiants et 5 établissements en dépendent. Ce chiffre ne m'impressionne pas pour la vitrine, il m'impressionne pour ce qu'il a coûté à apprendre : ce que pèse réellement un logiciel dont d'autres dépendent. Aucune formation ne me l'aurait appris.",
          "C'est inconfortable. C'est aussi la seule chose que je referais sans hésiter.",
        ],
      },
    ],
    debate:
      "Selon toi, quel est le principal frein : la compétence, le capital, l'accès au marché ou la culture produit ?",
  },
  {
    slug: 'le-code-n-est-pas-le-produit',
    episode: 2,
    status: 'publie',
    date: '2026-07-28',
    title: "Le code n'est pas le produit.",
    thesis:
      "Le code n'est qu'un composant : le produit, c'est le problème résolu, l'expérience, la distribution, le support, la confiance et le modèle économique réunis.",
    audience:
      "Développeurs qui passent du projet personnel au logiciel dont d'autres dépendent, et équipes produit qui recrutent.",
    chapo:
      "Un dépôt propre, une architecture élégante et une couverture de tests correcte ne font pas un produit. Ils font un composant du produit. Le reste décide si quelqu'un paie, revient, et recommande.",
    sections: [
      {
        heading: 'Deux regards sur le même écran',
        paragraphs: [
          "Quand je regarde une application, je vois des écrans, des endpoints, un schéma de base, des temps de réponse, une file de tâches. C'est mon métier, c'est normal.",
          "L'utilisateur, lui, regarde une seule chose : est-ce que ça résout mon problème sans me compliquer la vie ?",
          "Ces deux regards ne se croisent presque jamais spontanément. La secrétaire d'une école ne dira jamais « votre requête N+1 me gêne ». Elle dira « ça rame le matin quand tout le monde s'inscrit », ce qui est exactement la même information, formulée dans la seule langue qui compte vraiment.",
        ],
      },
      {
        heading: "Ce qu'il y a autour du code",
        paragraphs: [
          "Un produit, c'est le code, plus tout ce qu'on oublie systématiquement de compter :",
        ],
        bullets: [
          "l'accueil du nouvel utilisateur, ces cinq premières minutes où il décide s'il reste",
          "le paiement, et chez nous cela veut dire mobile money, espèces enregistrées à la caisse, virements, pas seulement une carte bancaire",
          "le support, qui répond en français, sur WhatsApp, à 19h, parce que c'est là que la question arrive",
          "les permissions, parce que le comptable ne doit pas voir ce que voit le directeur",
          "les données : leur reprise, leur export, leur sauvegarde, leur restitution le jour où le client part",
          "la distribution, c'est-à-dire la réponse honnête à « comment le prochain client entend parler de nous »",
          "la confiance, qui se construit en mois et se perd en un après-midi",
          "le modèle économique, qui doit encore tenir dans deux ans",
        ],
      },
      {
        heading: 'La démo et la plateforme',
        paragraphs: [
          "J'aime les hackathons, j'y ai beaucoup appris. Mais il faut être honnête sur ce qu'une démo prouve.",
          "Une démo a un utilisateur : celui qui présente. Un jeu de données choisi. Un chemin heureux répété vingt fois. Zéro migration, parce qu'il n'y a pas d'historique. Zéro permission, parce qu'il n'y a qu'un rôle. Zéro support, parce que personne n'en dépend demain matin.",
          "Une plateforme en production a des rôles multiples dont les droits se contredisent, des données saisies il y a deux ans qu'il faut reprendre sans perdre une ligne, des paiements à réconcilier, des exports réclamés par une administration au format qu'elle a décidé, un monitoring qui doit réveiller quelqu'un, et des utilisateurs qui ont déjà réorganisé leur travail autour de ton logiciel.",
          "Entre les deux, il n'y a pas une différence de finition. Il y a une différence de nature. Passer de la première à la seconde représente l'essentiel du travail, et c'est précisément la partie que personne ne filme.",
        ],
      },
      {
        heading: "Trois questions avant d'ajouter une fonctionnalité",
        paragraphs: [
          "Je me suis imposé une discipline simple, parce que j'ai perdu assez de semaines pour la mériter. Avant d'ajouter une fonctionnalité, je réponds à trois questions par écrit.",
          "Quel comportement doit changer ? Pas « quelle fonctionnalité manque », mais qu'est-ce qu'un utilisateur fera différemment lundi prochain.",
          "Comment je le mesure ? Un chiffre, une seule ligne dans un tableau de bord, quelque chose qu'on peut regarder dans un mois et qui répondra oui ou non, sans débat.",
          "Pourquoi reviendra-t-il demain ? Si la réponse honnête est « parce qu'il n'a pas le choix », le produit est fragile, même si le code est irréprochable.",
          "Quand je n'arrive pas à répondre aux trois, je ne code pas. Cette règle m'a évité plus de dette technique que n'importe quel refactoring.",
        ],
      },
      {
        heading: 'Le code reste essentiel, mais il ne juge pas',
        paragraphs: [
          "Rien de ce que j'écris ici ne dévalorise le code. Un produit posé sur du code fragile finit par mourir de ses incidents, et j'ai vu ça de près. La qualité technique est exactement ce qui permet à un produit de survivre à sa propre croissance : c'est elle qui fait qu'on peut encore livrer une fonctionnalité en deux jours la troisième année.",
          "Mais le code n'est pas le juge. Le juge, c'est l'utilisateur qui revient. Notre métier consiste à écrire du code assez solide pour que ce retour reste possible pendant des années.",
        ],
      },
    ],
    debate:
      'Ton projet actuel est-il un dépôt de code, une démo, un produit ou déjà une entreprise ?',
  },
  {
    slug: 'la-souverainete-se-finance',
    episode: 3,
    status: 'a-venir',
    title: 'La souveraineté numérique se finance.',
    thesis:
      "L'autonomie numérique suppose des entreprises rentables, capables de financer des équipes, la recherche, la maintenance et les infrastructures dans la durée.",
    audience:
      "Fondateurs, décideurs publics et investisseurs qui parlent de souveraineté sans parler de modèle économique.",
  },
  {
    slug: '7600-etudiants-en-production',
    episode: 9,
    status: 'a-venir',
    title: "Ce que 7 600 étudiants m'ont appris sur le logiciel en production.",
    thesis:
      "À l'échelle réelle, les permissions, la donnée, les exports, le support, la migration et la fiabilité comptent bien plus que la démonstration spectaculaire.",
    audience:
      'Développeurs qui livrent leur premier logiciel utilisé quotidiennement par des centaines de personnes.',
  },
]

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

/** Numéro d'épisode formaté sur deux chiffres : 1 devient « 01 ». */
export function episodeLabel(episode: number): string {
  return String(episode).padStart(2, '0')
}

/** Temps de lecture estimé, base 200 mots par minute, minimum 1 minute. */
export function readingMinutes(note: PublishedNote): number {
  const words = [
    note.chapo,
    ...note.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
    note.debate,
  ]
    .join(' ')
    .trim()
    .split(/\s+/).length

  return Math.max(1, Math.round(words / 200))
}

const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
]

/**
 * Formate une date ISO en français sans dépendre de Intl : le rendu serveur et
 * le rendu client produisent ainsi exactement la même chaîne (pas de mismatch
 * d'hydratation lié à la locale de la machine).
 */
export function formatNoteDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}
