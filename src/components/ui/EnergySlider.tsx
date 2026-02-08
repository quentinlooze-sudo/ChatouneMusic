"use client";

interface EnergySliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function EnergySlider({ value, onChange }: EnergySliderProps) {
  return (
    <div className="w-full space-y-2">
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Niveau d'énergie"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="w-full h-3 rounded-full appearance-none cursor-pointer
                   bg-gray-200 accent-primary
                   focus-visible:ring-4 focus-visible:ring-primary-30 focus:outline-none
                   [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
                   [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:appearance-none"
      />
      <div className="flex justify-between text-xs text-text-secondary">
        <span>🐌 Calme</span>
        <span>🔥 Max</span>
      </div>
    </div>
  );
}
