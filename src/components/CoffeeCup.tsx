export function CoffeeCup() {
  return (
    <div className="relative w-32 h-32 animate-float">
      {/* Steam */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-2 h-8 bg-linear-to-t from-accent-tertiary/50 to-transparent rounded-full animate-steam" />
        <div
          className="w-2 h-8 bg-linear-to-t from-accent-tertiary/50 to-transparent rounded-full animate-steam"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="w-2 h-8 bg-linear-to-t from-accent-tertiary/50 to-transparent rounded-full animate-steam"
          style={{ animationDelay: "0.6s" }}
        />
      </div>

      {/* Cup */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Cup body */}
        <path
          d="M20 30 Q20 85 50 85 Q80 85 80 30 Z"
          fill="#c4a484"
          stroke="#6f4e37"
          strokeWidth="3"
        />
        {/* Coffee liquid */}
        <path d="M25 35 Q25 75 50 75 Q75 75 75 35 Z" fill="#3c2415" />
        {/* Coffee shine */}
        <ellipse cx="40" cy="45" rx="10" ry="5" fill="#6f4e37" opacity="0.5" />
        {/* Handle */}
        <path
          d="M80 40 Q95 40 95 55 Q95 70 80 70"
          fill="none"
          stroke="#c4a484"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M80 45 Q90 45 90 55 Q90 65 80 65"
          fill="none"
          stroke="#6f4e37"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-accent-tertiary/20 blur-xl rounded-full" />
    </div>
  );
}
