import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favorites",
  description:
    "Properties you've saved for later from Max Realty Solutions. Manage your shortlist of GTA homes and investments.",
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
