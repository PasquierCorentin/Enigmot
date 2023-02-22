# Application Prévisions Météo

Ce projet est un jeu inspiré de "Wordle", réalisé avec **Reactjs**, **Typescript** et **TailwindCSS**.

Le principe est simple :

- A chaque partie, un Mot Mystère de 5 lettres est choisi au hasard
- Vous devez faire des propositions de mots dans le but de trouver le Mot Mystère
- A chaque proposition, le jeu vous indique pour chaque lettre si elle est fausse (gris), si elle est dans le mot mais mal placée (jaune), ou si elle est bien placée (vert) !
- Vous avez 6 essais maximum pour trouvre le bon mot, sinon c'est perdu !

![Screenshot d'une partie de jeu'](/public/Game_Screenshot.JPG 'Partie de jeu Enigmot')

## Stack Technique

- React.Js
- Typescript
- TailwindCSS
- Vite (Setup)
- Prettier (code formatter)
- Vitest (Test)
- Zustand (State Management)

## Installation et Lancement

A la racine du projet, utilisez `npm i` pour installer les dépendences du projet.

Après avoir installé les dépendences, utilisez `npm run dev` et rendez-vous à l'adresse : http://127.0.0.1:5173/
