"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { EnhancedChatWidget } from "@/components/chat";
import { FieldporterStructuredData } from "./fieldporter-structured-data";

export function ConditionalFieldporterExtras() {
  const pathname = usePathname();

  const isIsolatedPartnerPage = pathname?.startsWith("/think-global-voluntas");

  if (isIsolatedPartnerPage) {
    return null;
  }

  return (
    <>
      <EnhancedChatWidget />
      <FieldporterStructuredData />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              // Wait for DOM to be fully ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initCursor);
              } else {
                initCursor();
              }
              
              function initCursor() {
                // More accurate mobile detection - exclude desktop with touch
                const userAgent = navigator.userAgent.toLowerCase();
                const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
                const isSmallScreen = window.innerWidth < 768;
                const isMobile = isMobileUA || isSmallScreen;
                
                if (isMobile) {
                  return;
                }
                
                // Create cursor elements dynamically to avoid hydration issues
                const primaryCursor = document.createElement('div');
                const trailCursor = document.createElement('div');
                
                primaryCursor.id = 'fieldporter-cursor-primary';
                trailCursor.id = 'fieldporter-cursor-trail';
                
                // Premium FIELDPORTER styling with optimized positioning
                primaryCursor.style.cssText = 'position: fixed;'+
                  '\nwidth: 8px;'+
                  '\nheight: 8px;'+
                  '\nbackground-color: #2563eb;'+
                  '\nborder-radius: 50%;'+
                  '\npointer-events: none;'+
                  '\nz-index: 99999;'+
                  '\ntransform: translate(-50%, -50%) translateZ(0);'+
                  '\nopacity: 0.8;'+
                  '\ndisplay: block;'+
                  '\ntransition: opacity 0.2s ease, background-color 0.3s ease;'+
                  '\nbox-shadow: 0 0 16px rgba(37, 99, 235, 0.3);'+
                  '\nwill-change: transform;'+
                  '\ncontain: layout style paint;';
                
                trailCursor.style.cssText = 'position: fixed;'+
                  '\nwidth: 4px;'+
                  '\nheight: 4px;'+
                  '\nbackground-color: #2563eb;'+
                  '\nborder-radius: 50%;'+
                  '\npointer-events: none;'+
                  '\nz-index: 99998;'+
                  '\ntransform: translate(-50%, -50%) translateZ(0);'+
                  '\nopacity: 0.4;'+
                  '\ndisplay: block;'+
                  '\ntransition: opacity 0.2s ease, background-color 0.3s ease;'+
                  '\nwill-change: transform;'+
                  '\ncontain: layout style paint;';
                
                // Add to DOM
                document.body.appendChild(primaryCursor);
                document.body.appendChild(trailCursor);
                
                let mouseX = 0;
                let mouseY = 0;
                let primaryX = 0;
                let primaryY = 0;
                let trailX = 0;
                let trailY = 0;
                let isVisible = false;
                
                // Optimized cursor movement with performance monitoring
                let animationId;
                function updateCursors() {
                  if (!isVisible) return;
                  
                  // Performance optimization: only update if significant movement
                  const deltaX = Math.abs(mouseX - primaryX);
                  const deltaY = Math.abs(mouseY - primaryY);
                  if (deltaX < 0.5 && deltaY < 0.5) {
                    animationId = requestAnimationFrame(updateCursors);
                    return;
                  }
                  
                  // Primary cursor follows with slight delay for smoothness
                  primaryX += (mouseX - primaryX) * 0.15;
                  primaryY += (mouseY - primaryY) * 0.15;
                  
                  // Trail cursor follows primary with more delay
                  trailX += (primaryX - trailX) * 0.08;
                  trailY += (primaryY - trailY) * 0.08;
                  
                  // Use transform for better performance than left/top
                  primaryCursor.style.transform = 'translate(-50%, -50%) translateZ(0) translate(' + primaryX + 'px, ' + primaryY + 'px)';
                  trailCursor.style.transform = 'translate(-50%, -50%) translateZ(0) translate(' + trailX + 'px, ' + trailY + 'px)';
                  
                  animationId = requestAnimationFrame(updateCursors);
                }
                
                // Zone-based color adaptation
                function updateCursorZones() {
                  const element = document.elementFromPoint(mouseX, mouseY);
                  if (!element) return;
                  
                  const zone = element.closest('[data-cursor-zone]')?.dataset.cursorZone;
                  let primaryColor = '#2563eb';
                  let primaryOpacity = '0.8';
                  let trailOpacity = '0.4';
                  let glow = 'rgba(37, 99, 235, 0.3)';
                  
                  switch(zone) {
                    case 'cta':
                      primaryColor = '#2563eb';
                      primaryOpacity = '1';
                      trailOpacity = '0.6';
                      glow = 'rgba(37, 99, 235, 0.5)';
                      break;
                    case 'text':
                      primaryColor = '#6b7280';
                      primaryOpacity = '0.6';
                      trailOpacity = '0.3';
                      glow = 'rgba(107, 114, 128, 0.2)';
                      break;
                    case 'interactive':
                      primaryColor = '#8b5cf6';
                      primaryOpacity = '1';
                      trailOpacity = '0.6';
                      glow = 'rgba(139, 92, 246, 0.4)';
                      break;
                    case 'danger':
                      primaryColor = '#ef4444';
                      primaryOpacity = '1';
                      trailOpacity = '0.6';
                      glow = 'rgba(239, 68, 68, 0.4)';
                      break;
                  }
                  
                  // Apply color changes with smooth transitions
                  primaryCursor.style.backgroundColor = primaryColor;
                  primaryCursor.style.opacity = primaryOpacity;
                  primaryCursor.style.boxShadow = '0 0 16px ' + glow;
                  
                  trailCursor.style.backgroundColor = primaryColor;
                  trailCursor.style.opacity = trailOpacity;
                }
                
                // Mouse event handlers with performance optimization
                let mouseMoveThrottle = 0;
                document.addEventListener('mousemove', (e) => {
                  mouseX = e.clientX;
                  mouseY = e.clientY;
                  
                  // Throttle zone updates for performance
                  if (Date.now() - mouseMoveThrottle > 50) {
                    updateCursorZones();
                    mouseMoveThrottle = Date.now();
                  }
                  
                  if (!isVisible) {
                    isVisible = true;
                    primaryCursor.style.opacity = '0.8';
                    trailCursor.style.opacity = '0.4';
                    updateCursors();
                  }
                });
                
                // Hide cursors when mouse leaves window
                document.addEventListener('mouseleave', () => {
                  isVisible = false;
                  primaryCursor.style.opacity = '0';
                  trailCursor.style.opacity = '0';
                  if (animationId) {
                    cancelAnimationFrame(animationId);
                  }
                });
                
                // Show cursors when mouse enters window
                document.addEventListener('mouseenter', () => {
                  if (isVisible) {
                    primaryCursor.style.opacity = '0.8';
                    trailCursor.style.opacity = '0.4';
                    updateCursors();
                  }
                });
                
                // Cleanup function for page unload
                window.addEventListener('beforeunload', () => {
                  // noop
                });
              }
            `,
        }}
      />
    </>
  );
}
