type Variant = "markham" | "dufferin" | "grocery-anchor";

interface Props {
  variant: Variant;
  className?: string;
}

const SUBTITLE: Record<Variant, string> = {
  markham: "Mixed-Use Development Site · Markham",
  dufferin: "Retail Plaza · Toronto",
  "grocery-anchor": "Grocery-Anchored Retail · Ontario",
};

export default function OffMarketPlaceholder({ variant, className }: Props) {
  const subtitle = SUBTITLE[variant];
  const gradientId = `omp-grad-${variant}`;
  const patternId = `omp-pattern-${variant}`;

  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Off-market opportunity — ${subtitle}`}
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7D1A2D" />
          <stop offset="100%" stopColor="#2C2C2C" />
        </linearGradient>
        <pattern
          id={patternId}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.1" />
        </pattern>
      </defs>

      <rect width="1600" height="1000" fill={`url(#${gradientId})`} />
      <rect width="1600" height="1000" fill={`url(#${patternId})`} />

      <text
        x="800"
        y="460"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="58"
        fontWeight="700"
        letterSpacing="12"
      >
        OFF-MARKET OPPORTUNITY
      </text>

      <line x1="700" y1="510" x2="900" y2="510" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />

      <text
        x="800"
        y="575"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="34"
        fontStyle="italic"
        fontWeight="500"
        opacity="0.92"
      >
        {subtitle}
      </text>

      <text
        x="800"
        y="920"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="20"
        letterSpacing="3"
        opacity="0.6"
      >
        Details available on qualified request
      </text>

      {/* Max Realty mark bottom-right */}
      <g transform="translate(1380 880)" opacity="0.8">
        <rect x="0" y="0" width="160" height="60" rx="4" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.3" />
        <text
          x="80"
          y="38"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="20"
          fontWeight="600"
        >
          Max Realty
        </text>
      </g>
    </svg>
  );
}
