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

function getRegion(property: Property): string | null {
  const city = (property.city ?? "").toLowerCase().trim();
  const province = (property.province ?? "").trim();
  if (GTA_CITIES.has(city)) return "GTA";
  if (province === "Ontario" || province === "ON") return "Ontario";
  return "MLS Listing";
}

export default function PropertyCard({ property }: { property: Property }) {
  const status = property.status;
  const propertyType = property.type
    ? property.type.charAt(0).toUpperCase() + property.type.slice(1)
    : "";
  const region = getRegion(property);

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
          {/* LEFT SIDE: Status + Type badges stacked vertically */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
            {status && (
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-burgundy text-white rounded shadow-sm">
                {status}
              </span>
            )}
            {propertyType && (
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-charcoal rounded shadow-sm">
                {propertyType}
              </span>
            )}
          </div>

          {/* RIGHT SIDE: Either Max Realty Exclusive (member) OR Region badge (NSP), never both */}
          <div className="absolute top-3 right-3 z-10">
            {property.source === "member" ? (
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-burgundy text-white rounded shadow-sm whitespace-nowrap">
                Max Realty Exclusive
              </span>
            ) : region && (
              <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm whitespace-nowrap ${
                region === "GTA" ? "bg-yellow-400 text-charcoal" : "bg-white/90 text-charcoal"
              }`}>
                {region}
              </span>
            )}
          </div>
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
