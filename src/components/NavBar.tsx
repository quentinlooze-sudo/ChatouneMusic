"use client";

interface NavBarProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function NavBar({ showBack = false, onBack }: NavBarProps) {
  return (
    <nav aria-label="Navigation principale" className="flex items-center justify-between px-6 py-4 max-w-page mx-auto w-full">
      <a href="/" className="flex items-center gap-1 text-lg font-bold">
        <span aria-hidden="true">🎵</span>
        <span className="text-text-main">Chatoune</span>
        <span className="text-primary">Music</span>
      </a>

      {showBack && (
        <button
          onClick={onBack}
          className="text-sm text-text-secondary hover:text-primary transition-colors
                     focus-visible:ring-4 focus-visible:ring-primary-30 focus:outline-none rounded-full px-2 py-1"
        >
          ← Retour
        </button>
      )}
    </nav>
  );
}
