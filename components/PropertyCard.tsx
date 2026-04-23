import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const GTA_CITIES = new Set([
  "toronto", "mississauga", "brampton", "markham", "vaughan", "richmond hill",
  "oakville", "burlington", "ajax", "whitby", "oshawa", "pickering", "milton",
  "newmarket", "scarborough", "north york", "etobicoke", "aurora", "king city",
  "stouffville",
]);

function getListingBadge(property: Property): { text: string; className: string } | null {
  if (!property.source) return null;
  if (property.source === "member") {
    return { text: "Max Realty Exclusive", className: "bg-[#7D1A2D] text-white" };
  }
  const city = (property.city ?? "").toLowerCase().trim();
  const province = (property.province ?? "").trim();
  if (GTA_CITIES.has(city)) {
    return { text: "GTA", className: "bg-amber-500 text-white" };
  }
  if (province === "Ontario" || province === "ON") {
    return { text: "Ontario", className: "bg-blue-600 text-white" };
  }
  return { text: "MLS Listing", className: "bg-gray-200 text-gray-700" };
}

export default function PropertyCard({ property }: { property: Property }) {
  const badge = getListingBadge(property);

  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden border border-stone-border hover:border-burgundy/20 transition-all duration-300 hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image}
            alt={property.address}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold text-white bg-burgundy rounded">
              {property.status}
            </span>
            <span className="px-2.5 py-1 text-xs font-medium text-charcoal bg-white/90 backdrop-blur-sm rounded capitalize">
              {property.type}
            </span>
          </div>
          {badge && (
            <div className="absolute top-3 right-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded ${badge.className}`}>
                {badge.text}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 lg:p-5">
          <p className="font-serif text-lg lg:text-xl font-semibold text-burgundy mb-1">
            {formatPrice(property.price, property.type, property.status)}
          </p>
          <p className="text-sm font-medium text-charcoal mb-1">{property.address}</p>
          <p className="text-xs text-charcoal/50 flex items-center gap-1 mb-3">
            <MapPin size={12} />
            {property.city}, {property.neighbourhood}
          </p>
          {property.type === "residential" ? (
            <div className="flex items-center gap-4 text-xs text-charcoal/60">
              <span className="flex items-center gap-1"><Bed size={14} /> {property.beds} Bed</span>
              <span className="flex items-center gap-1"><Bath size={14} /> {property.baths} Bath</span>
              <span className="flex items-center gap-1"><Maximize size={14} /> {property.sqft.toLocaleString()} sqft</span>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-xs text-charcoal/60">
              <span className="flex items-center gap-1"><Maximize size={14} /> {property.sqft.toLocaleString()} sqft</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
