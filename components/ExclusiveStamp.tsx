import Image from "next/image";

export default function ExclusiveStamp({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/exclusive-stamp.svg"
      alt="Exclusive Listing"
      width={size}
      height={Math.round(size * 0.7)}
      className={`pointer-events-none select-none ${className}`}
      priority={false}
    />
  );
}
