"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface PreloadStats {
  totalRoutes: number;
  loadedRoutes: number;
  isComplete: boolean;
}

export function useSimplePreloader() {
  const [stats, setStats] = useState<PreloadStats>({
    totalRoutes: 0,
    loadedRoutes: 0,
    isComplete: false,
  });
  const [isPreloading, setIsPreloading] = useState(false);
  const router = useRouter();

  const startPreloading = useCallback(
    async (routes: string[]) => {
      if (isPreloading || routes.length === 0) return;

      setIsPreloading(true);
      setStats({
        totalRoutes: routes.length,
        loadedRoutes: 0,
        isComplete: false,
      });

      let loadedCount = 0;

      for (const route of routes) {
        try {
          router.prefetch(route);
          loadedCount++;

          setStats({
            totalRoutes: routes.length,
            loadedRoutes: loadedCount,
            isComplete: loadedCount >= routes.length,
          });
        } catch (error) {
          console.warn(`Failed to prefetch route: ${route}`, error);
        }
      }

      setIsPreloading(false);

      if (process.env["NODE_ENV"] === "development") {
        console.log(
          `Route prefetching complete: ${loadedCount}/${routes.length} routes loaded`,
        );
      }
    },
    [isPreloading, router],
  );

  return {
    startPreloading,
    stats,
    isPreloading,
  };
}
