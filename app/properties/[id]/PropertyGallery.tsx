"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Grid2x2, X } from "lucide-react";

interface Props {
  images: string[];
  address: string;
}

export default function PropertyGallery({ images, address }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  function go(direction: 1 | -1) {
    const newIdx = (activeIdx + direction + images.length) % images.length;
    setActiveIdx(newIdx);
    scrollToThumb(newIdx);
  }

  function scrollToThumb(idx: number) {
    const container = thumbsRef.current;
    if (!container) return;
    const thumb = container.children[idx] as HTMLElement;
    if (thumb) thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  function selectThumb(i: number) {
    setActiveIdx(i);
    scrollToThumb(i);
  }

  return (
    <>
      {/* Main photo */}
      <div className="relative rounded-xl overflow-hidden" style={{ height: "520px" }}>
        <Image
          src={images[activeIdx]}
          alt={`${address} — photo ${activeIdx + 1}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Bottom bar: counter + view all */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="text-white/75 text-sm font-medium tabular-nums">
            {activeIdx + 1} / {images.length}
          </span>
          {images.length > 1 && (
            <button
              onClick={() => setLightboxOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 text-white text-sm font-medium hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <Grid2x2 size={14} />
              View All {images.length} Photos
            </button>
          )}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto py-3 scrollbar-hide"
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => selectThumb(i)}
              style={{ width: 88, height: 60 }}
              className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIdx
                  ? "border-burgundy opacity-100 scale-105"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={src}
                alt=""
                width={88}
                height={60}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <p className="text-white/80 text-sm font-medium truncate mr-4">{address}</p>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-white/50 text-sm tabular-nums">{activeIdx + 1} / {images.length}</span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main image */}
          <div className="relative flex-1 min-h-0">
            <Image
              src={images[activeIdx]}
              alt={`${address} — photo ${activeIdx + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  onClick={() => go(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight size={26} />
                </button>
              </>
            )}
          </div>

          {/* Lightbox thumbnails */}
          <div className="flex gap-2 overflow-x-auto px-6 py-4 border-t border-white/10 shrink-0 scrollbar-hide">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{ width: 72, height: 50 }}
                className={`shrink-0 rounded overflow-hidden border-2 transition-all ${
                  i === activeIdx ? "border-burgundy" : "border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <Image src={src} alt="" width={72} height={50} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
