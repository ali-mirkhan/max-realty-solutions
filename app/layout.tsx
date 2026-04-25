import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schemas";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Max Realty Solutions | Real Estate Brokerage in Thornhill & GTA",
    template: "%s | Max Realty Solutions",
  },
  description:
    "Max Realty Solutions Ltd., Brokerage — serving buyers, sellers, investors and agents across the GTA since 2004. Residential, commercial, and investment real estate in Thornhill, Richmond Hill, Markham, Vaughan and Toronto.",
  keywords: [
    "real estate",
    "GTA real estate",
    "Thornhill real estate",
    "Richmond Hill homes",
    "Markham real estate",
    "Vaughan homes for sale",
    "commercial real estate GTA",
    "real estate brokerage Ontario",
    "RECO licensed brokerage",
    "join real estate brokerage",
  ],
  authors: [{ name: "Max Realty Solutions Ltd., Brokerage" }],
  creator: "Max Realty Solutions Ltd., Brokerage",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.maxrealtysolutions.com",
    siteName: "Max Realty Solutions",
    title: "Max Realty Solutions | Real Estate Brokerage in Thornhill & GTA",
    description:
      "Serving buyers, sellers, investors and agents across the GTA since 1988. Residential, commercial, and investment real estate.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Max Realty Solutions Ltd., Brokerage — GTA Real Estate Since 1988",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MaxRealtyTO",
    creator: "@MaxRealtyTO",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.maxrealtysolutions.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#7D1A2D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
