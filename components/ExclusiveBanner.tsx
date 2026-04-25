import Image from "next/image";

export default function ExclusiveBanner({
  width = 160,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  return (
    <Image
      src="/exclusive-banner.svg"
      alt="Exclusive Off-Market Listing — Max Realty Solutions"
      width={width}
      height={Math.round(width * 0.25)}
      className={`pointer-events-none select-none drop-shadow-md ${className}`}
      priority={false}
    />
  );
}
