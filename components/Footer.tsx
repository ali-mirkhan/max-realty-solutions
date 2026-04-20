import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
  { href: "/commercial", label: "Commercial" },
  { href: "/property-management", label: "Property Management" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/join", label: "Join Us" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-[#E8E4DE]">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="Max Realty Solutions Ltd., Brokerage"
                width={150}
                height={50}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-[#E8E4DE]/70 leading-relaxed mb-6">
              A modern real estate brokerage built for independent agents and
              serious buyers, sellers &amp; investors across the Greater Toronto Area.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Facebook", letter: "F" },
                { label: "Instagram", letter: "I" },
                { label: "LinkedIn", letter: "L" },
                { label: "Twitter", letter: "X" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[#E8E4DE]/20 flex items-center justify-center text-[#E8E4DE]/60 hover:text-white hover:border-burgundy hover:bg-burgundy/20 transition-all text-xs font-medium"
                >
                  {s.letter}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#E8E4DE]/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-[#E8E4DE]/70">
              <li>
                <span className="block text-[#E8E4DE]/50 text-xs uppercase tracking-wider mb-0.5">Phone</span>
                <a href="tel:+14162266008" className="hover:text-white transition-colors">
                  416-226-6008
                </a>
              </li>
              <li>
                <span className="block text-[#E8E4DE]/50 text-xs uppercase tracking-wider mb-0.5">Fax</span>
                <span>647-499-5895</span>
              </li>
              <li>
                <span className="block text-[#E8E4DE]/50 text-xs uppercase tracking-wider mb-0.5">Email</span>
                <a href="mailto:info@maxrealtysolutions.com" className="hover:text-white transition-colors">
                  info@maxrealtysolutions.com
                </a>
              </li>
              <li>
                <span className="block text-[#E8E4DE]/50 text-xs uppercase tracking-wider mb-0.5">Office</span>
                <span>
                  8220 Bayview Avenue, Unit 200<br />
                  Thornhill, ON L3T 2S2
                </span>
              </li>
              <li>
                <span className="block text-[#E8E4DE]/50 text-xs uppercase tracking-wider mb-0.5">Hours</span>
                <span>Mon–Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* For Agents */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4">For Agents</h4>
            <p className="text-sm text-[#E8E4DE]/70 leading-relaxed mb-4">
              Keep more of your commission. Flexible plans, real broker support, and commercial opportunities.
            </p>
            <Link
              href="/join"
              className="inline-block px-5 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:bg-burgundy-dark transition-colors"
            >
              Join Max Realty
            </Link>
          </div>
        </div>

        {/* RECO Disclaimer */}
        <div className="mt-16 pt-8 border-t border-[#E8E4DE]/10">
          <p className="text-xs text-[#E8E4DE]/40 leading-relaxed max-w-4xl">
            Max Realty Solutions Ltd., Brokerage is a licensed real estate brokerage registered with
            the Real Estate Council of Ontario (RECO). All agents associated with Max Realty Solutions
            are licensed and regulated under the Trust in Real Estate Services Act, 2002 (TRESA). The
            information provided on this website is for general informational purposes only and does
            not constitute professional advice. Property listings, prices, and availability are subject
            to change without notice.
          </p>
          <p className="text-xs text-[#E8E4DE]/30 mt-4">
            &copy; {new Date().getFullYear()} Max Realty Solutions Ltd., Brokerage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
