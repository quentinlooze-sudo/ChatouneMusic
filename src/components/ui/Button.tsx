"use client";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
}

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover hover:scale-105 hover:shadow-cta",
  secondary:
    "bg-white text-primary border-2 border-primary hover:bg-primary-10 hover:scale-105",
  ghost: "bg-transparent text-text-secondary hover:text-primary",
};

const SIZE_CLASSES: Record<string, string> = {
  sm: "px-4 py-2 text-button-sm min-h-[44px]",
  md: "px-6 py-3 text-button-md min-h-[44px]",
  lg: "px-8 py-4 text-button-lg min-h-[44px]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={`
        rounded-full font-bold inline-flex items-center justify-center gap-2
        transition-all duration-300 cursor-pointer select-none
        focus-visible:ring-4 focus-visible:ring-primary-30 focus:outline-none
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        disabled:pointer-events-none
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
