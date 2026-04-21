"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Grid2x2 } from "lucide-react";

interface Props {
  images: string[];
  address: string;
}

export default function PropertyGallery({ images, address }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showGrid, setShowGrid] = useState(false);

  if (images.length === 0) return null;

  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div>
      {/* Main image */}
      <div className="relative rounded-lg overflow-hidden aspect-[21/9]">
        <Image
          src={images[activeIdx]}
          alt={`${address} — photo ${activeIdx + 1}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 right-3">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/50 text-white text-xs hover:bg-black/70 transition-colors"
              >
                <Grid2x2 size={13} />
                {activeIdx + 1} / {images.length}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-2 mt-2 scrollbar-hide">
          {images.slice(0, 20).map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-colors ${
                i === activeIdx ? "border-burgundy" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                width={80}
                height={56}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}

      {/* Grid view overlay */}
      {showGrid && images.length > 1 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {images.slice(0, 20).map((src, i) => (
            <button
              key={i}
              onClick={() => { setActiveIdx(i); setShowGrid(false); }}
              className={`relative aspect-square rounded overflow-hidden border-2 transition-colors ${
                i === activeIdx ? "border-burgundy" : "border-transparent"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="20vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
