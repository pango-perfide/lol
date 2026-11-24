# Nexus Scrim - MVP LoL

Premier socle fonctionnel pour une plateforme LoL de recrutement, équipes, scrims et classement.

## Fonctionnalités incluses

- Tableau de bord avec actualités de démonstration
- Recherche de joueurs par rôle, rang et style
- Profils avec statistiques et archétypes
- Équipes et demandes de scrim
- Classement d'équipes
- API de recherche de joueurs
- Schéma Prisma SQLite prêt pour la persistance

## Lancer le projet

1. Installer Node.js 20+.
2. Copier `.env.example` vers `.env`.
3. Lancer :

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Étapes suivantes

- Authentification et vérification du compte Riot
- Synchronisation des matchs via l'API Riot autorisée
- Formulaires persistants pour équipes et scrims
- Calcul d'archétypes par rôle, champion et période
- Confirmation bilatérale des résultats et Elo/Glicko
- Modération, signalements et conformité RGPD

Les données visibles dans l'interface sont des démonstrations locales, pas des données Riot réelles.
