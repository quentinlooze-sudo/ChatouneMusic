"use client";

interface TrackCardProps {
  track: {
    id: string;
    title: string;
    artist: string;
    duration: string;
    coverUrl: string;
    spotifyUrl: string;
    spotifyId: string;
  };
  isFavorite?: boolean;
  onFavorite?: () => void;
  onSpotify?: () => void;
}

function TrackAction({
  label,
  onClick,
  isActive,
  activeClass,
  defaultClass,
  children,
}: {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  activeClass: string;
  defaultClass: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`
        w-11 h-11 rounded-full flex items-center justify-center
        transition-all duration-300
        focus-visible:ring-4 focus-visible:ring-primary-30 focus:outline-none
        ${isActive ? activeClass : defaultClass}
      `}
    >
      {children}
    </button>
  );
}

export default function TrackCard({
  track,
  isFavorite = false,
  onFavorite,
  onSpotify,
}: TrackCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center gap-4">
      {track.coverUrl ? (
        <img
          src={track.coverUrl}
          alt={`Pochette de ${track.title}`}
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
          loading="lazy"
        />
      ) : (
        <div
          className="w-16 h-16 rounded-xl flex-shrink-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl"
          aria-hidden="true"
        >
          🎵
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-text-main truncate">
          {track.title}
        </p>
        <p className="text-xs text-text-secondary truncate">{track.artist}</p>
        <p className="text-xs text-text-secondary">{track.duration}</p>
      </div>

      <div className="flex items-center gap-2">
        <TrackAction
          label={
            isFavorite
              ? `Retirer ${track.title} des favoris`
              : `Ajouter ${track.title} aux favoris`
          }
          onClick={onFavorite}
          isActive={isFavorite}
          activeClass="bg-primary text-white scale-110"
          defaultClass="bg-gray-100 text-gray-400"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 14s-5.5-3.5-5.5-7A3.5 3.5 0 018 4a3.5 3.5 0 015.5 3c0 3.5-5.5 7-5.5 7z" />
          </svg>
        </TrackAction>

        <TrackAction
          label={`Ouvrir ${track.title} dans Spotify`}
          onClick={onSpotify}
          isActive={false}
          activeClass="bg-spotify text-white"
          defaultClass="bg-spotify/10 text-spotify hover:bg-spotify hover:text-white"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M5 6.5c2-.5 4-.3 5.5.5M4.5 8.5c1.8-.4 3.5-.2 5 .5M5 10.5c1.5-.3 3-.2 4 .4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </TrackAction>
      </div>
    </div>
  );
}
