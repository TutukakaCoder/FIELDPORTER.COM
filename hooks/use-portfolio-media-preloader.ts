"use client";

import { useEffect } from "react";

const PORTFOLIO_IMAGE_URLS = [
  "/portfolio/volocean/dashboard-hero.png",
  "/portfolio/gogoprop/dashboard-hero.png",
  "/portfolio/gogoprop/pipeline-list.png",
  "/portfolio/gogoprop/deal-workspace.png",
  "/portfolio/gogoprop/borrower-dashboard.png",
] as const;

type NetworkInformationLike = {
  saveData?: boolean;
};

/**
 * Idle-warm portfolio screenshot URLs on /portfolio only.
 * Skips when Save-Data is on. Does not warm the Voluntas MP4.
 */
export function usePortfolioMediaPreloader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const connection = (
      navigator as Navigator & { connection?: NetworkInformationLike }
    ).connection;
    if (connection?.saveData) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const warm = () => {
      if (cancelled) return;
      for (const url of PORTFOLIO_IMAGE_URLS) {
        const img = new window.Image();
        img.src = url;
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => warm(), { timeout: 2000 });
    } else {
      timeoutId = setTimeout(warm, 300);
    }

    return () => {
      cancelled = true;
      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);
}
