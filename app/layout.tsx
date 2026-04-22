import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    "Max Realty Solutions is a modern real estate brokerage in Thornhill, Ontario. Flexible commission plans for agents, expert guidance for buyers, sellers & investors across the GTA.",
  keywords: [
    "real estate brokerage Thornhill",
    "real estate agents GTA",
    "100% commission brokerage Ontario",
    "join real estate brokerage",
    "homes for sale Vaughan",
    "commercial real estate GTA",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.maxrealtysolutions.ca",
    siteName: "Max Realty Solutions",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
