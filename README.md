# MadTranslator

Prérequis :
- Node.js
- React.js
- npm

Installation :
- Pour lancer le projet rendez vous dans le dossier "server" de "MadTranslator"
cd server
- Lancer la commande npm pour installer les dépendances
(sudo) npm start

- Faire de même dans le dossier "game" de "MadTranslator"

Fonctionnement :
- "server.js" se connecte à la base de données NoSql (MongoDB), afin de récupérer dans un tableau tous les mots correpondant à une difficulté de 5 au début, les difficultés attribuées à chacun des mots de la bdd ont été générées aléatoirement de 1 à 10 (Math.floor(Math.random() * 10) + 1). Un mot est sélectionné aléatoirement dans ce tableau et est traduit avec une api tierce open source (Yandex Translator) puis le server renvoie en json un objet contenant le mot de départ, sa traduction ainsi que sa difficulté.

- Coté client React.js fait une requête au server afin de récupérer cet objet.
Le mot de départ est affiché pour l'utilisateur, ainsi que le nombre de caractères du mot traduit et sa première lettre.
Si l'utilisateur traduit correctement, le score augmente de 1 sinon il diminue de 1. Le score est initialisé à 10 à chaque début de partie.
A chaque tour la difficulté du mot à traduire augmente si la réponse précédente est juste sinon elle diminue.
La partie est terminée quand le score atteint 20 ou 0.

Points à améliorer :
- Avoir une base de données contenant des mots plus simples et faisant partis du langage courant afin de faciliter le travail de l'api tierce.
- Optimisation de la requête NoSql afin de sélectionner directement un mot aléatoirement à l'aide d'un filtre/paramètre plutôt que de retourner tous les mots dans un tableau.
- La gestion de la difficulté des mots peut être améliorée en se basant sur une donnée réaliste, comme par exemple la longueur du mot à traduire plutôt que l'affecter de façon purement aléatoire.

Temps de travail :

- Environ 45 mn de recherche afin de réfléchir à l'organisation du projet ainsi que faire la recherche d'une API de traduction gratuite.
- Environ 1h10 afin de réaliser le back en Node.js
- Environ 1h15 afin de réaliser le front et l'UI avec React.js et Bootstrap

- Le projet m'a donc pris à peu près 3h de travail.
