export function LemonIcon({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Main lemon body */}
      <ellipse cx="100" cy="100" rx="55" ry="70" fill="#fde047">
        <animate
          attributeName="ry"
          values="70;72;70"
          dur="3s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Lemon highlight */}
      <ellipse cx="85" cy="80" rx="25" ry="35" fill="#fef9c3" opacity="0.6" />

      {/* Lemon tips */}
      <ellipse cx="100" cy="32" rx="8" ry="12" fill="#facc15" />
      <ellipse cx="100" cy="168" rx="8" ry="12" fill="#facc15" />

      {/* Leaf */}
      <path
        d="M100 25 Q120 5 130 15 Q125 30 105 35"
        fill="#4ade80"
      />
      <path
        d="M115 20 L110 30"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Cute face - Eyes */}
      <circle cx="80" cy="90" r="12" fill="#1a1a0a">
        <animate
          attributeName="r"
          values="12;10;12"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="120" cy="90" r="12" fill="#1a1a0a">
        <animate
          attributeName="r"
          values="12;10;12"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Eye sparkles */}
      <circle cx="75" cy="85" r="4" fill="white" opacity="0.9" />
      <circle cx="115" cy="85" r="4" fill="white" opacity="0.9" />

      {/* Blush */}
      <ellipse cx="65" cy="105" rx="10" ry="6" fill="#fb923c" opacity="0.4" />
      <ellipse cx="135" cy="105" rx="10" ry="6" fill="#fb923c" opacity="0.4" />

      {/* Cute smile */}
      <path
        d="M85 115 Q100 130 115 115"
        stroke="#1a1a0a"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Small sparkles around */}
      <circle cx="155" cy="60" r="3" fill="#fbbf24">
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="45" cy="140" r="2" fill="#fbbf24">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="160" cy="130" r="2" fill="#a3e635">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
