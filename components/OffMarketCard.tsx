import Link from "next/link";
import Image from "next/image";
import { MapPin, Lock } from "lucide-react";
import OffMarketPlaceholder from "@/components/OffMarketPlaceholder";
import type { OffMarketListing } from "@/data/offMarketListings";

export default function OffMarketCard({ listing }: { listing: OffMarketListing }) {
  const usesImage = listing.hero.type === "image" && listing.hero.imagePath;
  const noiFormatted = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(listing.noi);

  return (
    <Link href={`/off-market/${listing.slug}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden border border-stone-border hover:border-burgundy/30 transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
          {usesImage ? (
            <Image
              src={listing.hero.imagePath!}
              alt={listing.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0">
              <OffMarketPlaceholder
                variant={listing.hero.placeholderVariant}
                className="w-full h-full"
              />
            </div>
          )}

          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-burgundy text-white rounded shadow-sm">
              Off-Market
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-charcoal rounded shadow-sm">
              {listing.category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <p className="font-serif text-lg font-semibold text-burgundy mb-1">
            Price on Request
          </p>

          <h3 className="font-serif text-base font-semibold text-charcoal leading-snug mb-1">
            {listing.title}
          </h3>

          <p className="text-xs text-charcoal/50 flex items-center gap-1 mb-4">
            {listing.isConfidential ? <Lock size={12} /> : <MapPin size={12} />}
            {listing.locationDisplay}
          </p>

          <div className="pt-3 border-t border-stone-border">
            <p className="text-xs text-charcoal/40 uppercase tracking-wider">NOI</p>
            <p className="text-sm font-semibold text-charcoal">{noiFormatted}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
