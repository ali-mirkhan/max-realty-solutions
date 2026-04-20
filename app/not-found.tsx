import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container py-32 text-center">
      <p className="font-serif text-6xl font-bold text-burgundy/20 mb-4">404</p>
      <h1 className="font-serif text-2xl font-semibold text-charcoal mb-2">Page Not Found</h1>
      <p className="text-sm text-charcoal/60 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        <ArrowLeft size={16} /> Back to Home
      </Link>
    </div>
  );
}
