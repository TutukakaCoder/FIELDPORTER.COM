import { EnhancedChatWidget } from "@/components/chat";
import {
    BackToTop,
    EntranceProvider,
    Footer,
    Header,
    ScrollRestoration,
} from "@/components/layout";
import { PageTransition } from "@/components/ui/page-transition";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fieldporter.com"),
  title: {
    template: "FIELDPORTER | %s",
    default: "FIELDPORTER - AI Integration & Automation Consulting",
  },
  description:
    "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders. Turn hours into minutes through intelligent automation.",
  keywords:
    "AI automation, LLM integration, strategic research, workflow automation, FIELDPORTER, AI consulting",
  authors: [{ name: "FIELDPORTER" }],
  creator: "FIELDPORTER",
  publisher: "FIELDPORTER",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fieldporter.com",
    title: "FIELDPORTER - AI Integration & Automation Consulting",
    description:
      "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders. Turn hours into minutes through intelligent automation.",
    siteName: "FIELDPORTER",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELDPORTER - AI Integration & Automation Consulting",
    description:
      "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders. Turn hours into minutes through intelligent automation.",
    creator: "@fieldporter",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className} style={{ backgroundColor: "#000000" }}>
        <EntranceProvider>
          <ScrollRestoration />
          <Header />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
          <BackToTop />
          <EnhancedChatWidget />
        </EntranceProvider>

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FIELDPORTER",
              description:
                "Turn hours into minutes through intelligent automation. We build AI workflow automation, teach advanced LLM integration, and conduct strategic research using AI agents.",
              url: "https://fieldporter.com",
              logo: "https://fieldporter.com/images/fieldporter-logo.png",
              sameAs: ["https://twitter.com/fieldporter"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://fieldporter.com/contact",
              },
              service: [
                {
                  "@type": "Service",
                  name: "Strategic Research Intelligence",
                  description: "Multi-model AI research and validation systems",
                },
                {
                  "@type": "Service",
                  name: "Rapid Development Solutions",
                  description: "Custom application development and automation",
                },
                {
                  "@type": "Service",
                  name: "Workflow Optimization",
                  description: "Business process automation and optimization",
                },
                {
                  "@type": "Service",
                  name: "AI Training & Implementation",
                  description: "Team training and AI system implementation",
                },
              ],
            }),
          }}
        />

        {/* Premium cursor system initialization */}
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
                primaryCursor.style.cssText = \`
                  position: fixed;
                  width: 8px;
                  height: 8px;
                  background-color: #2563eb;
                  border-radius: 50%;
                  pointer-events: none;
                  z-index: 99999;
                  transform: translate(-50%, -50%) translateZ(0);
                  opacity: 0.8;
                  display: block;
                  transition: opacity 0.2s ease, background-color 0.3s ease;
                  box-shadow: 0 0 16px rgba(37, 99, 235, 0.3);
                  will-change: transform;
                  contain: layout style paint;
                \`;
                
                trailCursor.style.cssText = \`
                  position: fixed;
                  width: 4px;
                  height: 4px;
                  background-color: #2563eb;
                  border-radius: 50%;
                  pointer-events: none;
                  z-index: 99998;
                  transform: translate(-50%, -50%) translateZ(0);
                  opacity: 0.4;
                  display: block;
                  transition: opacity 0.2s ease, background-color 0.3s ease;
                  will-change: transform;
                  contain: layout style paint;
                \`;
                
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
                  primaryCursor.style.transform = \`translate(-50%, -50%) translateZ(0) translate(\${primaryX}px, \${primaryY}px)\`;
                  trailCursor.style.transform = \`translate(-50%, -50%) translateZ(0) translate(\${trailX}px, \${trailY}px)\`;
                  
                  animationId = requestAnimationFrame(updateCursors);
                }
                
                // Zone-based color adaptation
                let colorThrottle = 0;
                function updateCursorZones() {
                  const element = document.elementFromPoint(mouseX, mouseY);
                  if (!element) return;
                  
                  const zone = element.closest('[data-cursor-zone]')?.dataset.cursorZone;
                  let primaryColor = '#2563eb';
                  let primaryOpacity = '0.8';
                  let trailOpacity = '0.4';
                  let glow = 'rgba(37, 99, 235, 0.3)';
                  
                  switch(zone) {
                    case 'hero':
                      primaryColor = '#ffffff';
                      primaryOpacity = '0.9';
                      trailOpacity = '0.5';
                      glow = 'rgba(255, 255, 255, 0.4)';
                      break;
                    case 'navigation':
                      primaryColor = '#374151';
                      primaryOpacity = '0.7';
                      trailOpacity = '0.3';
                      glow = 'rgba(55, 65, 81, 0.25)';
                      break;
                    case 'cta':
                      primaryColor = '#2563eb';
                      primaryOpacity = '1';
                      trailOpacity = '0.6';
                      glow = 'rgba(37, 99, 235, 0.5)';
                      break;
                  }
                  
                  primaryCursor.style.backgroundColor = primaryColor;
                  primaryCursor.style.opacity = primaryOpacity;
                  primaryCursor.style.boxShadow = \`0 0 16px \${glow}\`;
                  trailCursor.style.backgroundColor = primaryColor;
                  trailCursor.style.opacity = trailOpacity;
                }
                
                // Mouse movement tracking
                document.addEventListener('mousemove', function(e) {
                  mouseX = e.clientX;
                  mouseY = e.clientY;
                  
                  if (!isVisible) {
                    isVisible = true;
                    primaryX = mouseX;
                    primaryY = mouseY;
                    trailX = mouseX;
                    trailY = mouseY;
                    updateCursors();
                  }
                  
                  // Throttle zone color checks for performance
                  if (colorThrottle % 5 === 0) {
                    updateCursorZones();
                  }
                  colorThrottle++;
                });
                
                // Handle mouse leave with cleanup
                document.addEventListener('mouseleave', function() {
                  primaryCursor.style.opacity = '0';
                  trailCursor.style.opacity = '0';
                  isVisible = false;
                  if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
