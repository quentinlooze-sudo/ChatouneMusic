interface ProgressBarProps {
  step: 1 | 2 | 3;
}

export default function ProgressBar({ step }: ProgressBarProps) {
  return (
    <div
      className="flex items-center justify-center gap-2"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={3}
      aria-label={`Étape ${step} sur 3`}
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-500 ${
            i <= step ? "w-12 bg-primary" : "w-8 bg-primary/20"
          }`}
        />
      ))}
    </div>
  );
}
