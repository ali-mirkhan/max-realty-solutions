import Image from "next/image";

export default function ExclusiveStamp({
  width = 200,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  // Original SVG aspect ratio is 1400x1000 (1.4:1)
  const height = Math.round(width * (1000 / 1400));
  return (
    <Image
      src="/exclusive-stamp.svg"
      alt="Exclusive Off-Market Listing — Max Realty Solutions"
      width={width}
      height={height}
      className={`pointer-events-none select-none drop-shadow-lg ${className}`}
      priority={false}
      unoptimized
    />
  );
}
