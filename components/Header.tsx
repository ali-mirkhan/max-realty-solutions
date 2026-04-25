"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "maxRealty_favorites";

type SimpleLink = { href: string; label: string };
type NavEntry =
  | { type: "link"; href: string; label: string }
  | { type: "dropdown"; label: string; items: SimpleLink[] };

const NAV: NavEntry[] = [
  { type: "link", href: "/", label: "Home" },
  {
    type: "dropdown",
    label: "Properties",
    items: [
      { href: "/properties", label: "Browse Properties" },
      { href: "/favorites", label: "Favorites" },
    ],
  },
  {
    type: "dropdown",
    label: "Commercial",
    items: [
      { href: "/commercial", label: "Commercial Listings" },
      { href: "/off-market", label: "Off-Market Opportunities" },
      { href: "/property-management", label: "Property Management" },
    ],
  },
  { type: "link", href: "/services", label: "Services" },
  {
    type: "dropdown",
    label: "About",
    items: [
      { href: "/about", label: "About Max Realty" },
      { href: "/agents", label: "Our Team" },
      { href: "/tools", label: "Tools" },
      { href: "/blog", label: "Blog" },
    ],
  },
  { type: "link", href: "/contact", label: "Contact" },
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

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
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

function DesktopDropdown({
  label,
  items,
  pathname,
}: {
  label: string;
  items: SimpleLink[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const active = items.some((i) => isActive(pathname, i.href));

  // Close on Escape and on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center px-2 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
          active
            ? "text-burgundy bg-burgundy/5"
            : "text-charcoal/70 hover:text-burgundy hover:bg-burgundy/5"
        )}
      >
        {label}
        <ChevronDown
          size={14}
          className={cn(
            "ml-1 transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        role="menu"
        className={cn(
          "absolute left-0 top-full pt-1 min-w-[220px] z-50 transition-all duration-150",
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1 pointer-events-none"
        )}
      >
        <div className="bg-white rounded-lg shadow-lg border border-stone-200 py-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={cn(
                "block px-4 py-2.5 text-sm transition-colors",
                isActive(pathname, item.href)
                  ? "text-burgundy bg-burgundy/5"
                  : "text-charcoal/80 hover:bg-stone-50 hover:text-burgundy"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileDropdown({
  label,
  items,
  pathname,
  onLinkClick,
}: {
  label: string;
  items: SimpleLink[];
  pathname: string;
  onLinkClick: () => void;
}) {
  const active = items.some((i) => isActive(pathname, i.href));
  const [open, setOpen] = useState(active);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md",
          active ? "text-burgundy bg-burgundy/5" : "text-charcoal/70 hover:text-burgundy"
        )}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="ml-3 pl-3 border-l border-stone-border my-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "block px-3 py-2 text-sm rounded-md",
                isActive(pathname, item.href)
                  ? "text-burgundy bg-burgundy/5"
                  : "text-charcoal/70 hover:text-burgundy"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
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
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-border">
      <div className="container flex items-center justify-between gap-4 h-16 lg:h-20">
        {/* Logo + Nav group */}
        <div className="flex items-center gap-8 xl:gap-10">
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
            {NAV.map((entry) =>
              entry.type === "link" ? (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={cn(
                    "px-2 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap",
                    isActive(pathname, entry.href)
                      ? "text-burgundy bg-burgundy/5"
                      : "text-charcoal/70 hover:text-burgundy hover:bg-burgundy/5"
                  )}
                >
                  {entry.label}
                </Link>
              ) : (
                <DesktopDropdown
                  key={entry.label}
                  label={entry.label}
                  items={entry.items}
                  pathname={pathname}
                />
              )
            )}
          </nav>
        </div>

        {/* Desktop right cluster — visible at lg+ */}
        <div className="hidden lg:flex items-center gap-2">
          <FavoritesLink count={favCount} variant="desktop" />
          <Link href="/properties" className="btn-outline py-2 px-3 text-sm whitespace-nowrap">
            Browse Properties
          </Link>
          <Link href="/join" className="btn-primary py-2 px-3 text-sm whitespace-nowrap">
            Join Max Realty
          </Link>
        </div>

        {/* Mobile favorites + menu */}
        <div className="flex items-center gap-1 lg:hidden">
          <FavoritesLink count={favCount} variant="desktop" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-charcoal"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-stone-border pb-4">
          <nav className="container flex flex-col gap-1 pt-3">
            {NAV.map((entry) =>
              entry.type === "link" ? (
                <Link
                  key={entry.href}
                  href={entry.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-md",
                    isActive(pathname, entry.href)
                      ? "text-burgundy bg-burgundy/5"
                      : "text-charcoal/70 hover:text-burgundy"
                  )}
                >
                  {entry.label}
                </Link>
              ) : (
                <MobileDropdown
                  key={entry.label}
                  label={entry.label}
                  items={entry.items}
                  pathname={pathname}
                  onLinkClick={() => setMobileOpen(false)}
                />
              )
            )}

            <FavoritesLink
              count={favCount}
              variant="mobile"
              onClick={() => setMobileOpen(false)}
            />

            <div className="mt-3 px-3 flex flex-col gap-2">
              <Link
                href="/properties"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-burgundy border border-burgundy/30 rounded-md text-center"
              >
                Browse Properties
              </Link>
              <Link
                href="/join"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md text-center"
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
