import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type InsightBreadcrumbItem = {
  label: string;
  href?: string;
};

type InsightBreadcrumbProps = {
  items: InsightBreadcrumbItem[];
  className?: string;
};

/**
 * Explicit breadcrumbs for insight articles only.
 * Pass real titles — never auto-generate from URL slugs.
 */
export function InsightBreadcrumb({ items, className }: InsightBreadcrumbProps) {
  if (items.length < 2) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-8", className)}>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-fieldporter-gray">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center min-w-0">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className="w-4 h-4 mx-1.5 text-fieldporter-gray/70 flex-shrink-0"
                />
              ) : null}

              {isLast || !item.href ? (
                <span
                  className="text-white font-medium truncate max-w-[min(100%,28rem)]"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fieldporter-blue rounded-sm px-0.5"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
