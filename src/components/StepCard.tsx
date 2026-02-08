interface StepCardProps {
  emoji: string;
  title: string;
  description: string;
}

export default function StepCard({ emoji, title, description }: StepCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
      <span className="text-[32px] block mb-3" aria-hidden="true">
        {emoji}
      </span>
      <h3 className="font-heading text-h3 text-text-main mb-2">{title}</h3>
      <p className="font-body text-xs text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
