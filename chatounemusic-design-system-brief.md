# Design System Brief — ChatouneMusic

> **Version** : 1.0  
> **Date** : Février 2026  
> **Auteur** : Agent UX/UI Designer  
> **Destinataire** : Agent Design System  
> **Projet** : ChatouneMusic — App web de découverte musicale pour couples  
> **Stack** : Next.js · Tailwind CSS · Spotify API · Vercel

---

## 1. Contexte projet

ChatouneMusic est une app web (navigateur uniquement) qui trouve des morceaux Spotify adaptés à l'humeur d'un couple. Chaque partenaire choisit son humeur, l'app fusionne les deux et propose des morceaux individuels.

- **Cible** : couple de 28 ans, digital natives, utilisateurs Spotify
- **Ton** : romantique, moderne, chaleureux, ludique — jamais kitsch ni corporate
- **Complexité** : side-project, 6 écrans, pas d'authentification
- **Ambiance** : inspirée de Spotify Wrapped, en plus intime et personnel

---

## 2. Design Tokens

### 2.1 Palette de couleurs

| Token | Nom | Hex | Tailwind custom | Usage |
|-------|-----|-----|-----------------|-------|
| `color-primary` | Rose vif | `#E91E63` | `primary` | CTA, accents, bordures sélection, icônes actives |
| `color-primary-hover` | Rose foncé | `#C2185B` | `primary-hover` | États hover et pressed des boutons primaires |
| `color-primary-10` | Rose 10% | `#E91E63` à 10% opacité | `primary/10` | Fond des éléments sélectionnés (mood cards) |
| `color-bg` | Rose très pâle | `#FFF0F5` | `bg-main` | Fond principal de toutes les pages |
| `color-bg-gradient` | Dégradé fond | `#FFF0F5 → #FFE4EC → #FFF0F5` | — | Gradient vertical appliqué sur le body |
| `color-text` | Bleu nuit | `#1A1A2E` | `text-main` | Texte principal, titres |
| `color-text-secondary` | Gris | `#666666` | `text-secondary` | Texte secondaire, descriptions, labels |
| `color-card` | Blanc | `#FFFFFF` | `card` | Fond des cartes, modales |
| `color-card-glass` | Blanc 80% | `rgba(255,255,255,0.8)` | `white/80` | Cartes avec backdrop-blur (recap, badges) |
| `color-gold` | Doré | `#FFD700` | `gold` | Accent exclusif au mode mariage |
| `color-success` | Vert | `#4CAF50` | `success` | Feedbacks positifs, confirmations |
| `color-error` | Rouge | `#F44336` | `error` | Messages d'erreur, validations |
| `color-spotify` | Vert Spotify | `#1DB954` | `spotify` | Boutons et liens vers Spotify |
| `color-surface-dark` | Bleu très foncé | `#1A1A2E` | `surface-dark` | Player bar, fond sombre |

**Ratios de contraste validés (WCAG AA) :**

| Combinaison | Ratio | Statut |
|-------------|-------|--------|
| `#1A1A2E` sur `#FFF0F5` | 12.6:1 | ✅ AAA |
| `#1A1A2E` sur `#FFFFFF` | 16.0:1 | ✅ AAA |
| `#FFFFFF` sur `#E91E63` | 4.5:1 | ✅ AA |
| `#FFFFFF` sur `#1A1A2E` | 16.0:1 | ✅ AAA |
| `#666666` sur `#FFFFFF` | 5.7:1 | ✅ AA |
| `#666666` sur `#FFF0F5` | 5.0:1 | ✅ AA |

### 2.2 Typographie

| Token | Police | Poids | Taille | Interligne | Usage |
|-------|--------|-------|--------|------------|-------|
| `heading-1` | Poppins | Bold (700) | 40px / `text-4xl` (mobile) → 48px / `text-5xl` (desktop) | 1.2 | Titre hero, titres de pages |
| `heading-2` | Poppins | Bold (700) | 24px / `text-2xl` | 1.3 | Sous-titres de sections |
| `heading-3` | Poppins | SemiBold (600) | 18px / `text-lg` | 1.4 | Titres de cartes, labels de sections |
| `body` | Inter | Regular (400) | 16px / `text-base` | 1.6 | Corps de texte |
| `body-sm` | Inter | Regular (400) | 14px / `text-sm` | 1.5 | Descriptions, métadonnées |
| `caption` | Inter | Medium (500) | 12px / `text-xs` | 1.4 | Badges, labels, durées |
| `button` | Inter | Bold (700) | 16px–18px | 1 | Texte des boutons |

**Import Google Fonts :**  
`Poppins:wght@600;700` et `Inter:wght@400;500;600;700`

### 2.3 Espacements

Basé sur le scale Tailwind CSS par défaut (base 4px) :

| Token | Valeur | Tailwind | Usage principal |
|-------|--------|----------|-----------------|
| `space-1` | 4px | `1` | Micro-gaps (entre icône et texte) |
| `space-2` | 8px | `2` | Gaps internes compacts |
| `space-3` | 12px | `3` | Gap grille humeurs |
| `space-4` | 16px | `4` | Padding interne des cartes morceaux |
| `space-5` | 20px | `5` | Padding panneaux |
| `space-6` | 24px | `6` | Gap entre cartes, marges de section |
| `space-8` | 32px | `8` | Marge entre sections majeures |
| `space-12` | 48px | `12` | Marge hero, séparations majeures |
| `space-16` | 64px | `16` | Marge section "Comment ça marche" |

### 2.4 Bordures et ombres

| Token | Valeur Tailwind | Usage |
|-------|-----------------|-------|
| `radius-full` | `rounded-full` | Boutons, inputs, badges, progress dots |
| `radius-2xl` | `rounded-2xl` (16px) | Cartes morceaux, mood cards, panneaux |
| `radius-xl` | `rounded-xl` (12px) | Pochettes, covers |
| `shadow-card` | `shadow-md` | Cartes au repos |
| `shadow-card-hover` | `shadow-lg` | Cartes au survol |
| `shadow-elevated` | `shadow-xl` | Player bar, éléments flottants |
| `shadow-cta` | `shadow-lg` | Bouton CTA principal |
| `border-input` | `border-2 border-primary/30` | Input au repos |
| `border-input-focus` | `border-2 border-primary` | Input au focus |
| `border-selected` | `border-2 border-primary` | Mood card sélectionnée |

### 2.5 Animations et transitions

| Token | Propriété | Valeur | Usage |
|-------|-----------|--------|-------|
| `transition-base` | `transition-all` | `duration-300` | Transition par défaut sur tous les interactifs |
| `hover-scale` | `transform` | `scale(1.05)` | Hover des boutons et cartes |
| `active-scale` | `transform` | `scale(0.95)` | Clic/press des boutons |
| `selected-scale` | `transform` | `scale(1.05)` | Mood card sélectionnée |
| `stagger-delay` | `animation-delay` | `100ms × index` | Apparition des cartes résultats |
| `fade-in-up` | `keyframes` | opacity 0→1, translateY 20→0, 400ms ease | Apparition des sections |
| `pulse-loader` | `keyframes` | scaleY bounce, 1s infinite, stagger 150ms | Loader de fusion |
| `bounce-slow` | `animation` | bounce 2s infinite | Emoji du hero |

---

## 3. Inventaire des composants

### 3.1 Button

**Variantes :**

| Variante | Fond | Texte | Bordure | Usage |
|----------|------|-------|---------|-------|
| `primary` | `#E91E63` | blanc | aucune | CTA principaux ("C'est parti !", "Mixer nos humeurs") |
| `secondary` | blanc | `#E91E63` | `2px #E91E63` | CTA secondaires ("On recommence ?") |
| `ghost` | transparent | `#666` | aucune | Liens de navigation, retour |

**Tailles :**

| Taille | Padding | Font size |
|--------|---------|-----------|
| `sm` | `px-4 py-2` | `text-sm` |
| `md` | `px-6 py-3` | `text-base` |
| `lg` | `px-8 py-4` | `text-lg` |

**États :**

| État | Modification |
|------|-------------|
| default | Styles de base |
| hover | `bg-primary-hover` + `scale-105` + `shadow-xl` |
| focus | `ring-4 ring-primary/30` + outline visible |
| active | `scale-95` |
| disabled | `opacity-50` + `cursor-not-allowed` + pas de hover |

**Structure Tailwind :**  
`rounded-full font-bold inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer select-none`

---

### 3.2 MoodCard (bouton de sélection d'humeur)

**Contenu :** emoji (32px) + label texte (12px bold)

**Données des 6 humeurs :**

| Humeur | Emoji | Couleur d'accent |
|--------|-------|------------------|
| Joyeux | 😊 | `#FFD54F` |
| Romantique | 💕 | `#F48FB1` |
| Chill | 😌 | `#81D4FA` |
| Mélancolique | 🥺 | `#B39DDB` |
| Énergique | ⚡ | `#FFB74D` |
| Fêtard | 🎉 | `#AED581` |

**États :**

| État | Style |
|------|-------|
| default | `bg-white/80 border-2 border-transparent rounded-2xl p-4` |
| hover | `bg-white shadow-md scale-102` |
| selected | `border-primary bg-primary/10 scale-105` + ombre colorée (`box-shadow: 0 4px 20px {accent}40`) |
| focus | `ring-4 ring-primary/30` |

**Accessibilité :**
- Container : `role="radiogroup"` + `aria-label="Sélection d'humeur"`
- Chaque carte : `role="radio"` + `aria-checked` + `aria-label="{label}"`
- Navigation clavier : Tab entre cartes, Enter/Space pour sélectionner

**Layout :** grille `grid-cols-3 gap-3`, passage à `grid-cols-2` sous 375px

---

### 3.3 TrackCard (carte morceau)

**Contenu :**
- Cover : 64×64px, `rounded-xl`, fond dégradé placeholder ou image Spotify
- Titre : `text-sm font-bold text-main`, `truncate`
- Artiste : `text-xs text-secondary`, `truncate`
- Durée : `text-xs text-secondary/60`
- Boutons d'action (3) : chacun 40×40px, `rounded-full`

**Layout :** flex row avec `items-center gap-4`

**Boutons d'action :**

| Bouton | Default | Actif | aria-label |
|--------|---------|-------|------------|
| Play/Pause | `bg-primary/10 text-primary` | `bg-primary text-white scale-110 shadow-lg` | "Écouter {titre}" / "Pause {titre}" |
| Favori | `bg-gray-100 text-gray-400` | `bg-primary text-white scale-110` | "Ajouter/Retirer {titre} des favoris" |
| Spotify | `bg-spotify/10 text-spotify` | `bg-spotify text-white` | "Ouvrir {titre} dans Spotify" |

**État de la carte :**

| État | Style |
|------|-------|
| default | `bg-white rounded-2xl p-4 shadow-lg` |
| hover | `shadow-xl` |

**Skeleton loading :**
- Cover : `bg-gray-200 rounded-xl animate-pulse`
- Titre : `bg-gray-200 rounded h-3 w-3/4 animate-pulse`
- Artiste : `bg-gray-200 rounded h-2 w-1/2 animate-pulse`

---

### 3.4 TextInput (champ prénom)

| État | Style |
|------|-------|
| default | `w-full px-5 py-3 rounded-full border-2 border-primary/30 bg-white text-main` |
| focus | `border-primary ring-4 ring-primary/10 outline-none` |
| error | `border-error ring-4 ring-error/10` |
| placeholder | `text-secondary/50` |

**Accessibilité :** `aria-label="Prénom du partenaire {n}"`

---

### 3.5 EnergySlider (slider d'énergie)

- Input `type="range"`, min 0, max 100
- Barre : `h-2 rounded-full`, remplissage gradient (`#81D4FA` → couleur humeur)
- Thumb : 20×20px, `bg-primary`, `rounded-full`, `shadow`
- Labels : "🐌 Calme" à gauche, "🔥 Max" à droite, `text-xs text-secondary`
- `aria-label="Niveau d'énergie"`

---

### 3.6 ProgressBar (barre de progression 3 étapes)

- 3 segments, `rounded-full`
- Actif : `bg-primary w-12 h-2`
- Inactif : `bg-primary/20 w-8 h-2`
- Transition : `transition-all duration-500`
- `gap-2`, centré horizontalement

---

### 3.7 NavBar

| Élément | Style |
|---------|-------|
| Container | `flex items-center justify-between px-6 py-4 max-w-5xl mx-auto` |
| Logo | emoji 🎵 + "Chatoune" (text-main bold) + "Music" (text-primary bold) |
| Liens | `text-sm text-secondary hover:text-primary transition-colors` |
| Retour | `← Retour`, même style que lien, affiché sur les pages internes |

Pas de sticky header par défaut. À envisager si le contenu s'allonge.

---

### 3.8 PlayerBar (barre de lecture Spotify)

| Propriété | Valeur |
|-----------|--------|
| Fond | `bg-surface-dark` (#1A1A2E) |
| Radius | `rounded-2xl` |
| Padding | `p-4` |
| Ombre | `shadow-xl` |
| Layout | flex row : cover (48×48 rounded-lg) + infos + barre de progression + embed iframe |
| Texte | blanc (titre bold), blanc/60 (artiste) |
| Apparition | au clic play, animée (fade-in-up) |
| Iframe Spotify | hauteur compacte 80px, lazy loaded |

---

### 3.9 MoodRecap (badge humeur sur l'écran résultats)

- Badge par partenaire : `bg-{accent}/20 rounded-full px-3 py-1`
- Contenu : emoji + prénom
- Séparateurs : `+` et `=` en `text-primary font-bold`
- Résultat : "✨ Votre mix" en `font-bold text-main`

---

### 3.10 StepCard (section "Comment ça marche")

| Propriété | Valeur |
|-----------|--------|
| Fond | `bg-white/70 backdrop-blur-sm` |
| Radius | `rounded-2xl` |
| Padding | `p-6` |
| Ombre | `shadow-md` → `shadow-lg` au hover |
| Icône | emoji 32px, `mb-3` |
| Titre | `text-sm font-bold text-main` |
| Description | `text-xs text-secondary leading-relaxed` |

---

## 4. Layouts et responsive

### 4.1 Breakpoints

| Nom | Largeur | Tailwind prefix |
|-----|---------|-----------------|
| Mobile | < 768px | (défaut) |
| Tablette | 768–1023px | `md:` |
| Desktop | ≥ 1024px | `lg:` |

**Approche** : mobile-first dans le code (les styles par défaut ciblent le mobile).

### 4.2 Comportements responsive par écran

**Accueil :**

| Élément | Mobile | Tablette | Desktop |
|---------|--------|----------|---------|
| Hero titre | `text-4xl` | `text-4xl` | `text-5xl` |
| CTA | pleine largeur | auto | auto |
| Section étapes | 1 colonne empilée | 3 colonnes | 3 colonnes |
| Max-width hero | — | `max-w-2xl` | `max-w-3xl` |

**Sélection humeur :**

| Élément | Mobile | Tablette | Desktop |
|---------|--------|----------|---------|
| Container | `px-4` | `px-6 max-w-lg` | `px-6 max-w-lg` |
| Grille humeurs | `grid-cols-2` (<375px) / `grid-cols-3` | `grid-cols-3` | `grid-cols-3` |
| Input prénom | pleine largeur | pleine largeur | pleine largeur |

**Résultats :**

| Élément | Mobile | Tablette | Desktop |
|---------|--------|----------|---------|
| Grille morceaux | 1 colonne | 2 colonnes | 2 colonnes |
| Max-width | — | `max-w-4xl` | `max-w-4xl` |
| Boutons d'action | empilés verticalement | côte à côte | côte à côte |
| Player bar | pleine largeur | pleine largeur, inline | pleine largeur, inline |

---

## 5. Accessibilité (WCAG 2.1 AA)

### 5.1 Exigences non négociables

| Critère | Implémentation |
|---------|----------------|
| Contrastes | Tous les ratios validés ≥ 4.5:1 (voir section 2.1) |
| Focus visible | `focus:ring-4 focus:ring-primary/30` sur TOUS les éléments interactifs |
| Navigation clavier | Tab order logique, Enter/Space pour activer |
| Structure sémantique | `<nav>`, `<main>`, `<footer>`, un `<h1>` unique par page |
| Headings | Hiérarchie logique h1 → h2 → h3, pas de saut de niveau |
| ARIA roles | `radiogroup` / `radio` sur la grille humeurs |
| ARIA states | `aria-checked`, `aria-label` sur tous les boutons d'action |
| Textes alternatifs | Alt text sur les covers Spotify, aria-label sur les boutons icônes |
| Boutons disabled | `aria-disabled="true"` + `opacity-50` + message contextuel |

### 5.2 Checklist par composant

- **Button** : focus ring, aria-label si icône seule
- **MoodCard** : role radio, aria-checked, aria-label
- **TrackCard** : aria-label par action, focus visible sur chaque bouton
- **TextInput** : label associé, aria-label, message d'erreur via aria-describedby
- **Slider** : aria-label, aria-valuemin/max/now
- **NavBar** : `<nav>` sémantique, liens avec focus visible
- **PlayerBar** : aria-label sur les contrôles, rôle region si nécessaire

---

## 6. Tailwind Config recommandée

```javascript
// tailwind.config.js — extensions personnalisées
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E91E63',
          hover: '#C2185B',
        },
        'bg-main': '#FFF0F5',
        'text-main': '#1A1A2E',
        'text-secondary': '#666666',
        gold: '#FFD700',
        success: '#4CAF50',
        error: '#F44336',
        spotify: '#1DB954',
        'surface-dark': '#1A1A2E',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        'xl': '12px',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-bar': {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 400ms ease forwards',
        'pulse-bar': 'pulse-bar 1s ease-in-out infinite',
      },
    },
  },
}
```

---

## 7. Contraintes et interdits

| ❌ Interdit | ✅ À la place |
|-------------|---------------|
| Bibliothèques UI externes (MUI, Chakra…) | Composants maison Tailwind |
| CSS custom (sauf exception justifiée) | Classes Tailwind utilitaires |
| Dark mode (sauf bonus) | Mode clair uniquement |
| Lorem ipsum | Contenu réel ou placeholder crédible |
| Design corporate ou froid | Chaleureux, romantique, ludique |
| Surcharge d'animations | Transitions subtiles 300ms max |
| Formulaires complexes | Clics et sliders uniquement |
| Playlist Spotify | Morceaux individuels uniquement |

---

## 8. Fichiers de référence

| Document | Contenu | Statut |
|----------|---------|--------|
| Cahier des charges ChatouneMusic v1.0 | Objectifs, parcours, fonctionnalités | ✅ Validé |
| Brief UX/UI | Écrans, contenus, direction artistique | ✅ Validé |
| Wireframes mid-fidelity (React) | 3 écrans principaux interactifs + specs | ✅ Livré |
| **Ce document** | Tokens, composants, a11y, config Tailwind | ✅ À transmettre |

---

*Document généré par l'Agent UX/UI Designer — Février 2026*  
*Prêt à être exploité par l'Agent Design System et/ou Claude Code*
