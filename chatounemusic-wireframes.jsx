import { useState } from "react";

const COLORS = {
  primary: "#E91E63",
  primaryHover: "#C2185B",
  bgMain: "#FFF0F5",
  textMain: "#1A1A2E",
  textSecondary: "#666666",
  card: "#FFFFFF",
  gold: "#FFD700",
  success: "#4CAF50",
  error: "#F44336",
};

const MOODS = [
  { emoji: "😊", label: "Joyeux", color: "#FFD54F" },
  { emoji: "💕", label: "Romantique", color: "#F48FB1" },
  { emoji: "😌", label: "Chill", color: "#81D4FA" },
  { emoji: "🥺", label: "Mélancolique", color: "#B39DDB" },
  { emoji: "⚡", label: "Énergique", color: "#FFB74D" },
  { emoji: "🎉", label: "Fêtard", color: "#AED581" },
];

const MOCK_TRACKS = [
  { title: "Golden Hour", artist: "JVKE", duration: "3:29", cover: "🌅" },
  { title: "Levitating", artist: "Dua Lipa", duration: "3:23", cover: "✨" },
  { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", cover: "🌃" },
  { title: "Heat Waves", artist: "Glass Animals", duration: "3:58", cover: "🌊" },
  { title: "As It Was", artist: "Harry Styles", duration: "2:47", cover: "💫" },
  { title: "Flowers", artist: "Miley Cyrus", duration: "3:20", cover: "🌸" },
];

// ─── SHARED COMPONENTS ───
function Btn({ children, variant = "primary", size = "lg", onClick, className = "", disabled = false }) {
  const base = "font-bold rounded-full transition-all duration-300 cursor-pointer select-none inline-flex items-center justify-center gap-2";
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };
  const variants = {
    primary: `bg-[#E91E63] text-white shadow-lg hover:bg-[#C2185B] hover:shadow-xl hover:scale-105 active:scale-95 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
    secondary: "bg-white text-[#E91E63] border-2 border-[#E91E63] hover:bg-[#FFF0F5] hover:scale-105 active:scale-95",
    ghost: "bg-transparent text-[#666] hover:text-[#E91E63] hover:bg-white/60",
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

function SpecBox({ title, children }) {
  return (
    <div className="mt-4 bg-[#1A1A2E] text-white rounded-2xl p-5 text-sm font-mono leading-relaxed">
      <div className="text-[#E91E63] font-bold mb-2 text-xs uppercase tracking-widest">{title}</div>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return <div className="text-xs font-bold uppercase tracking-widest text-[#E91E63] mb-2 mt-8">{children}</div>;
}

// ─── SCREEN 1 : ACCUEIL ───
function ScreenAccueil({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #FFF0F5 0%, #FFE4EC 50%, #FFF0F5 100%)" }}>
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎵</span>
          <span className="font-bold text-xl text-[#1A1A2E]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Chatoune<span className="text-[#E91E63]">Music</span>
          </span>
        </div>
        <div className="flex gap-4 text-sm text-[#666]">
          <button className="hover:text-[#E91E63] transition-colors cursor-pointer">Favoris ❤️</button>
          <button className="hover:text-[#E91E63] transition-colors cursor-pointer">À propos</button>
        </div>
      </nav>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto">
        <div className="text-6xl mb-6 animate-bounce" style={{ animationDuration: "2s" }}>🎶💑🎶</div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4 leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
          Trouvez <span className="text-[#E91E63]">votre son</span> à deux
        </h1>
        <p className="text-lg text-[#666] mb-8 max-w-md leading-relaxed">
          Chacun choisit son humeur, on trouve les morceaux Spotify qui matchent votre vibe de couple.
        </p>
        <Btn onClick={() => onNavigate("mood")}>C'est parti ! 🎵</Btn>

        {/* HOW IT WORKS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
          {[
            { icon: "🎭", title: "1. Choisis ton humeur", desc: "Chaque partenaire sélectionne son mood du moment" },
            { icon: "🔀", title: "2. On mixe tout", desc: "L'app fusionne vos deux humeurs en un cocktail unique" },
            { icon: "🎧", title: "3. Écoutez ensemble", desc: "Découvrez des morceaux Spotify faits pour vous deux" },
          ].map((step, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="font-bold text-[#1A1A2E] mb-1 text-sm">{step.title}</h3>
              <p className="text-xs text-[#666] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 text-xs text-[#666]">
        Fait avec ❤️ pour Chatoune & son amour · 2026
      </footer>
    </div>
  );
}

// ─── SCREEN 2 : SÉLECTION HUMEUR ───
function ScreenMood({ onNavigate }) {
  const [step, setStep] = useState(1); // 1 = P1, 2 = P2, 3 = ready
  const [p1, setP1] = useState({ name: "", mood: null });
  const [p2, setP2] = useState({ name: "", mood: null });
  const [energy, setEnergy] = useState(50);

  const current = step === 1 ? p1 : p2;
  const setCurrent = step === 1 ? setP1 : setP2;

  const handleMoodSelect = (mood) => {
    setCurrent({ ...current, mood });
  };

  const handleNext = () => {
    if (step === 1 && p1.name && p1.mood !== null) setStep(2);
    if (step === 2 && p2.name && p2.mood !== null) setStep(3);
  };

  const selectedMood = (idx) => current.mood === idx;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #FFF0F5 0%, #FFE4EC 100%)" }}>
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
        <button onClick={() => step > 1 ? setStep(step - 1) : onNavigate("home")} className="text-[#666] hover:text-[#E91E63] transition-colors cursor-pointer flex items-center gap-1">
          ← Retour
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg">🎵</span>
          <span className="font-bold text-[#1A1A2E]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Chatoune<span className="text-[#E91E63]">Music</span>
          </span>
        </div>
        <div className="w-16" />
      </nav>

      {/* PROGRESS */}
      <div className="flex items-center justify-center gap-2 mt-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-2 rounded-full transition-all duration-500 ${s <= step ? "bg-[#E91E63] w-12" : "bg-[#E91E63]/20 w-8"}`} />
        ))}
      </div>

      {step < 3 ? (
        <main className="flex-1 flex flex-col items-center px-6 max-w-lg mx-auto w-full">
          {/* STEP INDICATOR */}
          <div className="bg-white/80 backdrop-blur rounded-full px-4 py-2 text-sm font-bold text-[#E91E63] mb-6 shadow-sm">
            Partenaire {step} sur 2
          </div>

          {/* NAME INPUT */}
          <label className="w-full mb-6">
            <span className="block text-sm font-bold text-[#1A1A2E] mb-2">Ton prénom</span>
            <input
              type="text"
              value={current.name}
              onChange={(e) => setCurrent({ ...current, name: e.target.value })}
              placeholder={step === 1 ? "Ex : Sarah" : "Ex : Thomas"}
              className="w-full px-5 py-3 rounded-full border-2 border-[#E91E63]/30 bg-white text-[#1A1A2E] text-base placeholder:text-[#666]/50 focus:outline-none focus:border-[#E91E63] focus:ring-4 focus:ring-[#E91E63]/10 transition-all"
              aria-label={`Prénom du partenaire ${step}`}
            />
          </label>

          {/* MOOD GRID */}
          <p className="text-sm font-bold text-[#1A1A2E] mb-3 self-start">Comment tu te sens ?</p>
          <div className="grid grid-cols-3 gap-3 w-full mb-6" role="radiogroup" aria-label="Sélection d'humeur">
            {MOODS.map((mood, i) => (
              <button
                key={i}
                role="radio"
                aria-checked={selectedMood(i)}
                aria-label={mood.label}
                onClick={() => handleMoodSelect(i)}
                className={`
                  flex flex-col items-center gap-1 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                  ${selectedMood(i)
                    ? "border-[#E91E63] bg-[#E91E63]/10 scale-105 shadow-lg"
                    : "border-transparent bg-white/80 hover:bg-white hover:shadow-md hover:scale-102"
                  }
                `}
                style={selectedMood(i) ? { boxShadow: `0 4px 20px ${mood.color}40` } : {}}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className={`text-xs font-bold ${selectedMood(i) ? "text-[#E91E63]" : "text-[#1A1A2E]"}`}>{mood.label}</span>
              </button>
            ))}
          </div>

          {/* ENERGY SLIDER */}
          <label className="w-full mb-8">
            <span className="block text-sm font-bold text-[#1A1A2E] mb-2">Niveau d'énergie</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#666]">🐌 Calme</span>
              <input
                type="range"
                min="0"
                max="100"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #81D4FA ${energy}%, #e0e0e0 ${energy}%)` }}
                aria-label="Niveau d'énergie"
              />
              <span className="text-xs text-[#666]">🔥 Max</span>
            </div>
          </label>

          {/* NEXT BUTTON */}
          <Btn onClick={handleNext} disabled={!current.name || current.mood === null}>
            {step === 1 ? "Au suivant ! →" : "Mixer nos humeurs 🎵"}
          </Btn>
        </main>
      ) : (
        /* FUSION SCREEN */
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="relative mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-3xl mb-1">{MOODS[p1.mood]?.emoji}</div>
                <div className="text-xs font-bold text-[#1A1A2E]">{p1.name}</div>
                <div className="text-xs text-[#666]">{MOODS[p1.mood]?.label}</div>
              </div>
              <div className="text-3xl animate-pulse">✨</div>
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-3xl mb-1">{MOODS[p2.mood]?.emoji}</div>
                <div className="text-xs font-bold text-[#1A1A2E]">{p2.name}</div>
                <div className="text-xs text-[#666]">{MOODS[p2.mood]?.label}</div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            {p1.name} + {p2.name}
          </h2>
          <p className="text-[#666] mb-6">On fusionne vos vibes...</p>
          {/* Loader animation */}
          <div className="flex gap-1 mb-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 h-8 bg-[#E91E63] rounded-full"
                style={{
                  animation: "pulse 1s ease-in-out infinite",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
          <Btn onClick={() => onNavigate("results")}>Voir nos morceaux 🎧</Btn>
        </main>
      )}
    </div>
  );
}

// ─── SCREEN 3 : RÉSULTATS ───
function ScreenResults({ onNavigate }) {
  const [favorites, setFavorites] = useState(new Set());
  const [playing, setPlaying] = useState(null);

  const toggleFav = (i) => {
    const next = new Set(favorites);
    next.has(i) ? next.delete(i) : next.add(i);
    setFavorites(next);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #FFF0F5 0%, #FFE4EC 40%, #FFF0F5 100%)" }}>
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
        <button onClick={() => onNavigate("mood")} className="text-[#666] hover:text-[#E91E63] transition-colors cursor-pointer flex items-center gap-1">
          ← Retour
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg">🎵</span>
          <span className="font-bold text-[#1A1A2E]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Chatoune<span className="text-[#E91E63]">Music</span>
          </span>
        </div>
        <button className="text-[#666] hover:text-[#E91E63] transition-colors cursor-pointer">
          ❤️ {favorites.size}
        </button>
      </nav>

      <main className="flex-1 px-6 max-w-4xl mx-auto w-full pb-12">
        {/* RECAP */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-5 mb-8 text-center shadow-md">
          <p className="text-sm text-[#666] mb-1">Vos humeurs fusionnées</p>
          <div className="flex items-center justify-center gap-3 text-xl">
            <span className="bg-[#FFD54F]/20 rounded-full px-3 py-1">😊 Sarah</span>
            <span className="text-[#E91E63] font-bold">+</span>
            <span className="bg-[#81D4FA]/20 rounded-full px-3 py-1">😌 Thomas</span>
            <span className="text-[#E91E63] font-bold">=</span>
            <span className="font-bold text-[#1A1A2E]">✨ Votre mix</span>
          </div>
        </div>

        {/* TRACKS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {MOCK_TRACKS.map((track, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* COVER */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#E91E63]/20 to-[#E91E63]/5 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                {track.cover}
              </div>

              {/* INFO */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#1A1A2E] text-sm truncate">{track.title}</h3>
                <p className="text-xs text-[#666] truncate">{track.artist}</p>
                <p className="text-xs text-[#666]/60">{track.duration}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setPlaying(playing === i ? null : i)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    playing === i
                      ? "bg-[#E91E63] text-white shadow-lg scale-110"
                      : "bg-[#E91E63]/10 text-[#E91E63] hover:bg-[#E91E63] hover:text-white"
                  }`}
                  aria-label={playing === i ? `Pause ${track.title}` : `Écouter ${track.title}`}
                >
                  {playing === i ? "⏸" : "▶"}
                </button>
                <button
                  onClick={() => toggleFav(i)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    favorites.has(i)
                      ? "bg-[#E91E63] text-white scale-110"
                      : "bg-gray-100 text-gray-400 hover:text-[#E91E63] hover:bg-[#E91E63]/10"
                  }`}
                  aria-label={favorites.has(i) ? `Retirer ${track.title} des favoris` : `Ajouter ${track.title} aux favoris`}
                >
                  ❤
                </button>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1DB954]/10 text-[#1DB954] flex items-center justify-center hover:bg-[#1DB954] hover:text-white transition-all duration-300"
                  aria-label={`Ouvrir ${track.title} dans Spotify`}
                  title="Ouvrir dans Spotify"
                >
                  🎧
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Spotify embed placeholder */}
        {playing !== null && (
          <div className="bg-[#1A1A2E] rounded-2xl p-4 mb-8 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-[#E91E63]/20 flex items-center justify-center text-xl">{MOCK_TRACKS[playing].cover}</div>
            <div className="flex-1">
              <p className="text-white text-sm font-bold">{MOCK_TRACKS[playing].title}</p>
              <p className="text-white/60 text-xs">{MOCK_TRACKS[playing].artist}</p>
            </div>
            <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden max-w-[200px]">
              <div className="h-full bg-[#E91E63] rounded-full w-1/3" style={{ animation: "grow 3s linear forwards" }} />
            </div>
            <span className="text-white/40 text-xs">Embed Spotify iframe ici (80px)</span>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Btn onClick={() => {}}>Refresh 🔄</Btn>
          <Btn variant="secondary" onClick={() => onNavigate("mood")}>On recommence ?</Btn>
        </div>
      </main>
    </div>
  );
}

// ─── SPEC PANEL ───
function SpecPanel({ screen }) {
  const specs = {
    home: (
      <div className="space-y-4 text-xs">
        <div>
          <p className="text-[#E91E63] font-bold mb-1">LAYOUT</p>
          <p>• Flex column, min-h-screen, centre vertical du hero</p>
          <p>• max-w-5xl pour la nav, max-w-3xl pour le hero</p>
          <p>• Section "Comment ça marche" : grid 1col mobile → 3col md+</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">COMPOSANTS</p>
          <p>• Nav : logo à gauche, liens à droite, sticky possible</p>
          <p>• CTA : rounded-full, px-8 py-4, bg-primary, shadow-lg</p>
          <p>• Cards étapes : bg-white/70 backdrop-blur rounded-2xl p-6 shadow-md</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">RESPONSIVE</p>
          <p>• Mobile : hero stacked, texte centré, bouton pleine largeur</p>
          <p>• Tablette : idem desktop mais marges réduites</p>
          <p>• Desktop : hero centré, 3 colonnes pour les étapes</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">ACCESSIBILITÉ</p>
          <p>• h1 unique, structure sémantique nav/main/footer</p>
          <p>• CTA avec focus:ring-4 focus:ring-primary/30</p>
          <p>• Contraste : texte #1A1A2E sur #FFF0F5 = ratio 12.6:1 ✅</p>
          <p>• Liens nav avec hover + focus visibles</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">ANIMATIONS</p>
          <p>• Emoji hero : animation bounce lente (2s)</p>
          <p>• CTA : hover:scale-105 active:scale-95 transition-300ms</p>
          <p>• Cards étapes : apparition staggered (fade-in-up)</p>
        </div>
      </div>
    ),
    mood: (
      <div className="space-y-4 text-xs">
        <div>
          <p className="text-[#E91E63] font-bold mb-1">LAYOUT</p>
          <p>• Centré, max-w-lg, flex column</p>
          <p>• Grille humeurs : grid 3col, gap-3</p>
          <p>• Mobile : 2col si écran &lt; 375px</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">PARCOURS</p>
          <p>• Step 1 → P1 (prénom + humeur + énergie)</p>
          <p>• Step 2 → P2 (idem, transition slide-left)</p>
          <p>• Step 3 → Fusion (récap côte à côte + loader + CTA)</p>
          <p>• Barre de progression en haut (3 segments)</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">COMPOSANTS</p>
          <p>• Input prénom : rounded-full, border-2, focus:ring</p>
          <p>• Mood button : role="radio", p-4, rounded-2xl, border-2</p>
          <p>• Selected : border-primary, bg-primary/10, scale-105, shadow colorée</p>
          <p>• Slider : range natif stylé, gradient de remplissage</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">ACCESSIBILITÉ</p>
          <p>• role="radiogroup" sur la grille humeurs</p>
          <p>• role="radio" + aria-checked sur chaque bouton</p>
          <p>• aria-label sur input et slider</p>
          <p>• Navigation clavier : Tab entre boutons, Enter pour sélectionner</p>
          <p>• Focus visible sur tous les éléments interactifs</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">ÉTATS</p>
          <p>• Bouton "Suivant" disabled si prénom vide OU humeur non choisie</p>
          <p>• Opacity-50 + cursor-not-allowed quand disabled</p>
          <p>• Loader fusion : 5 barres animées en pulse staggeré</p>
        </div>
      </div>
    ),
    results: (
      <div className="space-y-4 text-xs">
        <div>
          <p className="text-[#E91E63] font-bold mb-1">LAYOUT</p>
          <p>• max-w-4xl centré</p>
          <p>• Recap : bg-white/80 backdrop-blur rounded-2xl centré</p>
          <p>• Grid morceaux : 1col mobile → 2col md+, gap-4</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">COMPOSANTS — CARTE MORCEAU</p>
          <p>• bg-white rounded-2xl p-4 shadow-lg</p>
          <p>• Flex row : cover (64×64 rounded-xl) | info | actions</p>
          <p>• Bouton play : 40×40 rounded-full, toggle ▶/⏸</p>
          <p>• Bouton fav : 40×40, toggle style rempli/vide</p>
          <p>• Lien Spotify : 40×40, vert #1DB954</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">SKELETON LOADING</p>
          <p>• 6 cartes placeholder avec animate-pulse</p>
          <p>• Cover : bg-gray-200 rounded-xl</p>
          <p>• Texte : 2 lignes bg-gray-200 rounded h-3/h-2</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">EMBED SPOTIFY</p>
          <p>• Barre fixe en bas ou inline sous la carte active</p>
          <p>• bg-[#1A1A2E], h-20, iframe Spotify compact</p>
          <p>• Lazy loaded, apparaît au clic play</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">ANIMATIONS</p>
          <p>• Cartes : apparition staggerée (delay 100ms × index)</p>
          <p>• Fav : scale bounce au toggle</p>
          <p>• Play : scale-110 + shadow-lg quand actif</p>
        </div>
        <div>
          <p className="text-[#E91E63] font-bold mb-1">ACCESSIBILITÉ</p>
          <p>• aria-label sur chaque bouton d'action</p>
          <p>• Focus visible sur toutes les cartes et boutons</p>
          <p>• Contraste texte blanc sur #1A1A2E dans le player = OK</p>
          <p>• Liens Spotify avec title explicite</p>
        </div>
      </div>
    ),
  };

  return specs[screen] || null;
}

// ─── MAIN APP ───
export default function ChatouneMusicWireframes() {
  const [screen, setScreen] = useState("home");
  const [showSpecs, setShowSpecs] = useState(true);

  const screenMap = { home: "Accueil", mood: "Sélection humeur", results: "Résultats" };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* TOOLBAR */}
      <div className="sticky top-0 z-50 bg-[#1A1A2E] text-white px-4 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E91E63]">Wireframes ChatouneMusic</span>
          <span className="text-xs text-white/40">Mid-fidelity · v1.0</span>
        </div>
        <div className="flex items-center gap-2">
          {Object.entries(screenMap).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setScreen(key)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                screen === key ? "bg-[#E91E63] text-white" : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {label}
            </button>
          ))}
          <div className="w-px h-4 bg-white/20 mx-2" />
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
              showSpecs ? "bg-[#FFD700] text-[#1A1A2E]" : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
          >
            {showSpecs ? "📐 Specs ON" : "📐 Specs OFF"}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className={showSpecs ? "flex" : ""}>
        <div className={showSpecs ? "flex-1" : ""}>
          {screen === "home" && <ScreenAccueil onNavigate={setScreen} />}
          {screen === "mood" && <ScreenMood onNavigate={setScreen} />}
          {screen === "results" && <ScreenResults onNavigate={setScreen} />}
        </div>

        {showSpecs && (
          <div className="w-96 bg-[#0D0D1A] text-white p-5 overflow-y-auto min-h-screen border-l border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#FFD700] mb-1">
              📐 Spécifications — {screenMap[screen]}
            </h2>
            <p className="text-xs text-white/40 mb-4">Exploitables directement par Claude Code</p>
            <SpecPanel screen={screen} />
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes grow { from { width: 0; } to { width: 100%; } }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: #E91E63;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(233,30,99,0.3);
        }
      `}</style>
    </div>
  );
}
