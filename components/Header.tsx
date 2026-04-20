"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
  { href: "/commercial", label: "Commercial" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-stone-warm/95 backdrop-blur-md border-b border-stone-border">
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-serif text-xl lg:text-2xl font-bold text-burgundy tracking-tight">
            Max Realty
          </span>
          <span className="font-sans text-xs lg:text-sm font-medium text-charcoal/60 uppercase tracking-widest">
            Solutions
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                pathname === link.href
                  ? "text-burgundy bg-burgundy/5"
                  : "text-charcoal/70 hover:text-burgundy hover:bg-burgundy/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/properties" className="btn-outline py-2 px-4">
            Browse Properties
          </Link>
          <Link href="/join" className="btn-primary py-2 px-4">
            Join Max Realty
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-charcoal"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-stone-warm border-t border-stone-border pb-4">
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
