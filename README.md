# Test technique : Web Crawler de Mail

Outil par ligne de commande permettant de crawler des pages web à la recherche d'adresses mail.

## Installer les dépencances

Avec pnpm :
```bash
pnpm i
```

Avec yarn :
```bash
yarn
```

Ou avec npm :
```bash
npm install
```

## Lancer le serveur local

Avec pnpm :
```bash
pnpm serve
```

Avec yarn :
```bash
yarn serve
```

Ou avec npm :
```bash
npm serve
```

Le serveur se lance sur le port `3000` par défaut. Pour choisir un autre port, il faut créer un fichier .env définissant la variable d'environnement `SERVER_PORT`.

Exemple :
```bash
SERVER_PORT=80
```

## Crawler une URL pour récupérer les mails

Avec pnpm :
```bash
pnpm start [url] [maxDepth]
```

Avec yarn :
```bash
yarn start [url] [maxDepth]
```

Ou avec npm :
```bash
npm start [url] [maxDepth]
```

## Effectuer les tests

Avec pnpm :
```bash
pnpm test
```

Avec yarn :
```bash
yarn test
```

Ou avec npm :
```bash
npm test
```
