"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface PreloadConfig {
  routes: string[];
  images: string[];
  stylesheets: string[];
  scripts: string[];
}

interface PreloadStats {
  totalResources: number;
  loadedResources: number;
  progress: number;
  isComplete: boolean;
}

export function useResourcePreloader(config: PreloadConfig) {
  const [stats, setStats] = useState<PreloadStats>({
    totalResources: 0,
    loadedResources: 0,
    progress: 0,
    isComplete: false,
  });
  const [isPreloading, setIsPreloading] = useState(false);
  const router = useRouter();

  // Preload Next.js routes
  const preloadRoutes = useCallback(async () => {
    if (!config.routes.length) return 0;
    
    let loadedCount = 0;
    const promises = config.routes.map(async (route) => {
      try {
        router.prefetch(route);
        loadedCount++;
      } catch (error) {
        console.warn(`Failed to prefetch route: ${route}`, error);
      }
    });
    
    await Promise.allSettled(promises);
    return loadedCount;
  }, [config.routes, router]);

  // Preload images
  const preloadImages = useCallback(async () => {
    if (!config.images.length) return 0;
    
    const promises = config.images.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Still resolve on error to not block progress
        img.src = src;
      });
    });
    
    await Promise.allSettled(promises);
    return config.images.length;
  }, [config.images]);

  // Preload stylesheets
  const preloadStylesheets = useCallback(async () => {
    if (!config.stylesheets.length) return 0;
    
    const promises = config.stylesheets.map((href) => {
      return new Promise<void>((resolve) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "style";
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => resolve(); // Still resolve on error
        document.head.appendChild(link);
      });
    });
    
    await Promise.allSettled(promises);
    return config.stylesheets.length;
  }, [config.stylesheets]);

  // Preload JavaScript files
  const preloadScripts = useCallback(async () => {
    if (!config.scripts.length) return 0;
    
    const promises = config.scripts.map((src) => {
      return new Promise<void>((resolve) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "script";
        link.href = src;
        link.onload = () => resolve();
        link.onerror = () => resolve(); // Still resolve on error
        document.head.appendChild(link);
      });
    });
    
    await Promise.allSettled(promises);
    return config.scripts.length;
  }, [config.scripts]);

  // Main preload function
  const startPreloading = useCallback(async () => {
    if (isPreloading) return;
    
    setIsPreloading(true);
    
    const totalResources = 
      config.routes.length + 
      config.images.length + 
      config.stylesheets.length + 
      config.scripts.length;
    
    setStats({
      totalResources,
      loadedResources: 0,
      progress: 0,
      isComplete: false,
    });

    if (totalResources === 0) {
      setStats(prev => ({ ...prev, isComplete: true }));
      setIsPreloading(false);
      return;
    }

    let loadedCount = 0;
    const updateProgress = () => {
      const progress = Math.round((loadedCount / totalResources) * 100);
      setStats({
        totalResources,
        loadedResources: loadedCount,
        progress,
        isComplete: loadedCount >= totalResources,
      });
    };

    // Start all preloading tasks in parallel
    const tasks = [
      preloadRoutes(),
      preloadImages(),
      preloadStylesheets(),
      preloadScripts(),
    ];

    // Track progress as tasks complete
    const results = await Promise.allSettled(tasks);
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        loadedCount += result.value;
      }
      updateProgress();
    });

    setIsPreloading(false);
    
    if (process.env.NODE_ENV === "development") {
      console.log(`🚀 Resource preloading complete: ${loadedCount}/${totalResources} resources loaded`);
    }
  }, [isPreloading, config, preloadRoutes, preloadImages, preloadStylesheets, preloadScripts]);

  return {
    startPreloading,
    stats,
    isPreloading,
  };
} 