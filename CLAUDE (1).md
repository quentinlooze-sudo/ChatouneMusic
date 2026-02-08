# CLAUDE.md — ChatouneMusic

> Ce fichier est lu par Claude Code à chaque session. Il contient toutes les règles, conventions et instructions pour développer ChatouneMusic de manière cohérente.

---

## 🎯 Objectif du projet

**ChatouneMusic** est une application web qui trouve des morceaux Spotify adaptés à l'humeur d'un couple.

- Chaque partenaire sélectionne son humeur → l'app fusionne les deux → propose des morceaux individuels via Spotify.
- C'est un cadeau personnel pour un couple de 28 ans qui se marie en 2026.
- Side project, budget 0€, outils gratuits uniquement.

---

## 📐 Règles générales

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript strict (`strict: true` dans tsconfig)
- **Styling** : Tailwind CSS uniquement (pas de CSS modules, pas de styled-components)
- **API musicale** : Spotify Web API — endpoint `/recommendations` pour des morceaux individuels
- **Auth** : Spotify OAuth 2.0 via API route Next.js (pour sécuriser le `client_secret`)
- **Hébergement** : Vercel (gratuit)
- **Pas de backend** : tout passe par les API routes Next.js (`/app/api/`)
- **Pas de base de données** : localStorage pour les favoris

---

## 🧱 Structure des fichiers

```
chatounemusic/
├── app/
│   ├── layout.tsx              # Layout principal (header, footer, fonts)
│   ├── page.tsx                # Page d'accueil
│   ├── mood/
│   │   └── page.tsx            # Sélection d'humeur (2 partenaires)
│   ├── results/
│   │   └── page.tsx            # Affichage des morceaux trouvés
│   ├── favorites/
│   │   └── page.tsx            # Morceaux sauvegardés
│   ├── wedding/
│   │   └── page.tsx            # Mode Mariage
│   ├── about/
│   │   └── page.tsx            # À propos / message personnel
│   └── api/
│       ├── auth/
│       │   └── spotify/route.ts  # OAuth Spotify (token exchange)
│       └── recommendations/
│           └── route.ts          # Appel Spotify /recommendations
├── components/
│   ├── ui/                     # Composants réutilisables (Button, Card, Slider...)
│   ├── MoodSelector.tsx        # Grille de sélection d'humeur
│   ├── TrackCard.tsx           # Carte d'un morceau (pochette, titre, artiste, embed)
│   ├── MoodMixer.tsx           # Visualisation de la fusion des humeurs
│   └── SpotifyEmbed.tsx        # Wrapper iframe Spotify
├── lib/
│   ├── spotify.ts              # Fonctions utilitaires Spotify (auth, API calls)
│   ├── moods.ts                # Définition des humeurs et mapping → paramètres Spotify
│   ├── fusion.ts               # Algorithme de fusion des 2 humeurs
│   └── favorites.ts            # CRUD localStorage pour les favoris
├── types/
│   └── index.ts                # Types TypeScript (Mood, Track, SpotifyResponse...)
├── public/
│   ├── favicon.ico
│   └── og-image.png            # Image Open Graph pour le partage
├── .env.local                  # SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

### Règles de structure
- **1 composant = 1 fichier**. Pas de composants multiples dans un même fichier.
- Les composants UI génériques vont dans `components/ui/`.
- Les composants métier (liés à l'app) vont dans `components/`.
- La logique métier (API, calculs) va dans `lib/`.
- Les types partagés vont dans `types/index.ts`.

---

## 🎨 Palette & conventions UI

### Couleurs principales
```
--primary:       #E91E63   (rose vif — couleur dominante, CTA)
--primary-dark:  #C2185B   (rose foncé — hover)
--secondary:     #1A1A2E   (bleu nuit — textes, header)
--accent:        #FFD700   (doré — Mode Mariage uniquement)
--bg:            #FFF0F5   (rose très pâle — fond)
--bg-card:       #FFFFFF   (blanc — cartes)
--text:          #1A1A2E   (bleu nuit — texte principal)
--text-muted:    #666666   (gris — texte secondaire)
--success:       #4CAF50   (vert — confirmation)
--error:         #F44336   (rouge — erreurs)
```

### Tailwind config
Ajouter ces couleurs dans `tailwind.config.ts` sous `theme.extend.colors`.

### Typographie
- **Titres** : `font-bold`, tailles `text-2xl` à `text-5xl`
- **Corps** : taille `text-base` (16px)
- **Police** : utiliser la police par défaut de Next.js (`next/font/google` → Inter ou Poppins)

### Conventions UI
- **Border radius** : `rounded-2xl` sur les cartes, `rounded-full` sur les boutons
- **Ombres** : `shadow-lg` sur les cartes, `shadow-md` sur les boutons
- **Espacement** : multiples de 4 (`p-4`, `gap-6`, `mb-8`)
- **Transitions** : `transition-all duration-300` sur tous les éléments interactifs
- **Mobile-first** : toujours coder le mobile d'abord, puis `md:` et `lg:`

---

## 🧩 Composants à privilégier

### MoodSelector
- Grille de 6 humeurs sous forme de boutons visuels (icône + label)
- Humeurs : Joyeux, Romantique, Chill, Mélancolique, Énergique, Fêtard
- État actif : bordure rose + scale légèrement augmenté
- Animation au clic : petit bounce

### TrackCard
- Pochette (image carrée), titre en gras, artiste en muted, durée
- Bouton play → ouvre l'embed Spotify
- Boutons : ❤️ favori, 🔗 ouvrir dans Spotify
- Layout horizontal sur desktop, vertical sur mobile

### SpotifyEmbed
- iframe Spotify avec `compact=true`
- Lazy loading (`loading="lazy"`)
- Hauteur fixe : 80px (mode compact)

---

## ✍️ Règles de nommage

| Élément | Convention | Exemple |
|---------|-----------|---------|
| Composants | PascalCase | `MoodSelector.tsx` |
| Fichiers lib | camelCase | `spotify.ts`, `moods.ts` |
| Variables/fonctions | camelCase | `getMoodParams()` |
| Types/Interfaces | PascalCase, préfixe descriptif | `type Mood`, `interface SpotifyTrack` |
| Constantes | UPPER_SNAKE_CASE | `MOOD_CONFIGS` |
| CSS classes | Tailwind uniquement | `className="flex gap-4"` |
| Routes API | kebab-case | `/api/recommendations` |
| Env vars | UPPER_SNAKE_CASE | `SPOTIFY_CLIENT_ID` |

---

## 🧠 Bonnes pratiques

### Code
- Toujours typer les props des composants avec une `interface` dédiée.
- Utiliser `"use client"` uniquement sur les composants qui en ont besoin (état, événements).
- Préférer les Server Components par défaut.
- Extraire la logique dans des hooks custom (`useMood`, `useFavorites`) si un composant dépasse 100 lignes.
- Gérer les erreurs API avec des try/catch et afficher un message utilisateur clair.
- Utiliser `loading.tsx` et `error.tsx` de Next.js App Router.

### Spotify API
- **Ne jamais exposer `SPOTIFY_CLIENT_SECRET` côté client.** Tous les appels passent par `/api/`.
- Utiliser le flow **Client Credentials** pour la recherche de morceaux (pas besoin de login user pour les recommendations de base).
- Si login user requis : utiliser **Authorization Code Flow with PKCE**.
- Endpoint principal : `GET https://api.spotify.com/v1/recommendations`
  - Paramètres clés : `seed_genres`, `target_valence`, `target_energy`, `target_danceability`, `target_tempo`, `target_acousticness`
  - Limiter à `limit=10`
- Toujours vérifier l'expiration du token et le renouveler si nécessaire.

### Algorithme de fusion des humeurs
```typescript
// lib/fusion.ts — Principe
// Chaque humeur a des paramètres Spotify associés (valence, energy, etc.)
// La fusion = moyenne pondérée des paramètres des 2 partenaires
// Poids égaux par défaut (50/50)
function fuseMoods(mood1: MoodParams, mood2: MoodParams): MoodParams {
  return {
    valence: (mood1.valence + mood2.valence) / 2,
    energy: (mood1.energy + mood2.energy) / 2,
    danceability: (mood1.danceability + mood2.danceability) / 2,
    tempo: (mood1.tempo + mood2.tempo) / 2,
    acousticness: (mood1.acousticness + mood2.acousticness) / 2,
  };
}
```

### Performance
- Utiliser `next/image` pour toutes les images (pochettes).
- Lazy load les embeds Spotify (ne charger que quand l'utilisateur clique play).
- Éviter les re-renders inutiles (`React.memo` si nécessaire).

---

## 🚫 À éviter absolument

- **Pas de CSS-in-JS** (styled-components, emotion). Tailwind uniquement.
- **Pas de state management global** (Redux, Zustand). L'app est simple, `useState` + `useContext` suffisent.
- **Pas de base de données**. Tout est localStorage ou en mémoire.
- **Pas d'appel Spotify direct depuis le client**. Toujours via `/api/`.
- **Pas de `any`** en TypeScript. Typer correctement.
- **Pas de bibliothèque UI lourde** (Material UI, Chakra). Tailwind + composants maison.
- **Pas de fetch sans gestion d'erreur**.
- **Pas de console.log en production**. Nettoyer avant déploiement.
- **Pas de secrets dans le code**. Utiliser `.env.local`.
- **Pas de playlists**. L'app trouve des **morceaux individuels**, pas des playlists existantes.

---

## 🤖 Instructions spécifiques pour Claude Code

### Comment raisonner
1. **Avant de coder**, vérifie que tu comprends quel écran/composant est concerné en relisant ce fichier.
2. **Consulte la structure des fichiers** ci-dessus pour savoir où placer le code.
3. **Vérifie les types** dans `types/index.ts` avant de créer de nouvelles interfaces.
4. **Pense mobile-first** : code d'abord pour un écran 375px, puis adapte.

### Comment proposer du code
- **Un fichier à la fois**. Ne propose pas 5 fichiers d'un coup.
- **Code complet et fonctionnel**. Pas de `// TODO` ou de placeholders, sauf si explicitement demandé.
- **Inclus les imports**. Toujours.
- **Montre le résultat attendu** en 1 phrase avant le code : "Ce composant affiche une grille de 6 humeurs cliquables."
- **Si tu modifies un fichier existant**, montre uniquement le diff (ce qui change), pas tout le fichier.

### Comment expliquer
- **1 à 2 phrases max** pour expliquer un choix technique.
- **Pas de cours magistral**. L'utilisateur est intermédiaire, il comprend le code.
- **Si un concept est complexe** (ex: OAuth PKCE), explique en 3 lignes max avec une analogie simple.
- **Utilise des commentaires dans le code** plutôt que de longs paragraphes d'explication.

### Workflow recommandé par session
1. Lire ce `CLAUDE.md`
2. Demander quel écran/fonctionnalité travailler
3. Vérifier les dépendances existantes (`package.json`)
4. Coder le composant/la page
5. Tester mentalement le parcours utilisateur
6. Proposer le code avec une explication courte

---

## 📋 Mapping des humeurs (référence)

| Humeur | Icône | valence | energy | danceability | tempo | acousticness |
|--------|-------|---------|--------|-------------|-------|-------------|
| Joyeux | 😊 | 0.8 | 0.7 | 0.6 | 120 | 0.2 |
| Romantique | 💕 | 0.6 | 0.3 | 0.4 | 90 | 0.7 |
| Chill | 😌 | 0.5 | 0.3 | 0.4 | 85 | 0.5 |
| Mélancolique | 🥺 | 0.2 | 0.3 | 0.3 | 75 | 0.6 |
| Énergique | ⚡ | 0.7 | 0.9 | 0.8 | 140 | 0.1 |
| Fêtard | 🎉 | 0.9 | 0.9 | 0.9 | 128 | 0.1 |

---

## 🔑 Variables d'environnement requises

```env
# .env.local
SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Pour obtenir les clés Spotify :
1. Aller sur https://developer.spotify.com/dashboard
2. Créer une application
3. Copier Client ID et Client Secret
4. Ajouter `http://localhost:3000/api/auth/callback` comme Redirect URI

---

*Dernière mise à jour : Février 2026*
