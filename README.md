# JSON XLSX CONVERTER V2.0.0 (En développement)

## Fonctionnement

Cloner le rep `git clone *****`

Lancer la commande `npm install`

Ensuite la commande `node index.js -init` ou `node index.js -i`, cette commande va créer tous les dossiers et fichiers nécessaire au fonctionnement du script.

Pour lancer l'extraction des fichiers json du cours lancer la commande `node index.js -extract <folder>` ou `node index.js -e <folder>`.

Le `<folder>` est optionel, si il n'est pas resseigné le fichier source sera prit comme répertoire de travail.

## Commande

`npm run init` équivaut à faire `node index.js -init`

`npm run start` équivaut à faire `node index.js -extract`


# JSON XLSX CONVERTER V1.2.0

C'est un script qui permet d'extraire les textes à traduire dans des fichiers JSON pour créer un export XLSX.

## Fonctionnement

`node index.js` va ouvrir le répertoire `json` courant. Vous pouvez mettre un argument du type `node index.js /Users/srimko/Desktop/course/en` pour indiquer quel répertoire vous voulez scanner.

## Configuration

Dans le répertoir config vous pouvez rajouter d'autres fichiers `.conf`.
Les fichiers `*.conf` permttent de de renseigner quels sont les propriétés qui doivent retenu.
