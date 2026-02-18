# Salon Élégance — Plateforme Web Coiffure

Plateforme web premium pour salon de coiffure avec prise de rendez-vous en ligne, gestion de l'agenda et back-office administratif.

## Fonctionnalites (Phase 1 - MVP)

- **Site vitrine** : Accueil, tarifs, contact
- **Reservation en ligne** : Module multi-etapes (service, coiffeur, creneau, confirmation)
- **Back-office** : Dashboard admin avec agenda jour par jour
- **Confirmation email** : Envoi automatique apres reservation

## Stack Technique

- **Next.js 14** (App Router) + TypeScript
- **Prisma 5** + SQLite
- **Tailwind CSS 3**
- **Nodemailer** pour les emails

## Demarrage Rapide

```bash
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

Le back-office admin est sur [http://localhost:3000/admin](http://localhost:3000/admin).

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement |
| `npm run build` | Build de production |
| `npm run lint` | Linter ESLint |
| `npm run db:migrate` | Appliquer les migrations |
| `npm run db:seed` | Charger les donnees de demo |
| `npm run db:reset` | Reinitialiser la base de donnees |
