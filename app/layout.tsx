import { EnhancedChatWidget } from "@/components/chat";
import {
  BackToTop,
  ConditionalLayout,
  EntranceProvider,
  ScrollRestoration,
} from "@/components/layout";
import { PageTransition } from "@/components/ui/page-transition";
import { AuthProvider } from "@/contexts/auth-context";
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
  maximumScale: 1, // Prevent zoom on input focus
  userScalable: false, // Disable pinch to zoom for better touch UX
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fieldporter.com"),
  title: {
    template: "FIELDPORTER | %s",
    default: "FIELDPORTER - Build Your Own AI Advantage",
  },
  description:
    "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders. We specialize in Claude API, n8n, and Cursor development.",
  keywords:
    "AI automation, LLM integration, strategic research, workflow automation, FIELDPORTER, AI consulting",
  authors: [{ name: "FIELDPORTER" }],
  creator: "FIELDPORTER",
  publisher: "FIELDPORTER",
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "standard",
    "max-snippet": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "standard",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      // Default fallback (for browsers that don't support media queries)
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      // Light mode favicon (black F on transparent/white background)
      {
        url: "/favicon-light.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      // Dark mode favicon (white F on transparent/dark background)
      {
        url: "/favicon-dark.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
      // Multiple sizes for better browser support
      {
        url: "/favicon-light-16.png",
        type: "image/png",
        sizes: "16x16",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark-16.png",
        type: "image/png",
        sizes: "16x16",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light-48.png",
        type: "image/png",
        sizes: "48x48",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark-48.png",
        type: "image/png",
        sizes: "48x48",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/apple-icon-light.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/apple-icon-dark.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon-light.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        url: "/favicon-dark.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fieldporter.com",
    title: "FIELDPORTER - Build Your Own AI Advantage",
    description:
      "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders.",
    siteName: "FIELDPORTER",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FIELDPORTER - Build Your Own AI Advantage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELDPORTER - Build Your Own AI Advantage",
    description:
      "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders.",
    creator: "@fieldporter",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.add(theme);
              } catch {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-white dark:bg-black transition-colors duration-300`}
      >
        <AuthProvider>
          <EntranceProvider>
            <ScrollRestoration />
            <ConditionalLayout>
              <PageTransition>
                <main className="flex-1">{children}</main>
              </PageTransition>
            </ConditionalLayout>
            <BackToTop />
            <EnhancedChatWidget />
          </EntranceProvider>
        </AuthProvider>

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FIELDPORTER",
              alternateName: "FIELDPORTER Limited",
              url: "https://fieldporter.com",
              logo: "https://fieldporter.com/favicon-dark.png",
              description:
                "AI integration and automation consulting for ambitious founders",
              email: "hello@fieldporter.com",
              foundingDate: "2023",
              founders: [
                {
                  "@type": "Person",
                  name: "Freddy Krueger",
                  jobTitle: "Founder & AI Integration Specialist",
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "NZ",
                addressLocality: "Auckland",
              },
              sameAs: [
                "https://twitter.com/fieldporter",
                "https://linkedin.com/company/fieldporter",
                "https://github.com/fieldporter",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://fieldporter.com/contact",
                email: "hello@fieldporter.com",
              },
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "AI Integration Consulting",
                    description:
                      "Transform your business with custom AI solutions",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Workflow Automation",
                    description:
                      "Automate repetitive tasks and streamline operations",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Strategic AI Research",
                    description:
                      "Data-driven insights for competitive advantage",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "AI Training & Implementation",
                    description:
                      "Team training and hands-on AI system implementation",
                  },
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
                  primaryCursor.style.boxShadow = \`0 0 16px \${glow}\`;
                  
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
                  if (animationId) {
                    cancelAnimationFrame(animationId);
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
