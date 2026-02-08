const PULSE_CLASSES = [
  "animate-pulse-bar-1",
  "animate-pulse-bar-2",
  "animate-pulse-bar-3",
  "animate-pulse-bar-4",
  "animate-pulse-bar-5",
];

export default function FusionLoader() {
  return (
    <div
      className="flex items-end justify-center gap-1 h-10"
      role="status"
      aria-label="Fusion des humeurs en cours"
    >
      <span className="sr-only">Chargement en cours...</span>
      {PULSE_CLASSES.map((cls, i) => (
        <div
          key={i}
          className={`w-1.5 bg-primary rounded-full ${cls}`}
          style={{ height: "24px", transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}
