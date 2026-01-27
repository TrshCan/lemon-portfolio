export function Lemonade() {
    return (
        <div className="relative w-32 h-32 animate-float" style={{ animationDelay: "1s" }}>
            {/* Glass */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Lemonade Liquid */}
                <path
                    d="M30 20 L70 20 L65 85 Q50 90 35 85 Z"
                    fill="#fde047"
                    opacity="0.8"
                />

                {/* Glass Outline */}
                <path
                    d="M25 15 L75 15 L70 90 Q50 95 30 90 Z"
                    fill="none"
                    stroke="#e8e8d0"
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/* Ice Cubes */}
                <rect x="40" y="40" width="12" height="12" fill="white" opacity="0.4" rx="2" transform="rotate(15 46 46)" />
                <rect x="52" y="60" width="10" height="10" fill="white" opacity="0.3" rx="2" transform="rotate(-10 57 65)" />

                {/* Straw */}
                <path
                    d="M55 10 L55 50 Q55 55 60 55 L75 55"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Lemon Slice on Rim */}
                <circle cx="30" cy="20" r="12" fill="#facc15" stroke="#fde047" strokeWidth="1" />
                <path d="M30 20 L30 8 M30 20 L42 20 M30 20 L30 32 M30 20 L18 20" stroke="#fde047" strokeWidth="1" opacity="0.6" />

                {/* Bubbles */}
                <circle cx="45" cy="70" r="2" fill="white" opacity="0.6">
                    <animate attributeName="cy" values="70;30" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="55" cy="80" r="1.5" fill="white" opacity="0.4">
                    <animate attributeName="cy" values="80;40" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0" dur="2.5s" repeatCount="indefinite" />
                </circle>
            </svg>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-accent-secondary/10 blur-xl rounded-full -z-10" />
        </div>
    );
}
