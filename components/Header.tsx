"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "maxRealty_favorites";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
  { href: "/commercial", label: "Commercial" },
  { href: "/property-management", label: "Property Management" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/agents", label: "Our Team" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function readFavoritesCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

function FavoritesLink({
  count,
  onClick,
  variant,
}: {
  count: number;
  onClick?: () => void;
  variant: "desktop" | "mobile";
}) {
  if (variant === "mobile") {
    return (
      <Link
        href="/favorites"
        onClick={onClick}
        className="flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md text-charcoal/70 hover:text-burgundy"
      >
        <span className="flex items-center gap-2">
          <Heart size={16} />
          My Favorites
        </span>
        {count > 0 && (
          <span className="min-w-[20px] h-5 px-1.5 text-[10px] font-bold text-white bg-burgundy rounded-full flex items-center justify-center">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </Link>
    );
  }
  return (
    <Link
      href="/favorites"
      className="relative p-2 rounded-md text-charcoal/70 hover:text-burgundy hover:bg-burgundy/5 transition-colors"
      aria-label={`My Favorites${count > 0 ? ` (${count})` : ""}`}
    >
      <Heart size={18} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-burgundy rounded-full flex items-center justify-center leading-none">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setFavCount(readFavoritesCount());
    function refresh() {
      setFavCount(readFavoritesCount());
    }
    window.addEventListener("favoritesChanged", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("favoritesChanged", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    setFavCount(readFavoritesCount());
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-border">
      <div className="container flex items-center justify-between gap-4 h-16 lg:h-20">
        {/* Logo + Nav group */}
        <div className="flex items-center gap-8 xl:gap-12">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Max Realty Solutions Ltd., Brokerage"
              width={160}
              height={54}
              className="h-10 lg:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap",
                  pathname === link.href
                    ? "text-burgundy bg-burgundy/5"
                    : "text-charcoal/70 hover:text-burgundy hover:bg-burgundy/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop CTAs — visible at xl (1280px+) where full nav + buttons fit */}
        <div className="hidden xl:flex items-center gap-3">
          <FavoritesLink count={favCount} variant="desktop" />
          <Link href="/properties" className="btn-outline py-2 px-4">
            Browse Properties
          </Link>
          <Link href="/join" className="btn-primary py-2 px-4">
            Join Max Realty
          </Link>
        </div>

        {/* Between lg and xl: show favorites icon alongside hamburger */}
        <div className="hidden lg:flex xl:hidden items-center">
          <FavoritesLink count={favCount} variant="desktop" />
        </div>

        {/* Mobile favorites + menu */}
        <div className="flex items-center gap-1 lg:hidden">
          <FavoritesLink count={favCount} variant="desktop" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-stone-border pb-4">
          <nav className="container flex flex-col gap-1 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium rounded-md",
                  pathname === link.href
                    ? "text-burgundy bg-burgundy/5"
                    : "text-charcoal/70 hover:text-burgundy"
                )}
              >
                {link.label}
              </Link>
            ))}
            <FavoritesLink
              count={favCount}
              variant="mobile"
              onClick={() => setMobileOpen(false)}
            />
            <div className="flex flex-col gap-2 mt-3 px-3">
              <Link
                href="/properties"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm font-semibold text-burgundy border border-burgundy/30 rounded-md text-center"
              >
                Browse Properties
              </Link>
              <Link
                href="/join"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md text-center"
              >
                Join Max Realty
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
