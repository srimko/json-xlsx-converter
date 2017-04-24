# JSON XLSX CONVERTER V2.1.0

## Fonctionnement

Cloner le rep `git clone *****`

Lancer la commande `npm install`

Ensuite la commande `node index.js -init` ou `node index.js -i`, cette commande va créer tous les dossiers et fichiers nécessaire au fonctionnement du script.

Pour lancer l'extraction des fichiers json du cours lancer la commande `node index.js -extract <folder>` ou `node index.js -e <folder>`.

Le `<folder>` est optionel, si il n'est pas resseigné le fichier source sera prit comme répertoire de travail.

Pour lancer la population des nouveaux fichiers json il faut lancer la commande `node index.js -populate <language>` ou `node index.js -p <language>`.

La langue est impérative pour le bon fonctionnement du script.

## Commande

`npm run init` équivaut à faire `node index.js -init`

`npm run start` équivaut à faire `node index.js -extract`

`npm run populate` équivaut à faire `node index.js -populate en`

## Configuration

Dans le répertoir config vous pouvez rajouter d'autres fichiers `.conf`.

Les fichiers `*.conf` permttent de de renseigner quels sont les propriétés qui doivent retenu.

## Auteur

Alexandre Cédrick aka *srimko* <alexandre.cedrick@gmail.com> fait avec :heart: pour Yes'N'You Digital :smirk:

github : https://github.com/srimko
github json-xlsx-converter : https://github.com/srimko/json-xlsx-converter
