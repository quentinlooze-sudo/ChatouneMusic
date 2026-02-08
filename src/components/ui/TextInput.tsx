"use client";

interface TextInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
}

export default function TextInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  maxLength,
}: TextInputProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        aria-label={label}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className={`
          w-full px-5 py-3 rounded-full border-2 bg-white min-h-[44px]
          font-body text-body text-text-main
          placeholder:text-text-secondary/50
          transition-all duration-300
          focus:outline-none focus-visible:ring-4
          ${
            error
              ? "border-error focus:ring-error/10"
              : "border-primary-30 focus:border-primary focus:ring-primary/10"
          }
        `}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-caption text-error pl-5"
        >
          {error}
        </p>
      )}
    </div>
  );
}
