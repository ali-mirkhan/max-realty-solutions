import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  FileText,
  Home as HomeIcon,
  Lock,
  Phone,
  Scale,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import PropertyManagementForm from "@/components/PropertyManagementForm";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  propertyManagementServiceSchema,
} from "@/lib/schemas";

const CANONICAL =
  "https://www.maxrealtysolutions.com/services/property-management";

export const metadata: Metadata = {
  title: "Property & Asset Management Support | Max Realty Solutions",
  description:
    "Professional property oversight, reporting, and sale-preparation support for owners, investors, lenders, estate representatives, and legal professionals managing real estate that requires active attention.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Property & Asset Management Support | Max Realty Solutions",
    description:
      "Professional property oversight, reporting, and sale-preparation support for owners, investors, lenders, estate representatives, and legal professionals.",
    url: CANONICAL,
    type: "website",
    siteName: "Max Realty Solutions",
    images: [
      {
        url: "https://www.maxrealtysolutions.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Property & Asset Management Support — Max Realty Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property & Asset Management Support | Max Realty Solutions",
    description:
      "Professional property oversight, reporting, and sale-preparation support across the GTA and Golden Horseshoe.",
    images: ["https://www.maxrealtysolutions.com/og-default.jpg"],
  },
};

const WHO_WE_SUPPORT = [
  "Private lenders managing individual default files",
  "Mortgage Investment Corporations (MICs) with portfolio-level exposure",
  "Credit unions and financial institutions requiring documented, compliant field oversight",
  "Estate trustees and executors managing properties with outstanding obligations",
  "Law firms handling enforcement proceedings who need a property-side partner separate from legal billing",
  "Receivers and court-appointed officers operating under formal authority",
  "Investors and out-of-area owners managing vacant or transition-stage properties",
];

const FIVE_AREAS = [
  {
    icon: HomeIcon,
    title: "Vacant Property Oversight",
    body: "For properties that are empty, at risk, or between ownership stages.",
  },
  {
    icon: Scale,
    title: "Mortgage Enforcement Property Support",
    body: "For private lenders, MICs, and legal teams during default, power of sale, or recovery situations.",
  },
  {
    icon: Briefcase,
    title: "Estate & Trustee Property Support",
    body: "For estate properties requiring inspection, maintenance, valuation, and sale preparation.",
  },
  {
    icon: ShieldCheck,
    title: "Investor Asset Support",
    body: "For out-of-town owners and commercial investors who need reporting and coordination.",
  },
  {
    icon: ClipboardList,
    title: "Sale Preparation & Listing Coordination",
    body: "For properties moving toward disposition through Max Realty.",
  },
];

const RECOVERY_STAGES = [
  {
    icon: Search,
    title: "Initial Property Review",
    body: "We help review the property-side requirements of the file — known occupancy status, property type, condition concerns, tenancy considerations, and the intended path toward lease, sale, or recovery. Output is a documented scope of support and a recommended sequence of next steps.",
  },
  {
    icon: FileText,
    title: "Occupancy & Condition Reporting",
    body: "Where access is authorized, we coordinate occupancy observations, exterior and interior condition reporting, and time-stamped photo documentation. Reports are formatted for the lender's compliance and audit requirements and delivered within the timeline agreed at engagement.",
  },
  {
    icon: Lock,
    title: "Stabilization Coordination",
    body: "If the property requires attention, we help coordinate appropriate third-party support — securing access points where legally authorized, winterization, cleaning, landscaping, snow removal, and urgent repair coordination through licensed insured trades. Max Realty does not perform field labour directly.",
  },
  {
    icon: ClipboardList,
    title: "Communication & Documentation Coordination",
    body: "For income-producing properties, we assist with property-side documentation and access coordination on behalf of the owner, lender, receiver, or legal counsel. Tenant communication, lease and contract documentation review, and operational records are coordinated under their direction. Tenant remedies, lease enforcement, and rent collection remain with the authorized professional, not with Max Realty.",
  },
  {
    icon: Wrench,
    title: "Market Preparation",
    body: "When sale or leasing is the next step, we help coordinate cleaning, repairs, curb appeal, document organization, valuation support, and listing-readiness so the asset is presented professionally to the market.",
  },
  {
    icon: ArrowRight,
    title: "Disposition Support",
    body: "Where Max Realty is engaged for sale, we support the listing and transaction process through pricing strategy, marketing coordination, showings, offer review support, due diligence coordination, and closing-related property handoff. Listings are handled through Max Realty Solutions Ltd., Brokerage.",
  },
];

const REPORTING = [
  "A dedicated point of contact at Max Realty",
  "Time-stamped photo documentation on every visit",
  "Written inspection summaries aligned with internal compliance and audit requirements",
  "A complete chronological record from engagement through file closure",
  "A final accounting package on closed files for lender records and audit support",
];

export default function PropertyManagementSupportPage() {
  return (
    <>
      <JsonLd data={propertyManagementServiceSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.maxrealtysolutions.com" },
          {
            name: "Services",
            url: "https://www.maxrealtysolutions.com/services",
          },
          {
            name: "Property & Asset Management Support",
            url: CANONICAL,
          },
        ])}
      />

      {/* Hero */}
      <section className="relative bg-charcoal py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8E4DE]/80 border-l-2 border-burgundy pl-3 mb-5">
              Property & Asset Management Support
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Property & Asset Management Support
            </h1>
            <p className="text-base lg:text-lg text-[#E8E4DE]/85 leading-relaxed mb-5">
              Professional property oversight, reporting, and sale-preparation support for owners, investors,
              lenders, estate representatives, and legal professionals managing real estate that requires
              active attention.
            </p>
            <p className="text-sm text-[#E8E4DE]/70 leading-relaxed mb-8">
              Institutional asset oversight, enforcement support, and sale-preparation coordination. For
              residential property management for individual landlords, see our{" "}
              <Link
                href="/property-management"
                className="text-white underline decoration-burgundy/60 underline-offset-2 hover:decoration-burgundy"
              >
                Property Management service
              </Link>
              .
            </p>
            <Link
              href="#consultation-form"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
            >
              Request a Property Oversight Consultation <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why this exists */}
      <section className="bg-white py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="section-label">Why this exists</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              Why this exists
            </h2>
          </div>
          <div className="space-y-5 text-charcoal/75 leading-relaxed">
            <p>
              When a property is vacant, in transition, or part of an enforcement file, the legal and
              financial process is only one part of the risk. The physical asset still needs to be inspected,
              secured where legally authorized, maintained, and prepared for the next step.
            </p>
            <p>
              Max Realty Solutions provides property-side coordination, reporting, and sale-preparation
              support to help preserve value, reduce uncertainty, and move the asset toward lease, sale, or
              recovery — working alongside the lender&apos;s legal counsel, the estate&apos;s lawyer, the
              receiver, or the owner&apos;s authorized representative.
            </p>
          </div>
        </div>
      </section>

      {/* Who we support */}
      <section className="bg-stone-warm py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="section-label">Our Clients</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              Who we support
            </h2>
          </div>
          <ul className="space-y-3">
            {WHO_WE_SUPPORT.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 bg-white border border-stone-border rounded-md px-5 py-4"
              >
                <CheckCircle2
                  size={18}
                  className="text-burgundy shrink-0 mt-0.5"
                />
                <p className="text-sm text-charcoal/75 leading-relaxed">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Five Areas of Support */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">Our Services</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              What we do — Five Areas of Support
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {FIVE_AREAS.map(({ icon: Icon, title, body }, idx) => (
              <div
                key={title}
                className="bg-stone-light border border-stone-border rounded-lg p-6 flex gap-5 items-start"
              >
                <div className="w-11 h-11 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-burgundy" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-burgundy mb-1">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-1.5">
                    {title}
                  </h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Support the Property Recovery Cycle */}
      <section className="bg-stone-warm py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="section-label">Our Process</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              How We Support the Property Recovery Cycle
            </h2>
            <p className="text-sm lg:text-base text-charcoal/70 leading-relaxed">
              When a commercial or residential property moves into recovery — whether through default,
              estate transition, or owner-directed disposition — the property side of the file needs
              structured oversight from initial review through closing. The stages below outline how
              Max Realty supports each phase, working alongside the lender&apos;s legal counsel, the
              estate&apos;s representative, the receiver, or the owner&apos;s authorized professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {RECOVERY_STAGES.map(({ icon: Icon, title, body }, idx) => (
              <div
                key={title}
                className="bg-white border border-stone-border rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center">
                    <Icon size={18} className="text-burgundy" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-burgundy">
                    Stage {idx + 1}
                  </p>
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-10 bg-white border border-stone-border rounded-lg p-6 lg:p-7">
            <div className="flex items-start gap-4">
              <AlertTriangle
                size={18}
                className="text-burgundy shrink-0 mt-0.5"
              />
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Our role is property-side coordination and reporting. Legal notices, enforcement decisions,
                possession matters, court processes, insurance claims, tenant remedies, and rent collection
                remain with the appropriate legal, insurance, or authorized professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we report */}
      <section className="bg-white py-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="section-label">Reporting</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              How we report
            </h2>
          </div>

          <div className="bg-stone-light border border-stone-border rounded-xl p-7 lg:p-9">
            <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
              Every file receives:
            </p>
            <ul className="space-y-3 mb-6">
              {REPORTING.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <FileText size={16} className="text-burgundy shrink-0 mt-0.5" />
                  <p className="text-sm text-charcoal/75 leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
            <p className="text-sm text-charcoal/65 leading-relaxed border-t border-stone-border pt-5">
              Reporting cadence and format are aligned with each client&apos;s internal requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Why Max Realty */}
      <section className="bg-charcoal py-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8E4DE]/70 mb-3">
              Why Max Realty
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white">
              Why Max Realty
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-charcoal-light border border-white/10 rounded-lg p-6">
              <h3 className="font-serif text-lg font-semibold text-white mb-2">
                38 years in the GTA
              </h3>
              <p className="text-sm text-[#E8E4DE]/80 leading-relaxed">
                Brokerage of record since 1988, legal entity since 2004, fully independent since 2010.
                Over $750M+ in real estate transacted across residential, commercial, and investment-grade
                properties.
              </p>
            </div>
            <div className="bg-charcoal-light border border-white/10 rounded-lg p-6">
              <h3 className="font-serif text-lg font-semibold text-white mb-2">
                Brokerage continuity
              </h3>
              <p className="text-sm text-[#E8E4DE]/80 leading-relaxed">
                Many files ultimately require valuation, market preparation, or disposition support —
                creating a natural path for Max Realty to assist through the sale process where appropriate.
              </p>
            </div>
            <div className="bg-charcoal-light border border-white/10 rounded-lg p-6">
              <h3 className="font-serif text-lg font-semibold text-white mb-2">
                One accountable team
              </h3>
              <p className="text-sm text-[#E8E4DE]/80 leading-relaxed">
                From inspection through sale, clients deal with one principal contact and one standard of
                work — no coordination gaps between field, listing, and closing.
              </p>
            </div>
            <div className="bg-charcoal-light border border-white/10 rounded-lg p-6">
              <h3 className="font-serif text-lg font-semibold text-white mb-2">
                Local, focused, deployable
              </h3>
              <p className="text-sm text-[#E8E4DE]/80 leading-relaxed">
                Headquartered in Thornhill at 8220 Bayview Avenue, Unit 200. Coverage across the Greater
                Toronto Area and Golden Horseshoe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we do not do */}
      <section className="bg-white py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="section-label">Scope of Engagement</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              What we do not do
            </h2>
          </div>

          <div className="bg-stone-warm border border-stone-border rounded-lg p-7 lg:p-9">
            <div className="flex items-start gap-4 mb-5">
              <AlertTriangle
                size={20}
                className="text-burgundy shrink-0 mt-0.5"
              />
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Max Realty Solutions Ltd., Brokerage is not a law firm. We do not provide legal advice, legal
                opinions, or representation in proceedings. We do not adjust insurance claims. We do not
                provide remediation services for environmental hazards. We are not a maintenance company or
                contractor — all field work is performed by licensed insured third parties under our
                coordination.
              </p>
            </div>
            <p className="text-sm text-charcoal/65 leading-relaxed pl-9">
              Our role is to support — not replace — your legal counsel, your insurer, and your internal
              recovery process.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement & Form */}
      <section
        id="consultation-form"
        className="bg-stone-warm py-20 scroll-mt-24"
      >
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="section-label">Engagement</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Request a Property Oversight Consultation
            </h2>
            <p className="text-charcoal/70 leading-relaxed">
              Initial consultation is complimentary. We typically respond within one business day.
              Engagements can begin at any phase and scale to portfolio-level reporting where appropriate.
            </p>
          </div>

          <div className="bg-white border border-stone-border rounded-xl p-7 lg:p-9">
            <PropertyManagementForm />
          </div>

          <ul className="mt-8 max-w-2xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-charcoal/55">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-burgundy" /> Complimentary initial consultation
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-burgundy" /> Response within one business day
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-burgundy" /> Strict confidentiality
            </li>
          </ul>

          <div className="mt-10 text-center text-sm text-charcoal/60">
            <a
              href="tel:+14162266008"
              className="inline-flex items-center gap-1.5 hover:text-burgundy transition-colors"
            >
              <Phone size={14} className="text-burgundy" /> 416-226-6008
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
