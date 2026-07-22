"use client";

import { useEffect } from "react";

/**
 * Desktop-only custom cursor. Runs in useEffect (not next/script) to avoid
 * appendChild / invalid-token runtime errors from inline script injection.
 */
export function PremiumCursor() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent,
      );
    const isSmallScreen = window.innerWidth < 768;
    if (isMobileUA || isSmallScreen) return;

    if (
      document.getElementById("fieldporter-cursor-primary") ||
      document.getElementById("fieldporter-cursor-trail")
    ) {
      return;
    }

    const primaryCursor = document.createElement("div");
    const trailCursor = document.createElement("div");

    primaryCursor.id = "fieldporter-cursor-primary";
    trailCursor.id = "fieldporter-cursor-trail";

    primaryCursor.style.cssText =
      "position:fixed;width:8px;height:8px;background-color:#2563eb;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%) translateZ(0);opacity:0.8;display:block;transition:opacity 0.2s ease, background-color 0.3s ease;box-shadow:0 0 16px rgba(37,99,235,0.3);will-change:transform;contain:layout style paint;";

    trailCursor.style.cssText =
      "position:fixed;width:4px;height:4px;background-color:#2563eb;border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%) translateZ(0);opacity:0.4;display:block;transition:opacity 0.2s ease, background-color 0.3s ease;will-change:transform;contain:layout style paint;";

    document.body.appendChild(primaryCursor);
    document.body.appendChild(trailCursor);

    let mouseX = 0;
    let mouseY = 0;
    let primaryX = 0;
    let primaryY = 0;
    let trailX = 0;
    let trailY = 0;
    let isVisible = false;
    let animationId = 0;
    let mouseMoveThrottle = 0;

    function updateCursors() {
      if (!isVisible) return;

      const deltaX = Math.abs(mouseX - primaryX);
      const deltaY = Math.abs(mouseY - primaryY);
      if (deltaX < 0.5 && deltaY < 0.5) {
        animationId = requestAnimationFrame(updateCursors);
        return;
      }

      primaryX += (mouseX - primaryX) * 0.15;
      primaryY += (mouseY - primaryY) * 0.15;
      trailX += (primaryX - trailX) * 0.08;
      trailY += (primaryY - trailY) * 0.08;

      primaryCursor.style.transform = `translate(-50%, -50%) translateZ(0) translate(${primaryX}px, ${primaryY}px)`;
      trailCursor.style.transform = `translate(-50%, -50%) translateZ(0) translate(${trailX}px, ${trailY}px)`;

      animationId = requestAnimationFrame(updateCursors);
    }

    function updateCursorZones() {
      const element = document.elementFromPoint(mouseX, mouseY);
      if (!element) return;

      const zone = element.closest("[data-cursor-zone]")?.getAttribute(
        "data-cursor-zone",
      );
      let primaryColor = "#2563eb";
      let primaryOpacity = "0.8";
      let trailOpacity = "0.4";
      let glow = "rgba(37, 99, 235, 0.3)";

      switch (zone) {
        case "cta":
          primaryOpacity = "1";
          trailOpacity = "0.6";
          glow = "rgba(37, 99, 235, 0.5)";
          break;
        case "text":
          primaryColor = "#6b7280";
          primaryOpacity = "0.6";
          trailOpacity = "0.3";
          glow = "rgba(107, 114, 128, 0.2)";
          break;
        case "interactive":
          primaryColor = "#8b5cf6";
          primaryOpacity = "1";
          trailOpacity = "0.6";
          glow = "rgba(139, 92, 246, 0.4)";
          break;
        case "danger":
          primaryColor = "#ef4444";
          primaryOpacity = "1";
          trailOpacity = "0.6";
          glow = "rgba(239, 68, 68, 0.4)";
          break;
      }

      primaryCursor.style.backgroundColor = primaryColor;
      primaryCursor.style.opacity = primaryOpacity;
      primaryCursor.style.boxShadow = `0 0 16px ${glow}`;
      trailCursor.style.backgroundColor = primaryColor;
      trailCursor.style.opacity = trailOpacity;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (Date.now() - mouseMoveThrottle > 50) {
        updateCursorZones();
        mouseMoveThrottle = Date.now();
      }

      if (!isVisible) {
        isVisible = true;
        primaryCursor.style.opacity = "0.8";
        trailCursor.style.opacity = "0.4";
        updateCursors();
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      primaryCursor.style.opacity = "0";
      trailCursor.style.opacity = "0";
      if (animationId) cancelAnimationFrame(animationId);
    };

    const onMouseEnter = () => {
      if (isVisible) {
        primaryCursor.style.opacity = "0.8";
        trailCursor.style.opacity = "0.4";
        updateCursors();
      }
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animationId) cancelAnimationFrame(animationId);
      primaryCursor.remove();
      trailCursor.remove();
    };
  }, []);

  return null;
}
