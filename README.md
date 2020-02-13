Tableau de bord du projet: https://tasks.office.com/cdg29.bzh/fr-FR/Home/Planner/#/plantaskboard?groupId=32df886a-b6e2-4a06-abcf-063d0c134e89&planId=C66_4kTDlUiVhvsCZIsUI5cAHmPX

# Technos

Backend (API): https://loopback.io/doc/en/lb3/

Front: https://angular.io/

https://material.angular.io/

# Installation

`git clone http://git.cdg29.local/cdg29/cotisations2`

`npm install`

Lancer `server.js` dans le dossier server

`ng serve` dans le dossier client


## Appliquer les migrations de la base de donées

`npm i -g loopback-migration-tool` et `lb-migration migrate`
ou `node_modules/.bin/lb-migration migrate`

utiliser l'option `--method=update` une fois qu'il y a des données

## Injecter les données de base

Les données de base (utilisateur admin, roles, types de saisines) sont situées dans `server/boot/data.js`

Ce script est donc exécuté à chaque démarrage du serveur node.

C'est pourquoi les instructions de création des données sont commentées


