import type { PublishedNote } from '../types'

export const leCodeNestPasLeProduit: PublishedNote = {
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
}
