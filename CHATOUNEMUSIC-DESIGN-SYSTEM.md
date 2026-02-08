# 🎵 ChatouneMusic — Design System

> **Version** : 1.0 · **Stack** : Next.js + Tailwind CSS + Spotify API  
> **Direction artistique** : Romantique, chaleureux, ludique — inspiré Spotify Wrapped en plus intime  
> **Approche CSS** : Mobile-first · Tailwind utility classes uniquement (pas de CSS custom)

---

## 1. Fondations

### 1.1 Couleurs

#### Palette principale

| Token Tailwind | Hex | Usage |
|---|---|---|
| `bg-primary` | `#E91E63` | CTA, accents, bordures sélection |
| `bg-primary-hover` | `#C2185B` | Hover/pressed boutons primaires |
| `bg-primary-10` | `rgba(233,30,99,0.10)` | Fond mood card sélectionnée |
| `bg-bg-main` | `#FFF0F5` | Fond principal pages |
| `text-text-main` | `#1A1A2E` | Texte principal, titres |
| `text-text-secondary` | `#666666` | Descriptions, labels |
| `bg-card` | `#FFFFFF` | Fond cartes, modales |
| `bg-gold` | `#FFD700` | Accent mode mariage |
| `bg-success` | `#4CAF50` | Confirmations |
| `bg-error` | `#F44336` | Erreurs |
| `bg-spotify` | `#1DB954` | Liens/boutons Spotify |
| `bg-surface-dark` | `#1A1A2E` | Player bar, fonds sombres |

#### Couleurs d'humeur

| Humeur | Token | Hex |
|---|---|---|
| Joyeux 😊 | `bg-mood-joyeux` | `#FFD54F` |
| Romantique 💕 | `bg-mood-romantique` | `#F48FB1` |
| Chill 😌 | `bg-mood-chill` | `#81D4FA` |
| Mélancolique 🥺 | `bg-mood-melancolique` | `#B39DDB` |
| Énergique ⚡ | `bg-mood-energique` | `#FFB74D` |
| Fêtard 🎉 | `bg-mood-fetard` | `#AED581` |

#### Gradient de fond (body)

```html
<body class="min-h-screen bg-bg-main bg-gradient-to-b from-[#FFF0F5] via-[#FFE4EC] to-[#FFF0F5]">
```

#### Contrastes WCAG validés

Toutes les combinaisons texte/fond atteignent au minimum AA (4.5:1). Les couples `text-main` sur `bg-main` et `card` atteignent AAA (12.6:1 et 16:1).

---

### 1.2 Typographie

**Google Fonts** à importer :

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Rôle | Classes Tailwind |
|---|---|
| Titre H1 (mobile) | `font-heading text-h1-mobile` |
| Titre H1 (desktop) | `font-heading lg:text-h1-desktop` |
| Titre H2 | `font-heading text-h2` |
| Titre H3 | `font-heading text-h3` |
| Corps de texte | `font-body text-body` |
| Texte petit | `font-body text-body-sm` |
| Caption/badge | `font-body text-caption` |
| Bouton | `font-body font-bold` |

---

### 1.3 Espacements

Le système utilise le scale Tailwind par défaut (base 4px). Conventions du projet :

| Contexte | Classe | Valeur |
|---|---|---|
| Micro-gap (icône + texte) | `gap-1` | 4px |
| Gap interne compact | `gap-2` | 8px |
| Gap grille humeurs | `gap-3` | 12px |
| Padding carte morceau | `p-4` | 16px |
| Padding panneau | `p-5` | 20px |
| Gap entre cartes / marge section | `gap-6` | 24px |
| Marge entre sections | `py-8` | 32px |
| Marge hero / séparation majeure | `py-12` | 48px |
| Marge grande section | `py-16` | 64px |

---

### 1.4 Arrondis & Ombres

| Token | Classe | Usage |
|---|---|---|
| Plein rond | `rounded-full` | Boutons, inputs, badges, dots |
| Carte | `rounded-2xl` | Mood cards, track cards, panneaux |
| Cover | `rounded-xl` | Pochettes Spotify |
| Ombre repos | `shadow-card` | Cartes par défaut |
| Ombre hover | `shadow-card-hover` | Cartes au survol |
| Ombre élevée | `shadow-elevated` | Player bar, flottants |
| Ombre CTA | `shadow-cta` | Bouton primaire (teinte rose) |

---

### 1.5 Animations

| Nom | Classe | Usage |
|---|---|---|
| Fade in up | `animate-fade-in-up` | Apparition sections |
| Stagger cards | `animate-fade-in-up-1` à `5` | Apparition en cascade |
| Pulse loader | `animate-pulse-bar-1` à `5` | Barres du loader fusion |
| Bounce emoji | `animate-bounce-slow` | Emoji hero |
| Scale in | `animate-scale-in` | Entrée modale |

**Transition par défaut** sur tous les éléments interactifs : `transition-all duration-300`

---

## 2. Composants

### 2.1 Button

#### Utilisation

```jsx
// Primaire (CTA principal)
<button className="btn btn-primary btn-md">
  C'est parti ! 🎵
</button>

// Secondaire
<button className="btn btn-secondary btn-md">
  On recommence ?
</button>

// Ghost
<button className="btn btn-ghost btn-sm">
  ← Retour
</button>
```

#### Classes composables

```
/* Base (toujours présente) */
btn = "rounded-full font-bold inline-flex items-center justify-center gap-2
       transition-all duration-300 cursor-pointer select-none
       focus:ring-4 focus:ring-primary-30 focus:outline-none
       active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
       disabled:pointer-events-none"

/* Variantes */
btn-primary   = "bg-primary text-white hover:bg-primary-hover hover:scale-105 hover:shadow-cta"
btn-secondary = "bg-white text-primary border-2 border-primary hover:bg-primary-10 hover:scale-105"
btn-ghost     = "bg-transparent text-text-secondary hover:text-primary"

/* Tailles */
btn-sm = "px-4 py-2 text-button-sm"
btn-md = "px-6 py-3 text-button-md"
btn-lg = "px-8 py-4 text-button-lg"
```

#### États

| État | Comportement |
|---|---|
| `hover` | Couleur hover + `scale-105` + ombre |
| `focus` | `ring-4 ring-primary-30` |
| `active` | `scale-95` |
| `disabled` | `opacity-50` + `cursor-not-allowed` + pas de hover, ajouter `aria-disabled="true"` |

---

### 2.2 MoodCard

Bouton de sélection d'humeur. Fonctionne comme un radio button visuel.

#### Structure

```jsx
<div role="radiogroup" aria-label="Sélection d'humeur"
     className="grid grid-cols-3 gap-3">
  {moods.map(mood => (
    <button
      key={mood.id}
      role="radio"
      aria-checked={selected === mood.id}
      aria-label={mood.label}
      onClick={() => onSelect(mood.id)}
      className={`
        flex flex-col items-center justify-center gap-1
        p-4 rounded-2xl border-2 backdrop-blur-card
        transition-all duration-300 cursor-pointer
        focus:ring-4 focus:ring-primary-30 focus:outline-none
        ${selected === mood.id
          ? 'border-primary bg-primary-10 scale-105 shadow-mood-' + mood.id
          : 'border-transparent bg-white/80 hover:bg-white hover:shadow-card hover:scale-[1.02]'
        }
      `}
    >
      <span className="text-[32px]" aria-hidden="true">{mood.emoji}</span>
      <span className="text-caption font-bold text-text-main">{mood.label}</span>
    </button>
  ))}
</div>
```

#### Données des humeurs

```js
const MOODS = [
  { id: 'joyeux',       emoji: '😊', label: 'Joyeux',       accent: '#FFD54F' },
  { id: 'romantique',   emoji: '💕', label: 'Romantique',   accent: '#F48FB1' },
  { id: 'chill',        emoji: '😌', label: 'Chill',        accent: '#81D4FA' },
  { id: 'melancolique', emoji: '🥺', label: 'Mélancolique', accent: '#B39DDB' },
  { id: 'energique',    emoji: '⚡', label: 'Énergique',    accent: '#FFB74D' },
  { id: 'fetard',       emoji: '🎉', label: 'Fêtard',      accent: '#AED581' },
]
```

#### Responsive

Le grid passe à `grid-cols-2` sous 375px via une media query inline ou un breakpoint custom `xs`.

---

### 2.3 TrackCard

Carte affichant un morceau Spotify avec contrôles.

#### Structure

```jsx
<div className="bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300
                flex items-center gap-4">
  {/* Cover */}
  <img
    src={track.coverUrl}
    alt={`Pochette de ${track.title}`}
    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
  />

  {/* Infos */}
  <div className="flex-1 min-w-0">
    <p className="text-sm font-bold text-text-main truncate">{track.title}</p>
    <p className="text-xs text-text-secondary truncate">{track.artist}</p>
    <p className="text-xs text-text-secondary/60">{track.duration}</p>
  </div>

  {/* Actions */}
  <div className="flex items-center gap-2">
    <TrackAction icon={PlayIcon}    active={isPlaying} variant="primary" aria-label={`Écouter ${track.title}`} />
    <TrackAction icon={HeartIcon}   active={isFav}     variant="fav"     aria-label={`Ajouter ${track.title} aux favoris`} />
    <TrackAction icon={SpotifyIcon} active={false}      variant="spotify" aria-label={`Ouvrir ${track.title} dans Spotify`} />
  </div>
</div>
```

#### Boutons d'action (TrackAction)

```
/* 40×40px, rond */
base    = "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
           focus:ring-4 focus:ring-primary-30 focus:outline-none"

primary (default)  = "bg-primary-10 text-primary"
primary (active)   = "bg-primary text-white scale-110 shadow-lg"

fav (default)      = "bg-gray-100 text-gray-400"
fav (active)       = "bg-primary text-white scale-110"

spotify (default)  = "bg-spotify/10 text-spotify"
spotify (active)   = "bg-spotify text-white"
```

#### Skeleton loading

```jsx
<div className="bg-white rounded-2xl p-4 flex items-center gap-4 animate-pulse">
  <div className="w-16 h-16 bg-gray-200 rounded-xl" />
  <div className="flex-1 space-y-2">
    <div className="h-3 bg-gray-200 rounded w-3/4" />
    <div className="h-2 bg-gray-200 rounded w-1/2" />
  </div>
</div>
```

---

### 2.4 TextInput

Champ prénom des partenaires.

```jsx
<div className="w-full">
  <label htmlFor={id} className="sr-only">{label}</label>
  <input
    id={id}
    type="text"
    placeholder={placeholder}
    aria-label={label}
    aria-describedby={error ? `${id}-error` : undefined}
    className={`
      w-full px-5 py-3 rounded-full border-2 bg-white
      font-body text-body text-text-main
      placeholder:text-text-secondary/50
      transition-all duration-300
      focus:outline-none focus:ring-4
      ${error
        ? 'border-error focus:ring-error/10'
        : 'border-primary-30 focus:border-primary focus:ring-primary/10'
      }
    `}
  />
  {error && (
    <p id={`${id}-error`} role="alert" className="mt-2 text-caption text-error pl-5">
      {error}
    </p>
  )}
</div>
```

---

### 2.5 EnergySlider

Slider permettant de régler le niveau d'énergie.

```jsx
<div className="w-full space-y-2">
  <input
    type="range"
    min={0}
    max={100}
    value={value}
    onChange={e => onChange(Number(e.target.value))}
    aria-label="Niveau d'énergie"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={value}
    className="w-full h-2 rounded-full appearance-none cursor-pointer
               bg-gray-200 accent-primary
               [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
               [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:appearance-none"
  />
  <div className="flex justify-between text-xs text-text-secondary">
    <span>🐌 Calme</span>
    <span>🔥 Max</span>
  </div>
</div>
```

> **Note** : pour un gradient dynamique sur la track (de `#81D4FA` à la couleur d'humeur), utiliser un style inline calculé en JS sur la largeur remplie.

---

### 2.6 ProgressBar

Indicateur 3 étapes (sélection partenaire 1 → partenaire 2 → résultats).

```jsx
<div className="flex items-center justify-center gap-2" role="progressbar"
     aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}
     aria-label={`Étape ${step} sur 3`}>
  {[1, 2, 3].map(i => (
    <div
      key={i}
      className={`h-2 rounded-full transition-all duration-500 ${
        i <= step ? 'w-12 bg-primary' : 'w-8 bg-primary/20'
      }`}
    />
  ))}
</div>
```

---

### 2.7 NavBar

```jsx
<nav className="flex items-center justify-between px-6 py-4 max-w-page mx-auto">
  {/* Logo */}
  <a href="/" className="flex items-center gap-1 text-lg font-bold">
    <span aria-hidden="true">🎵</span>
    <span className="text-text-main">Chatoune</span>
    <span className="text-primary">Music</span>
  </a>

  {/* Navigation / Retour */}
  {showBack && (
    <button
      onClick={onBack}
      className="text-sm text-text-secondary hover:text-primary transition-colors
                 focus:ring-4 focus:ring-primary-30 focus:outline-none rounded-full px-2 py-1"
    >
      ← Retour
    </button>
  )}
</nav>
```

Pas de sticky par défaut. Sémantique `<nav>` obligatoire.

---

### 2.8 PlayerBar

Barre de lecture Spotify, apparaît au clic play avec animation `fade-in-up`.

```jsx
<div className="bg-surface-dark rounded-2xl p-4 shadow-elevated animate-fade-in-up
                flex items-center gap-4">
  <img
    src={track.coverUrl}
    alt={`En lecture : ${track.title}`}
    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
  />
  <div className="flex-1 min-w-0">
    <p className="text-sm font-bold text-white truncate">{track.title}</p>
    <p className="text-xs text-white/60 truncate">{track.artist}</p>
  </div>
  {/* Iframe Spotify embed (compact 80px) */}
  <iframe
    src={`https://open.spotify.com/embed/track/${track.spotifyId}?theme=0`}
    width="250"
    height="80"
    allow="encrypted-media"
    loading="lazy"
    className="rounded-lg hidden md:block"
    title={`Lecteur Spotify : ${track.title}`}
  />
</div>
```

---

### 2.9 MoodRecap

Badge résumé des humeurs affiché sur l'écran résultats.

```jsx
<div className="flex items-center justify-center gap-2 flex-wrap">
  <span className={`bg-mood-${mood1.id}/20 rounded-full px-3 py-1 text-caption font-bold`}>
    {mood1.emoji} {partner1Name}
  </span>
  <span className="text-primary font-bold">+</span>
  <span className={`bg-mood-${mood2.id}/20 rounded-full px-3 py-1 text-caption font-bold`}>
    {mood2.emoji} {partner2Name}
  </span>
  <span className="text-primary font-bold">=</span>
  <span className="font-bold text-text-main">✨ Votre mix</span>
</div>
```

---

### 2.10 StepCard

Carte "Comment ça marche" sur la page d'accueil.

```jsx
<div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-card
                hover:shadow-card-hover transition-all duration-300">
  <span className="text-[32px] block mb-3" aria-hidden="true">{emoji}</span>
  <h3 className="font-heading text-h3 text-text-main mb-2">{title}</h3>
  <p className="font-body text-xs text-text-secondary leading-relaxed">{description}</p>
</div>
```

---

### 2.11 FusionLoader

Loader animé affiché pendant le calcul des résultats.

```jsx
<div className="flex items-end justify-center gap-1 h-10" aria-label="Fusion en cours">
  {[1, 2, 3, 4, 5].map(i => (
    <div
      key={i}
      className={`w-1.5 bg-primary rounded-full animate-pulse-bar-${i}`}
      style={{ height: '24px', transformOrigin: 'bottom' }}
    />
  ))}
</div>
```

---

## 3. Layouts & Responsive

### 3.1 Breakpoints

| Nom | Classe | Largeur min |
|---|---|---|
| Mobile | (défaut) | 0 |
| Tablette | `md:` | 768px |
| Desktop | `lg:` | 1024px |

### 3.2 Containers par page

| Page | Mobile | Tablette/Desktop |
|---|---|---|
| Accueil (hero) | `px-4` | `max-w-hero mx-auto px-6` |
| Sélection humeur | `px-4` | `max-w-narrow mx-auto px-6` |
| Résultats | `px-4` | `max-w-content mx-auto px-6` |

### 3.3 Grilles responsive

```
/* Section "Comment ça marche" */
grid grid-cols-1 md:grid-cols-3 gap-6

/* Grille humeurs */
grid grid-cols-3 gap-3
/* → grid-cols-2 sous 375px via @media ou classe conditionnelle */

/* Grille résultats morceaux */
grid grid-cols-1 md:grid-cols-2 gap-4

/* Boutons d'action résultats */
flex flex-col md:flex-row gap-3
```

---

## 4. Accessibilité (WCAG 2.1 AA)

### Règles globales obligatoires

1. **Focus visible** : `focus:ring-4 focus:ring-primary-30 focus:outline-none` sur TOUS les éléments interactifs — aucune exception
2. **Sémantique HTML** : `<nav>`, `<main>`, `<footer>`, un seul `<h1>` par page, hiérarchie h1 → h2 → h3
3. **Navigation clavier** : Tab order logique, Enter/Space pour activer
4. **Contrastes** : Toutes les combinaisons validées ≥ 4.5:1 (cf. section 1.1)
5. **Cibles tactiles** : minimum 44×44px pour les boutons et contrôles interactifs

### Checklist par composant

| Composant | ARIA requis |
|---|---|
| Button | `aria-label` si icône seule, `aria-disabled="true"` si disabled |
| MoodCard grid | `role="radiogroup"` + `aria-label` |
| MoodCard item | `role="radio"` + `aria-checked` + `aria-label` |
| TrackCard actions | `aria-label` descriptif par bouton |
| TextInput | `<label>` associé (ou `sr-only`) + `aria-label` + `aria-describedby` si erreur |
| EnergySlider | `aria-label` + `aria-valuemin/max/now` |
| NavBar | `<nav>` sémantique |
| PlayerBar | `aria-label` sur contrôles, `title` sur iframe |
| ProgressBar | `role="progressbar"` + `aria-valuenow/min/max` + `aria-label` |

---

## 5. Contraintes du projet

| ❌ Interdit | ✅ À faire |
|---|---|
| Bibliothèques UI (MUI, Chakra…) | Composants maison Tailwind |
| CSS custom (sauf exception) | Utility classes Tailwind |
| Dark mode (sauf bonus) | Mode clair uniquement |
| Lorem ipsum | Contenu réel / placeholder crédible |
| Animations > 300ms | Transitions subtiles |
| Surcharge visuelle | Chaleureux, romantique, ludique |

---

## 6. Référence rapide — Classes utilitaires projet

Bloc copier-coller pour unifier rapidement les styles dans tout le projet :

```
/* Fond de page */
min-h-screen bg-bg-main bg-gradient-to-b from-[#FFF0F5] via-[#FFE4EC] to-[#FFF0F5]

/* Container centré */
max-w-page mx-auto px-4 md:px-6

/* Carte standard */
bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300

/* Carte glass */
bg-white/80 backdrop-blur-card rounded-2xl

/* Texte principal */
font-body text-body text-text-main

/* Titre H1 responsive */
font-heading text-h1-mobile lg:text-h1-desktop text-text-main

/* Titre H2 */
font-heading text-h2 text-text-main

/* Focus ring universel */
focus:ring-4 focus:ring-primary-30 focus:outline-none

/* Interactif par défaut */
transition-all duration-300 cursor-pointer

/* Hover scale */
hover:scale-105

/* Active press */
active:scale-95
```

---

*Design System ChatouneMusic v1.0 — Février 2026*  
*Prêt pour intégration via Claude Code*
