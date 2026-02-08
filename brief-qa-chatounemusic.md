# Brief Agent QA — ChatouneMusic

> Ce document couvre la stratégie de test complète pour ChatouneMusic.
> 3 volets : qualité du contenu, performances, accessibilité (WCAG 2.1 AA).
> Inclut les parcours manuels, les cas limites, et les tests unitaires Vitest.

---

## 🎯 Contexte

**ChatouneMusic** : app Next.js (App Router) qui propose des morceaux musicaux adaptés à l'humeur d'un couple.

### Stack technique
- Next.js 16.1.6, TypeScript, Tailwind CSS v3.4
- Pas de backend, pas de BDD, pas d'API externe
- Base locale ~150+ titres (`track-database.ts`)
- Stockage client : localStorage
- Modules critiques : `fusion.ts`, `track-engine.ts`, `favorites.ts`

### Parcours utilisateur de référence
```
Accueil → Sélection humeur P1 → Sélection humeur P2 → Fusion → Résultats → Détail morceau → Récap / Favoris
```

---

## VOLET 1 — Qualité du contenu

### 1.1 Vérification orthographique et typographique

| Vérification | Critère |
|---|---|
| Fautes d'orthographe | Zéro faute sur tous les textes visibles |
| Typographie française | Espaces insécables avant `:`, `!`, `?`, `»` et après `«` |
| Cohérence des majuscules | Titres de pages et CTA uniformes (ex : "Découvrir" partout, pas "découvrir" ailleurs) |
| Apostrophes | Apostrophes typographiques (`'`) et non droites (`'`) |
| Pluriels et accords | Vérifier les textes dynamiques ("1 morceau trouvé" vs "3 morceaux trouvés") |

### 1.2 Cohérence du contenu

- [ ] Tous les textes de l'interface sont en français (pas de mélange FR/EN sauf noms de morceaux)
- [ ] Les labels des humeurs sont cohérents entre la sélection et le récap
- [ ] Le texte de la page d'accueil explique clairement le concept
- [ ] Les CTA sont explicites et orientés action ("Trouver notre musique", pas "Soumettre")
- [ ] Le footer contient les mentions nécessaires (crédit, version)
- [ ] Les messages d'état vide sont présents et utiles ("Aucun favori pour le moment")

### 1.3 Liens et navigation

- [ ] Aucun lien cassé (404) dans l'application
- [ ] Tous les boutons de retour ramènent à la bonne étape
- [ ] Le logo / titre ramène à l'accueil
- [ ] Aucun lien externe ne s'ouvre sans `target="_blank"` + `rel="noopener noreferrer"`
- [ ] Le parcours est linéaire et sans impasse (on peut toujours avancer ou revenir)

### 1.4 Base de données musicale (`track-database.ts`)

- [ ] Aucun doublon de morceau (même artiste + même titre)
- [ ] Tous les morceaux ont les champs obligatoires remplis (titre, artiste, genre, tags d'humeur)
- [ ] Les tags d'humeur utilisent le vocabulaire défini (pas de synonymes non mappés)
- [ ] Aucun champ vide ou `undefined` dans les objets Track
- [ ] Les genres sont cohérents avec la liste définie dans le Design System

---

## VOLET 2 — Performances

### 2.1 Audit Lighthouse (en production)

| Métrique | Objectif | Seuil d'alerte |
|---|---|---|
| Performance | > 90 | < 80 |
| Accessibilité | > 90 | < 85 |
| Bonnes pratiques | > 90 | < 85 |
| SEO | > 90 | < 85 |

### 2.2 Core Web Vitals

| Métrique | Objectif | Maximum acceptable |
|---|---|---|
| LCP (Largest Contentful Paint) | < 1.5s | < 2.5s |
| FID (First Input Delay) | < 50ms | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.05 | < 0.1 |
| FCP (First Contentful Paint) | < 1.0s | < 1.5s |
| TTFB (Time to First Byte) | < 200ms | < 600ms |

### 2.3 Bundle et assets

- [ ] `npm run build` passe sans erreur ni warning
- [ ] Taille totale du bundle JS < 200 Ko (gzippé)
- [ ] Pas de dépendance inutilisée dans `package.json` (`npx depcheck`)
- [ ] Pas de code mort détectable (`// TODO`, `console.log`, fonctions non appelées)
- [ ] Images en WebP ou format optimisé, avec lazy loading sur les non-critiques
- [ ] Fonts préchargées (`preload`) avec `font-display: swap`

### 2.4 Console navigateur

- [ ] Aucun `console.log` en production
- [ ] Aucun `console.warn` ni `console.error`
- [ ] Aucune erreur réseau (404, CORS, etc.)
- [ ] Pas de deprecation warning React/Next.js

### 2.5 localStorage

- [ ] Les favoris persistent après rechargement de la page
- [ ] Les favoris persistent après fermeture/réouverture du navigateur
- [ ] L'app fonctionne normalement si localStorage est vide
- [ ] L'app fonctionne normalement si localStorage est désactivé (mode privé sur certains navigateurs)
- [ ] Pas de fuite mémoire : les données obsolètes sont nettoyées

---

## VOLET 3 — Accessibilité (WCAG 2.1 AA)

### 3.1 Structure sémantique

- [ ] Un seul `<h1>` par page
- [ ] Hiérarchie des headings respectée (h1 → h2 → h3, pas de saut)
- [ ] Utilisation correcte des landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`)
- [ ] Les listes utilisent `<ul>`/`<ol>` + `<li>` (pas de `<div>` stylés en liste)
- [ ] Les boutons sont des `<button>`, les liens sont des `<a>` (pas l'inverse)

### 3.2 Navigation clavier

| Élément | Comportement attendu |
|---|---|
| Tous les éléments interactifs | Focusables avec `Tab` dans l'ordre logique |
| Boutons et liens | Activables avec `Enter` |
| Sélection d'humeur | Navigable avec les flèches si groupe de choix |
| Modale (si présente) | Focus trap, fermeture avec `Escape`, retour du focus |
| Menu mobile (si hamburger) | Ouverture/fermeture clavier, focus trap |
| Skip to content | Lien d'évitement présent et fonctionnel |

### 3.3 Contrastes et lisibilité

- [ ] Ratio de contraste texte/fond ≥ 4.5:1 (texte normal)
- [ ] Ratio de contraste texte/fond ≥ 3:1 (texte large, > 18px bold ou > 24px)
- [ ] Ratio de contraste ≥ 3:1 pour les éléments UI non textuels (icônes, bordures, focus ring)
- [ ] Vérifier sur les fonds colorés/gradients (les écrans d'humeur notamment)
- [ ] Tester avec un simulateur de daltonisme (deutéranopie, protanopie)

### 3.4 Attributs ARIA et rôles

- [ ] Toutes les images ont un `alt` descriptif (ou `alt=""` si décoratif)
- [ ] Les icônes interactives ont un `aria-label` ou texte accessible
- [ ] Les états dynamiques utilisent `aria-live` pour les annonces (résultats de fusion)
- [ ] Les boutons de sélection d'humeur utilisent `aria-pressed` ou `role="radio"`
- [ ] Les messages d'erreur sont liés aux champs via `aria-describedby`
- [ ] Les zones qui changent dynamiquement ont `aria-live="polite"`

### 3.5 Cibles tactiles

- [ ] Toutes les cibles interactives ≥ 44×44px sur mobile
- [ ] Espacement suffisant entre les cibles (pas de clics accidentels)
- [ ] Les cartes de morceaux sont entièrement cliquables (pas juste le titre)

### 3.6 Tests avec outils

| Outil | Usage |
|---|---|
| axe DevTools (extension) | Audit automatisé de chaque page |
| WAVE | Vérification visuelle des problèmes |
| Lighthouse Accessibility | Score cible > 90 |
| Navigateur avec CSS désactivé | L'information reste compréhensible |
| VoiceOver (macOS/iOS) ou NVDA (Windows) | Test lecteur d'écran sur le parcours complet |

---

## 🧪 Parcours à tester manuellement

### Parcours 1 — Parcours complet nominal

```
1. Ouvrir l'accueil
2. Cliquer sur le CTA principal
3. Sélectionner une humeur pour la personne 1 (ex : "Joyeux")
4. Valider et passer à la personne 2
5. Sélectionner une humeur pour la personne 2 (ex : "Mélancolique")
6. Lancer la fusion
7. Vérifier que les résultats s'affichent (morceaux cohérents avec les humeurs)
8. Cliquer sur un morceau pour voir le détail
9. Ajouter le morceau aux favoris
10. Aller sur la page récap / favoris
11. Vérifier que le morceau ajouté apparaît
```

**Résultat attendu** : parcours fluide, aucune erreur console, résultats pertinents.

### Parcours 2 — Même humeur pour les deux

```
1. Sélectionner "Énergique" pour P1
2. Sélectionner "Énergique" pour P2
3. Lancer la fusion
```

**Résultat attendu** : résultats cohérents (pas de bug si les humeurs sont identiques). Le moteur de fusion ne doit pas planter ni retourner un tableau vide.

### Parcours 3 — Humeurs opposées

```
1. Sélectionner "Triste" pour P1
2. Sélectionner "Joyeux" pour P2
3. Lancer la fusion
```

**Résultat attendu** : le moteur propose des morceaux "entre les deux" ou un mix équilibré. Pas de résultat vide.

### Parcours 4 — Gestion des favoris

```
1. Ajouter 3 morceaux aux favoris
2. Recharger la page
3. Vérifier que les 3 favoris sont toujours là
4. Retirer un favori
5. Recharger la page
6. Vérifier qu'il n'y a plus que 2 favoris
```

**Résultat attendu** : persistance localStorage fiable.

### Parcours 5 — Navigation arrière

```
1. Avancer jusqu'à l'écran de résultats
2. Utiliser le bouton retour du navigateur
3. Vérifier qu'on revient à l'étape précédente (pas à l'accueil)
4. Vérifier que les sélections sont conservées
```

**Résultat attendu** : la navigation arrière respecte l'historique du parcours.

### Parcours 6 — Accès direct par URL

```
1. Copier l'URL de la page de résultats
2. Ouvrir dans un nouvel onglet
```

**Résultat attendu** : soit la page affiche les résultats (si l'état est dans l'URL), soit elle redirige proprement vers l'accueil (pas d'écran blanc ni d'erreur).

### Parcours 7 — Mobile complet

```
1. Ouvrir le site sur un vrai téléphone (pas juste DevTools)
2. Effectuer le parcours complet
3. Vérifier le menu mobile (hamburger si applicable)
4. Vérifier les tailles de texte et cibles tactiles
5. Tester en orientation paysage
```

**Résultat attendu** : expérience fluide, aucun contenu coupé, aucun scroll horizontal.

---

## 🔥 Cas limites (edge cases)

### Interface

| Cas | Comportement attendu |
|---|---|
| Rechargement en milieu de parcours (F5) | Retour à l'accueil OU reprise de l'étape en cours, sans crash |
| Double-clic rapide sur un CTA | Une seule action déclenchée (pas de double navigation) |
| Clic sur "Favoris" quand la liste est vide | Message explicite ("Aucun favori pour le moment"), pas d'écran blanc |
| Ouverture sur un très petit écran (320px) | Tout reste lisible, pas de débordement horizontal |
| Ouverture sur un très grand écran (2560px) | Le contenu reste centré et lisible, pas étiré sur toute la largeur |
| JavaScript désactivé | Message de fallback ou contenu statique visible |

### Données

| Cas | Comportement attendu |
|---|---|
| localStorage plein | L'app gère l'erreur gracieusement (try/catch), message utilisateur si l'ajout échoue |
| localStorage corrompu (JSON invalide) | L'app reset les favoris proprement au lieu de crasher |
| Base de morceaux sans résultat pour une combinaison d'humeurs | Message explicite ("Aucun morceau trouvé pour cette combinaison"), suggestion de réessayer |
| Un morceau favori est supprimé de la base | Le favori orphelin est géré (filtré ou nettoyé), pas de crash |

### Performance

| Cas | Comportement attendu |
|---|---|
| Connexion lente (3G) | Le site charge en < 5s, contenu visible progressivement |
| Mode hors-ligne après premier chargement | Comportement acceptable grâce au cache navigateur (pas de Service Worker requis mais pas de crash) |

---

## 🧪 Tests unitaires — Vitest

### Configuration requise

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      include: ['src/lib/**'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
})
```

```typescript
// tests/setup.ts
import '@testing-library/jest-dom'
```

---

### Tests pour `fusion.ts`

Le module de fusion combine les humeurs de deux personnes pour produire un profil musical commun.

```typescript
// tests/fusion.test.ts
import { describe, it, expect } from 'vitest'
import { fusionMoods, type MoodSelection } from '@/lib/fusion'

describe('fusionMoods', () => {
  // --- Cas nominaux ---

  it('fusionne deux humeurs différentes et retourne un profil valide', () => {
    const mood1: MoodSelection = { mood: 'joyeux', intensity: 0.8 }
    const mood2: MoodSelection = { mood: 'mélancolique', intensity: 0.6 }
    const result = fusionMoods(mood1, mood2)

    expect(result).toBeDefined()
    expect(result.tags).toBeInstanceOf(Array)
    expect(result.tags.length).toBeGreaterThan(0)
  })

  it('fusionne deux humeurs identiques', () => {
    const mood1: MoodSelection = { mood: 'énergique', intensity: 0.9 }
    const mood2: MoodSelection = { mood: 'énergique', intensity: 0.7 }
    const result = fusionMoods(mood1, mood2)

    expect(result).toBeDefined()
    expect(result.tags.length).toBeGreaterThan(0)
    // Les tags devraient refléter fortement l'humeur commune
  })

  it('produit un résultat symétrique (P1/P2 interchangeables)', () => {
    const mood1: MoodSelection = { mood: 'joyeux', intensity: 0.8 }
    const mood2: MoodSelection = { mood: 'triste', intensity: 0.5 }

    const resultA = fusionMoods(mood1, mood2)
    const resultB = fusionMoods(mood2, mood1)

    expect(resultA.tags.sort()).toEqual(resultB.tags.sort())
  })

  // --- Cas limites ---

  it('gère des intensités à 0', () => {
    const mood1: MoodSelection = { mood: 'calme', intensity: 0 }
    const mood2: MoodSelection = { mood: 'joyeux', intensity: 0.5 }
    const result = fusionMoods(mood1, mood2)

    expect(result).toBeDefined()
    expect(result.tags.length).toBeGreaterThan(0)
  })

  it('gère des intensités au maximum (1.0)', () => {
    const mood1: MoodSelection = { mood: 'énergique', intensity: 1.0 }
    const mood2: MoodSelection = { mood: 'énergique', intensity: 1.0 }
    const result = fusionMoods(mood1, mood2)

    expect(result).toBeDefined()
  })

  it('ne retourne jamais un tableau de tags vide', () => {
    const moods = ['joyeux', 'triste', 'énergique', 'calme', 'mélancolique', 'romantique']

    for (const m1 of moods) {
      for (const m2 of moods) {
        const result = fusionMoods(
          { mood: m1, intensity: 0.5 },
          { mood: m2, intensity: 0.5 }
        )
        expect(result.tags.length, `Fusion ${m1} + ${m2} retourne un tableau vide`).toBeGreaterThan(0)
      }
    }
  })
})
```

---

### Tests pour `track-engine.ts`

Le moteur de recherche filtre la base de morceaux en fonction du profil de fusion.

```typescript
// tests/track-engine.test.ts
import { describe, it, expect } from 'vitest'
import { searchTracks, type FusionProfile } from '@/lib/track-engine'
import { tracks } from '@/data/track-database'

describe('searchTracks', () => {
  // --- Cas nominaux ---

  it('retourne des morceaux correspondant au profil de fusion', () => {
    const profile: FusionProfile = {
      tags: ['joyeux', 'dansant'],
      energy: 0.8,
    }
    const results = searchTracks(profile)

    expect(results).toBeInstanceOf(Array)
    expect(results.length).toBeGreaterThan(0)
  })

  it('retourne des morceaux avec les champs obligatoires', () => {
    const profile: FusionProfile = {
      tags: ['calme'],
      energy: 0.3,
    }
    const results = searchTracks(profile)

    results.forEach((track) => {
      expect(track).toHaveProperty('id')
      expect(track).toHaveProperty('title')
      expect(track).toHaveProperty('artist')
      expect(track).toHaveProperty('genre')
      expect(track.title).toBeTruthy()
      expect(track.artist).toBeTruthy()
    })
  })

  it('ne retourne pas de doublons', () => {
    const profile: FusionProfile = {
      tags: ['énergique', 'joyeux'],
      energy: 0.9,
    }
    const results = searchTracks(profile)
    const ids = results.map((t) => t.id)
    const uniqueIds = new Set(ids)

    expect(ids.length).toBe(uniqueIds.size)
  })

  it('retourne les résultats triés par pertinence (score décroissant)', () => {
    const profile: FusionProfile = {
      tags: ['romantique', 'doux'],
      energy: 0.4,
    }
    const results = searchTracks(profile)

    if (results.length > 1 && results[0].score !== undefined) {
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score!)
      }
    }
  })

  // --- Cas limites ---

  it('retourne un tableau vide (pas un crash) si aucun morceau ne correspond', () => {
    const profile: FusionProfile = {
      tags: ['tag_inexistant_xyz'],
      energy: 0.5,
    }
    const results = searchTracks(profile)

    expect(results).toBeInstanceOf(Array)
    // Peut être vide, mais ne doit pas crasher
  })

  it('gère un profil avec un tableau de tags vide', () => {
    const profile: FusionProfile = {
      tags: [],
      energy: 0.5,
    }
    const results = searchTracks(profile)

    expect(results).toBeInstanceOf(Array)
    // Devrait retourner un fallback ou un tableau vide, mais pas crasher
  })

  it('gère une énergie à 0', () => {
    const profile: FusionProfile = { tags: ['calme'], energy: 0 }
    expect(() => searchTracks(profile)).not.toThrow()
  })

  it('gère une énergie à 1', () => {
    const profile: FusionProfile = { tags: ['énergique'], energy: 1 }
    expect(() => searchTracks(profile)).not.toThrow()
  })

  // --- Intégrité de la base ---

  it('vérifie que la base contient au moins 100 morceaux', () => {
    expect(tracks.length).toBeGreaterThanOrEqual(100)
  })

  it('vérifie que chaque morceau de la base a un ID unique', () => {
    const ids = tracks.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('vérifie que chaque morceau a des tags d\'humeur', () => {
    tracks.forEach((track) => {
      expect(
        track.moodTags?.length,
        `Le morceau "${track.title}" par ${track.artist} n'a pas de tags d'humeur`
      ).toBeGreaterThan(0)
    })
  })
})
```

---

### Tests pour `favorites.ts`

Le module gère l'ajout, la suppression et la persistance des favoris via localStorage.

```typescript
// tests/favorites.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  isFavorite,
  clearFavorites,
} from '@/lib/favorites'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
    get length() { return Object.keys(store).length },
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

describe('favorites', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  // --- Ajout ---

  it('ajoute un morceau aux favoris', () => {
    addFavorite('track-1')
    const favs = getFavorites()

    expect(favs).toContain('track-1')
  })

  it('n\'ajoute pas de doublon', () => {
    addFavorite('track-1')
    addFavorite('track-1')
    const favs = getFavorites()

    expect(favs.filter((f) => f === 'track-1').length).toBe(1)
  })

  it('peut ajouter plusieurs morceaux différents', () => {
    addFavorite('track-1')
    addFavorite('track-2')
    addFavorite('track-3')
    const favs = getFavorites()

    expect(favs).toHaveLength(3)
    expect(favs).toContain('track-1')
    expect(favs).toContain('track-2')
    expect(favs).toContain('track-3')
  })

  // --- Suppression ---

  it('supprime un morceau des favoris', () => {
    addFavorite('track-1')
    addFavorite('track-2')
    removeFavorite('track-1')
    const favs = getFavorites()

    expect(favs).not.toContain('track-1')
    expect(favs).toContain('track-2')
  })

  it('ne crashe pas si on supprime un favori inexistant', () => {
    expect(() => removeFavorite('track-999')).not.toThrow()
  })

  // --- Vérification ---

  it('vérifie qu\'un morceau est en favori', () => {
    addFavorite('track-1')

    expect(isFavorite('track-1')).toBe(true)
    expect(isFavorite('track-2')).toBe(false)
  })

  // --- Nettoyage ---

  it('vide tous les favoris', () => {
    addFavorite('track-1')
    addFavorite('track-2')
    clearFavorites()

    expect(getFavorites()).toHaveLength(0)
  })

  // --- Persistance ---

  it('persiste les favoris dans localStorage', () => {
    addFavorite('track-1')

    expect(localStorageMock.setItem).toHaveBeenCalled()
    const storedValue = localStorageMock.getItem('chatounemusic-favorites')
    expect(storedValue).toBeTruthy()

    const parsed = JSON.parse(storedValue!)
    expect(parsed).toContain('track-1')
  })

  it('restaure les favoris depuis localStorage', () => {
    // Simule un état pré-existant
    localStorageMock.setItem(
      'chatounemusic-favorites',
      JSON.stringify(['track-5', 'track-10'])
    )
    const favs = getFavorites()

    expect(favs).toContain('track-5')
    expect(favs).toContain('track-10')
  })

  // --- Cas limites ---

  it('gère un localStorage corrompu (JSON invalide)', () => {
    localStorageMock.setItem('chatounemusic-favorites', 'not-valid-json{{{')

    expect(() => getFavorites()).not.toThrow()
    const favs = getFavorites()
    expect(favs).toBeInstanceOf(Array)
    expect(favs).toHaveLength(0) // Reset propre
  })

  it('gère un localStorage avec un type inattendu (objet au lieu de tableau)', () => {
    localStorageMock.setItem(
      'chatounemusic-favorites',
      JSON.stringify({ foo: 'bar' })
    )

    expect(() => getFavorites()).not.toThrow()
    const favs = getFavorites()
    expect(favs).toBeInstanceOf(Array)
  })

  it('gère localStorage indisponible', () => {
    const originalGetItem = localStorageMock.getItem
    localStorageMock.getItem = vi.fn(() => { throw new Error('localStorage disabled') })

    expect(() => getFavorites()).not.toThrow()

    localStorageMock.getItem = originalGetItem
  })

  it('gère un localStorage plein (QuotaExceededError)', () => {
    localStorageMock.setItem = vi.fn(() => {
      throw new DOMException('QuotaExceededError', 'QuotaExceededError')
    })

    expect(() => addFavorite('track-1')).not.toThrow()
  })
})
```

---

## 📋 Script npm recommandé

Ajouter dans `package.json` :

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

---

## ✅ Critères de validation QA

Le projet passe la QA si **toutes** les conditions suivantes sont remplies :

### Bloquants (must fix avant déploiement)
- [ ] Zéro erreur console en production
- [ ] Parcours complet fonctionnel sur desktop et mobile
- [ ] Tous les tests unitaires passent (`npm run test`)
- [ ] Lighthouse Performance > 80
- [ ] Lighthouse Accessibility > 85
- [ ] Aucun lien cassé
- [ ] Navigation clavier fonctionnelle sur le parcours complet
- [ ] Favoris persistent correctement

### Non-bloquants (à corriger mais n'empêchent pas le déploiement)
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Typographie française parfaite (espaces insécables)
- [ ] Tous les tests de cas limites passent
- [ ] Test VoiceOver / NVDA validé
- [ ] Coverage > 80% sur les modules critiques

---

## 📝 Rapport QA — Template

À remplir par l'Agent QA après exécution :

```
## Rapport QA — ChatouneMusic
Date : ____
Testeur : Agent QA
Environnement : [navigateur, OS, résolution]

### Résultats Lighthouse
- Performance : __/100
- Accessibilité : __/100
- Bonnes pratiques : __/100
- SEO : __/100

### Tests unitaires
- Total : __
- Passés : __
- Échoués : __
- Coverage : __%

### Parcours manuels
- Parcours 1 (nominal) : ✅/❌
- Parcours 2 (même humeur) : ✅/❌
- Parcours 3 (humeurs opposées) : ✅/❌
- Parcours 4 (favoris) : ✅/❌
- Parcours 5 (navigation arrière) : ✅/❌
- Parcours 6 (accès direct URL) : ✅/❌
- Parcours 7 (mobile réel) : ✅/❌

### Bugs trouvés
| # | Sévérité | Description | Bloquant ? |
|---|---|---|---|
| 1 | ... | ... | Oui/Non |

### Verdict
[ ] ✅ Prêt pour déploiement
[ ] ⚠️ Prêt avec réserves (bugs non-bloquants listés)
[ ] ❌ Non prêt (bugs bloquants à corriger)
```

---

*Ce brief QA est à exécuter AVANT le brief DevOps. Le déploiement ne commence qu'après verdict QA positif.*
