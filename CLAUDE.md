# CLAUDE.md — Design System ChatouneMusic

## Stack
- Next.js (App Router)
- Tailwind CSS (config custom dans `tailwind.config.js`)
- Google Fonts : Poppins (600, 700) + Inter (400, 500, 600, 700)
- Spotify Web API
- Déploiement Vercel

## Design Tokens
- **Config Tailwind** : `tailwind.config.js` — contient couleurs, typos, ombres, animations, breakpoints
- **Documentation complète** : `CHATOUNEMUSIC-DESIGN-SYSTEM.md`

## Conventions de style

### Couleurs
- Primaire : `bg-primary` (#E91E63), hover : `bg-primary-hover` (#C2185B)
- Fond pages : `bg-bg-main` (#FFF0F5) avec gradient `from-[#FFF0F5] via-[#FFE4EC] to-[#FFF0F5]`
- Texte principal : `text-text-main` (#1A1A2E), secondaire : `text-text-secondary` (#666)
- Cartes : `bg-white` ou `bg-white/80 backdrop-blur-card`
- Spotify : `bg-spotify` (#1DB954)
- 6 couleurs d'humeur dans `colors.mood.*`

### Typographie
- Titres : `font-heading` (Poppins), H1 : `text-h1-mobile lg:text-h1-desktop`
- Corps : `font-body` (Inter), `text-body` ou `text-body-sm`

### Composants (tous dans /components)
- `Button` : variantes primary / secondary / ghost, tailles sm / md / lg
- `MoodCard` : role="radio" dans un radiogroup, 6 humeurs
- `TrackCard` : carte morceau avec actions play/fav/spotify
- `TextInput` : champ prénom, rounded-full, gestion erreur
- `EnergySlider` : range input stylé
- `ProgressBar` : 3 étapes visuelles
- `NavBar` : logo + retour conditionnel
- `PlayerBar` : fond sombre, iframe Spotify
- `MoodRecap` : badges humeur résultats
- `StepCard` : carte "Comment ça marche"
- `FusionLoader` : barres pulsantes animées

### Accessibilité (WCAG AA obligatoire)
- Focus ring sur TOUT interactif : `focus:ring-4 focus:ring-primary-30 focus:outline-none`
- ARIA : radiogroup/radio sur humeurs, aria-label sur boutons icônes, aria-describedby sur erreurs
- Sémantique : `<nav>`, `<main>`, `<footer>`, h1 unique par page
- Cibles tactiles ≥ 44×44px

### Responsive (mobile-first)
- Mobile : défaut, `px-4`
- Tablette `md:` (768px) : `px-6`, grilles 2-3 cols
- Desktop `lg:` (1024px) : `max-w-hero` / `max-w-content`

### Interdits
- Pas de bibliothèque UI externe
- Pas de CSS custom (sauf slider thumb)
- Pas de dark mode
- Pas de Lorem ipsum
- Animations ≤ 300ms, transition-all duration-300 par défaut
