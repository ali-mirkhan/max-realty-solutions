"use client";

interface ObscuredHeroProps {
  imagePath: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  aspectRatio?: string;
}

export default function ObscuredHero({
  imagePath,
  eyebrow = "EXCLUSIVE",
  title,
  subtitle,
  aspectRatio,
}: ObscuredHeroProps) {
  // If aspectRatio is supplied the component owns its sizing; otherwise it
  // fills whatever parent container it's dropped into.
  const containerStyle: React.CSSProperties = aspectRatio
    ? { aspectRatio }
    : {};
  const containerClass = aspectRatio
    ? "relative w-full overflow-hidden rounded-lg"
    : "relative w-full h-full overflow-hidden";

  return (
    <div className={containerClass} style={containerStyle}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${imagePath}")`,
          filter: "blur(1px) saturate(1) brightness(1)",
          transform: "scale(1.05)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(44,44,44,0.15) 0%, rgba(44,44,44,0.35) 60%, rgba(44,44,44,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent 0, transparent 80px, rgba(255,255,255,0.15) 80px, rgba(255,255,255,0.15) 81px)",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 py-8 md:px-8 md:py-12">
        <p className="text-[11px] tracking-[0.3em] font-semibold text-white/75 mb-4">
          {eyebrow}
        </p>
        <h2 className="font-serif text-xl md:text-4xl font-semibold mb-3 max-w-2xl leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs md:text-base text-white/80 max-w-md">{subtitle}</p>
        )}
        <div className="mt-5 md:mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 backdrop-blur-sm text-[10px] md:text-[11px] tracking-wider uppercase text-white/90">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Details on Qualified Request
        </div>
      </div>
    </div>
  );
}
