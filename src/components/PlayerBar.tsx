interface PlayerBarProps {
  track: {
    title: string;
    artist: string;
    coverUrl: string;
    spotifyId: string;
  };
}

export default function PlayerBar({ track }: PlayerBarProps) {
  return (
    <div role="region" aria-label="Lecteur audio" className="bg-surface-dark rounded-2xl p-4 shadow-elevated animate-fade-in-up flex items-center gap-4">
      <img
        src={track.coverUrl}
        alt={`En lecture : ${track.title}`}
        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{track.title}</p>
        <p className="text-xs text-white/60 truncate">{track.artist}</p>
      </div>
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
  );
}
