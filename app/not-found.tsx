import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page does not exist. Return home, browse services, or contact FIELDPORTER.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-glass backdrop-blur-md">
        <div className="text-center">
          <p className="mb-2 text-sm font-medium tracking-wide text-white/50">
            404
          </p>
          <h1 className="mb-3 text-heading-xl font-semibold text-white">
            Page not found
          </h1>
          <p className="mb-8 text-body-md text-white/70">
            This page does not exist or the link is out of date. Use one of the
            links below to keep going.
          </p>

          <nav aria-label="Recovery links" className="space-y-3">
            <Button
              variant="fieldporter-blue"
              size="default"
              asChild
              enableAnimations={false}
              className="w-full"
            >
              <Link href="/">Home</Link>
            </Button>
            <Button
              variant="fieldporter-secondary"
              size="default"
              asChild
              enableAnimations={false}
              className="w-full"
            >
              <Link href="/services">Services</Link>
            </Button>
            <Button
              variant="fieldporter-secondary"
              size="default"
              asChild
              enableAnimations={false}
              className="w-full"
            >
              <Link href="/contact">Contact</Link>
            </Button>
          </nav>
        </div>
      </div>
    </main>
  );
}
