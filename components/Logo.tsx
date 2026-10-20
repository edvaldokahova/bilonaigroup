// Símbolo oficial (anéis dourados abertos + pupila creme) + "A BILONAI GROUP".
export default function Logo({ size = 34, texto = true, className = "" }: { size?: number; texto?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="-50 -50 100 100" fill="none" aria-hidden>
        <defs>
          <linearGradient id="bil-gold" gradientUnits="userSpaceOnUse" x1="-43" y1="-43" x2="43" y2="43">
            <stop offset="0" stopColor="#F3D77A" />
            <stop offset="0.5" stopColor="#D4A936" />
            <stop offset="1" stopColor="#A67C1A" />
          </linearGradient>
        </defs>
        <circle r="40" stroke="url(#bil-gold)" strokeWidth="6" strokeLinecap="round" strokeDasharray="205 46.33" transform="rotate(-60)" />
        <circle r="25" stroke="url(#bil-gold)" strokeWidth="5" strokeLinecap="round" strokeDasharray="120 37.08" transform="rotate(120)" />
        <circle r="9" fill="#F4EFE6" />
      </svg>
      {texto && (
        <span className="whitespace-nowrap font-display text-[14px] tracking-[.26em] text-cream sm:text-[15px]">
          A BILONAI <span className="text-gold">GROUP</span>
        </span>
      )}
    </span>
  );
}
