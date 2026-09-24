import type { PublishedNote } from '../types'

export const laSouveraineteSeFinance: PublishedNote = {
  slug: 'la-souverainete-se-finance',
  episode: 3,
  status: 'publie',
  date: '2026-09-24',
  title: 'La souveraineté numérique se finance.',
  thesis:
    "L'autonomie numérique suppose des entreprises rentables, capables de financer des équipes, la recherche, la maintenance et les infrastructures dans la durée.",
  audience:
    'Fondateurs, décideurs publics et investisseurs qui parlent de souveraineté sans parler de modèle économique.',
  chapo:
    "On parle beaucoup de souveraineté numérique en Afrique francophone. On en parle dans les forums, dans les stratégies nationales, dans les discours d'inauguration. On en parle beaucoup moins dans la seule pièce où elle se décide vraiment : celle où quelqu'un signe les salaires du mois prochain.",
  sections: [
    {
      heading: 'Une question de facture, pas de drapeau',
      paragraphs: [
        "Quand une école, une mairie ou une PME confie ses données à un logiciel, elle ne choisit pas un drapeau. Elle choisit quelqu'un qui sera encore là dans trois ans pour corriger un bug, migrer une base, répondre au téléphone un lundi de rentrée.",
        "La souveraineté, vue de près, ressemble à ça : une équipe locale qui connaît le métier, qui parle la langue de l'utilisateur, et qui a les moyens de rester. Les deux premiers points, nous les avons déjà. C'est le troisième qui manque, et il ne se décrète pas. Il se finance.",
      ],
    },
    {
      heading: 'Ce que coûte vraiment un logiciel qui dure',
      paragraphs: [
        "On imagine souvent qu'un logiciel coûte surtout à la construction. En réalité, la construction est la partie la plus courte. Ce qui coûte, c'est tout ce qui vient après, pendant des années :",
      ],
      bullets: [
        'la maintenance, parce que les navigateurs, les bibliothèques et les règles métier changent sans prévenir',
        "l'hébergement, les sauvegardes et la surveillance, qui se paient chaque mois, qu'il y ait des ventes ou non",
        'le support, qui répond à des humains, à des heures humaines',
        'la sécurité, qui ne se voit que le jour où elle manque',
        "la recherche, c'est-à-dire le temps passé à préparer la version d'après au lieu d'éteindre les incendies de celle d'aujourd'hui",
      ],
    },
    {
      heading: 'Le coût invisible',
      paragraphs: [
        "Aucune de ces lignes n'apparaît dans un appel d'offres gagné une fois. Toutes apparaissent dans la vie réelle d'un produit. Un logiciel qui n'a pas de revenu récurrent pour les couvrir ne meurt pas d'un coup : il se dégrade doucement, jusqu'au jour où plus personne n'ose y toucher.",
      ],
    },
    {
      heading: 'Le piège de la mission unique',
      paragraphs: [
        "Le modèle le plus répandu chez nous reste la mission : un client, un cahier des charges, une livraison, une facture. C'est un modèle honnête, et il fait vivre beaucoup d'équipes, dont la mienne pendant longtemps.",
        "Mais il a une limite structurelle. Chaque mission se termine. L'argent qu'elle rapporte paie le travail déjà fait, pas le travail à venir. Rien ne s'accumule : ni la base de clients, ni le produit, ni le savoir-faire industrialisé. On repart de zéro au projet suivant, avec un peu plus d'expérience et pas plus de capital.",
        "Une équipe qui ne vit que de missions ne peut pas financer la maintenance d'un produit à elle. Elle ne peut pas non plus s'offrir le luxe de chercher. Elle exécute. Et un écosystème qui exécute pour les autres n'est pas souverain, même si tout le code est écrit à Abidjan.",
      ],
    },
    {
      heading: 'Le revenu récurrent comme infrastructure',
      paragraphs: [
        "Je suis arrivé à une conviction simple : chez nous, le revenu récurrent est une infrastructure au même titre que l'électricité ou la fibre. Sans lui, rien de durable ne tient.",
        "Un abonnement modeste, payé chaque mois par des centaines de clients, finance ce qu'aucune grosse mission ne financera jamais : une équipe stable, une personne dédiée au support, un budget de sécurité, du temps pour améliorer le produit plutôt que de courir après le prochain contrat.",
        "Ce revenu doit être pensé pour notre marché, pas copié d'ailleurs. Cela veut dire des prix en francs CFA, le paiement par mobile money, des paiements échelonnés quand c'est la réalité du client, une facturation qui accepte qu'une partie du marché paie encore en espèces. Un produit qui n'accepte que la carte bancaire internationale s'est exclu lui-même de la majorité de ses clients possibles.",
      ],
    },
    {
      heading: "Ce que j'ai appris en le faisant",
      paragraphs: [
        "Chez African Digit Consulting, nous avons fait le choix de garder un produit à nous. Klassci sert aujourd'hui plus de 7 600 étudiants dans 5 établissements. Ce que ce chiffre ne dit pas, c'est ce qu'il a fallu pour le maintenir : des mises à jour régulières, des migrations de données, un support qui répond pendant les périodes d'inscription, des évolutions demandées par les écoles elles-mêmes.",
        "Rien de tout cela n'aurait été possible avec une livraison unique suivie d'un au revoir. C'est la relation longue, et le revenu qui va avec, qui permet de rester. C'est aussi elle qui nous oblige à être bons : un client abonné qui n'est pas satisfait s'en va, et il le fait savoir.",
      ],
    },
    {
      heading: 'Ce que je propose',
      paragraphs: [
        "Je ne crois pas qu'il faille attendre un grand plan national pour avancer. Voici ce qui me paraît faisable dès maintenant, à l'échelle de chacun :",
      ],
      bullets: [
        'pour les développeurs et les agences : garder au moins un produit à soi à côté des missions, même petit, même lent, et le facturer au mois',
        "pour les clients, publics comme privés : accepter de payer la maintenance et l'abonnement, et pas seulement la construction, parce que c'est ce qui garantit que le logiciel sera encore là demain",
        "pour les investisseurs et les programmes d'accompagnement : juger un projet sur sa capacité à encaisser chaque mois, pas seulement sur la qualité de sa démo",
        "pour les décideurs : quand un logiciel local fait le travail, l'acheter. La commande publique est le premier revenu récurrent qu'un écosystème peut offrir à ses propres bâtisseurs",
      ],
    },
    {
      heading: 'Ce que je ne dis pas',
      paragraphs: [
        "Je ne dis pas qu'il faut refuser les outils étrangers par principe. Beaucoup sont excellents, et les utiliser n'a rien de honteux. Je ne dis pas non plus que tout doit être construit ici.",
        "Je dis que là où nous construisons, nous devons construire des entreprises capables de durer, et que cela passe par un modèle économique avant de passer par un slogan. La souveraineté numérique n'est pas une déclaration. C'est une ligne de revenu qui revient chaque mois, et une équipe qui est encore là pour la mériter.",
      ],
    },
  ],
  debate:
    "Dans ton secteur, qui paie aujourd'hui la maintenance des logiciels dont tout le monde dépend, et qui devrait la payer ?",
}
