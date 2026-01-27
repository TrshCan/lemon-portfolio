export function OwlIcon({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Body */}
      <ellipse cx="100" cy="130" rx="60" ry="50" fill="#2e4a62" />

      {/* Head */}
      <circle cx="100" cy="70" r="50" fill="#1d3b53" />

      {/* Ear tufts */}
      <path d="M55 30 Q50 10 60 25 Q55 15 65 30" fill="#1d3b53" />
      <path d="M145 30 Q150 10 140 25 Q145 15 135 30" fill="#1d3b53" />

      {/* Eye circles (white) */}
      <circle cx="75" cy="65" r="22" fill="#d6deeb" />
      <circle cx="125" cy="65" r="22" fill="#d6deeb" />

      {/* Pupils */}
      <circle cx="75" cy="65" r="12" fill="#011627">
        <animate
          attributeName="r"
          values="12;10;12"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="125" cy="65" r="12" fill="#011627">
        <animate
          attributeName="r"
          values="12;10;12"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Eye glow */}
      <circle cx="75" cy="65" r="6" fill="#7fdbca">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="125" cy="65" r="6" fill="#7fdbca">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Eye shine */}
      <circle cx="70" cy="60" r="4" fill="white" opacity="0.8" />
      <circle cx="120" cy="60" r="4" fill="white" opacity="0.8" />

      {/* Beak */}
      <path d="M95 85 L100 100 L105 85" fill="#f78c6c" />

      {/* Chest pattern */}
      <ellipse cx="100" cy="140" rx="35" ry="25" fill="#0d293e" />
      <ellipse cx="100" cy="145" rx="25" ry="18" fill="#1d3b53" />

      {/* Wings */}
      <path d="M45 110 Q25 130 40 160 Q50 140 55 130" fill="#1d3b53" />
      <path d="M155 110 Q175 130 160 160 Q150 140 145 130" fill="#1d3b53" />

      {/* Feet */}
      <path
        d="M80 175 L75 190 M80 175 L80 190 M80 175 L85 190"
        stroke="#f78c6c"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M120 175 L115 190 M120 175 L120 190 M120 175 L125 190"
        stroke="#f78c6c"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
