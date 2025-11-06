import Image from "next/image";
import type { Metadata } from "next";
import ThinkGlobalLogo from "./components/Gemini_Generated_Image_obtmw9obtmw9obtm.png";

export const metadata: Metadata = {
  title: "ANZ Market Expansion for Cyberport Portfolio",
  description:
    "Partnership overview between Think Global and Voluntas Group supporting Cyberport HK startups expanding into ANZ.",
  robots: { index: false },
  icons: {
    icon: [{ url: "/partnership-assets/voluntas-logo.png", type: "image/png" }],
  },
};

export default function Page() {
  return (
    <div
      className="min-h-screen text-slate-900 relative"
      style={{ backgroundColor: "#fafafa" }}
    >
      <style>{`
        .confidential-banner {
          background: linear-gradient(90deg, #8B0000, #DC143C);
          color: white;
          padding: 8px;
          text-align: center;
          font-size: 12px;
          letter-spacing: 2px;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 1000;
        }
        .logo-container { display: flex; align-items: center; justify-content: center; gap: 36px; padding: 16px 0; }
        .branding-logo { height: clamp(60px, 10vw, 100px); width: auto; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
        .think-global-logo { border-radius: 12px; }
        .premium-card { background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85)); backdrop-filter: blur(10px); border: 1px solid rgba(30,58,95,0.1); box-shadow: 0 10px 30px rgba(30,58,95,0.1), 0 1px 3px rgba(0,0,0,0.05); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .premium-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(30,58,95,0.15), 0 2px 6px rgba(0,0,0,0.08); }
        .headshot { width: 180px; height: 180px; border-radius: 50%; border: 4px solid #daa520; box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        @media (max-width: 640px) { .headshot { width: 120px; height: 120px; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); }}
        .animate-on-scroll { animation: fadeInUp 0.6s ease-out both; }
        .hero-title { font-size: clamp(26px, 5.5vw, 60px); line-height: 1.15; }
        .body-text { font-size: clamp(14px, 2.4vw, 16px); line-height: 1.7; }
        .section { scroll-margin-top: 140px; }
        .site-nav { position: sticky; top: 6px; z-index: 999; backdrop-filter: blur(10px); background: rgba(250,250,250,0.9); border: 1px solid rgba(30,58,95,0.06); box-shadow: 0 4px 16px rgba(30,58,95,0.06); border-radius: 14px; margin: 0 auto; max-width: 1000px; }
        .site-nav .nav-inner { align-items: center; justify-content: center; gap: 8px; padding: 8px 12px; }
        .site-nav a { color: #334155; font-weight: 600; text-decoration: none; padding: 6px 12px; border-radius: 9999px; transition: color .2s, background .2s, transform .2s; }
        .site-nav a:hover { color: #1e3a5f; background: rgba(30,58,95,0.06); transform: translateY(-1px); }
        .site-nav a:focus-visible { outline: 2px solid #1e3a5f; outline-offset: 2px; }
        .mobile-nav a { font-size: 12px; background: rgba(255,255,255,0.8); padding: 6px 10px; border-radius: 9999px; color: #475569; }
        .mobile-nav a:hover { color: #1e3a5f; }
        @media (max-width: 640px) { .logo-container { gap: 20px; } }
        /* Name/title mobile fixes */
        @media (max-width: 640px) {
          .person-name { font-size: 1.125rem; white-space: normal; word-break: normal; hyphens: none; min-width: 100%; }
          .person-title { font-size: 0.9rem; white-space: normal; word-break: normal; }
        }
        /* Reduce motion respect */
        @media (prefers-reduced-motion: reduce) { .animate-on-scroll { animation: none !important; } }
      `}</style>
      {/* Confidential banner */}
      <div className="confidential-banner">
        CONFIDENTIAL - FOR AUTHORIZED DISTRIBUTION ONLY
      </div>

      <header className="px-4 md:px-8 lg:px-16 max-w-6xl mx-auto pt-16 pb-6">
        <div className="logo-container">
          <Image
            src="/partnership-assets/voluntas-logo.png"
            alt="Voluntas Group Logo"
            width={800}
            height={200}
            className="branding-logo object-contain"
            priority
          />
          <Image
            src={ThinkGlobalLogo}
            alt="Think Global Logo"
            width={800}
            height={200}
            className="branding-logo think-global-logo object-contain"
            priority
          />
        </div>
        <nav className="site-nav" role="navigation" aria-label="Page sections">
          <div className="nav-inner hidden md:flex items-center justify-center gap-2 py-2">
            <a href="#people">Key People</a>
            <a href="#overview">Overview</a>
            <a href="#pillars">Execution Pillars</a>
            <a href="#geographic">Geographic Advantage</a>
            <a href="#conduit">Strategic Conduit</a>
          </div>
          <div className="md:hidden overflow-x-auto">
            <div className="mobile-nav flex gap-2 px-4 py-2 min-w-max">
              <a href="#people">People</a>
              <a href="#overview">Overview</a>
              <a href="#pillars">Pillars</a>
              <a href="#geographic">Geography</a>
              <a href="#conduit">Conduit</a>
            </div>
          </div>
        </nav>
      </header>

      <main
        className="px-4 md:px-8 lg:px-16 max-w-6xl mx-auto pb-20 relative"
        suppressHydrationWarning
      >
        {/* Watermark */}
        <div
          className="pointer-events-none select-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(30,58,95,0.06) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <section className="mb-20 relative animate-on-scroll section" id="top">
          <h1 className="hero-title font-bold text-[#1e3a5f]">
            ANZ Market Expansion for Cyberport Portfolio
          </h1>
          <p className="mt-3 text-slate-700 max-w-3xl body-text">
            A focused partnership to help Cyberport startups validate, enter,
            and scale across Australia and New Zealand with local execution,
            governance, and measurable outcomes.
          </p>
        </section>

        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 relative section"
          id="people"
        >
          <div className="premium-card rounded-xl p-6 animate-on-scroll">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 mb-4">
              <div className="relative shrink-0 headshot overflow-hidden">
                <Image
                  src="/partnership-assets/david-thomas.jpg"
                  alt="David Thomas"
                  fill
                  sizes="(max-width: 640px) 120px, 180px"
                  className="object-cover"
                />
              </div>
              <div className="w-full">
                <h3 className="person-name break-words font-semibold text-[#1e3a5f] text-lg sm:text-xl">
                  David Thomas
                </h3>
                <p className="person-title text-slate-600 text-sm sm:text-base">
                  Think Global | Principal
                </p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed body-text">
              David Thomas is a globally respected thought leader, keynote
              speaker and entrepreneur with a mission to empower investors,
              entrepreneurs and business leaders to thrive in the Asia Pacific
              region. With over 30 years of hands-on experience living and
              working across Europe, Hong Kong, China, Australia and SE Asia,
              David brings unparalleled insights, experience and connectivity to
              the world's most dynamic, complex and lucrative markets
            </p>
          </div>
          <div className="premium-card rounded-xl p-6 animate-on-scroll">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 mb-4">
              <div className="relative shrink-0 headshot overflow-hidden">
                <Image
                  src="/partnership-assets/charlie-streeter.jpg"
                  alt="Charlie Streeter"
                  fill
                  sizes="(max-width: 640px) 120px, 180px"
                  className="object-cover"
                />
              </div>
              <div className="w-full">
                <h3 className="person-name break-words font-semibold text-[#1e3a5f] text-lg sm:text-xl">
                  Charlie Streeter
                </h3>
                <p className="person-title text-slate-600 text-sm sm:text-base">
                  Voluntas Group | Managing Partner
                </p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed body-text">
              Charlie Streeter brings a 20-year track record in international
              finance and tech to his advisory role. His career began in
              investment banking at institutions like ABN AMRO in London and Sun
              Hung Kai & Co. in HK, before moving into leadership positions
              within enterprise software at Blackhawk Network (a Silver Lake
              company). He now applies this cross-functional expertise to help
              startups and early-stage companies win in competitive markets. His
              focus areas include commercial strategy, sales execution, securing
              capital, and building the foundational teams required for rapid
              and sustainable scale.
            </p>
          </div>
        </section>

        <section
          className="mb-20 relative animate-on-scroll section"
          id="overview"
        >
          <div className="border-l-4 border-[#daa520] pl-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1e3a5f]">
              Strategic Partnership Overview
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="premium-card rounded-xl p-6">
              <h3 className="font-semibold text-[#1e3a5f] mb-2">Objective</h3>
              <p className="text-slate-700 body-text">
                To establish a premier, end-to-end platform for Cyberport's
                technology companies to successfully enter, scale, and exit
                within the Australia-New Zealand (ANZ) market.
              </p>
            </div>
            <div className="premium-card rounded-xl p-6">
              <h3 className="font-semibold text-[#1e3a5f] mb-2">
                The Partnership
              </h3>
              <p className="text-slate-700 body-text">
                Two specialist consultancies are uniting to offer a unique,
                complementary service suite to Cyberport. This partnership
                combines deep strategic advisory with high-value transactional
                expertise, creating a single, powerful conduit for growth and
                exit in the ANZ region.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mb-20 relative animate-on-scroll section"
          id="pillars"
        >
          <div className="border-l-4 border-[#daa520] pl-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1e3a5f]">
              Key Execution Pillars
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="premium-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1e3a5f] text-white font-semibold">
                  1
                </span>
                <h3 className="font-semibold text-[#1e3a5f]">
                  Strategic & Corporate Advisory
                </h3>
              </div>
              <p className="text-slate-700 body-text">
                Providing long-term, partnership-oriented advisory. We architect
                and execute systematic growth plans purpose-built to scale
                high-value tech companies geographically, ensuring sustainable
                market entry and expansion.
              </p>
            </div>
            <div className="premium-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1e3a5f] text-white font-semibold">
                  2
                </span>
                <h3 className="font-semibold text-[#1e3a5f]">
                  Boutique M&A & Exit Platform
                </h3>
              </div>
              <p className="text-slate-700 body-text">
                Operating a dedicated global tech scaling and exit platform. We
                work directly with founders and boards to deliver structured
                advisory, value-optimizing transformation, and high-impact
                transactions, maximizing valuation while protecting founder
                focus and investor returns.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="premium-card rounded-xl p-6">
              <h4 className="font-semibold text-[#1e3a5f] mb-1">
                Supporting Mechanism
              </h4>
              <p className="text-slate-700 body-text">
                Both pillars are underpinned by targeted capital introductions,
                connecting companies with the right investors and funding
                partners throughout their growth journey.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mb-20 relative animate-on-scroll section"
          id="geographic"
        >
          <div className="border-l-4 border-[#daa520] pl-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1e3a5f]">
              Geographic Advantage
            </h2>
          </div>
          <div
            className="mt-3 text-slate-700"
            style={{ fontSize: 16, lineHeight: 1.7 }}
          >
            Our operational structure is a key strategic differentiator:
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="premium-card rounded-xl p-6">
              <h3 className="font-semibold text-[#1e3a5f]">
                North (Hong Kong HQ)
              </h3>
              <p className="text-slate-700 mt-1 body-text">
                Our core team is based in HK, ensuring seamless communication,
                deep understanding of portfolio needs, and immediate access to
                founders.
              </p>
            </div>
            <div className="premium-card rounded-xl p-6">
              <h3 className="font-semibold text-[#1e3a5f]">South (ANZ HQ)</h3>
              <p className="text-slate-700 mt-1 body-text">
                Our headquarters in the South is established across offices in
                Australia and New Zealand, providing direct, native market
                expertise, established networks, and boots-on-the-ground
                execution capability.
              </p>
            </div>
            <div className="premium-card rounded-xl p-6">
              <h3 className="font-semibold text-[#1e3a5f]">
                The Connective Tissue
              </h3>
              <p className="text-slate-700 mt-1 body-text">
                This north-south axis is strengthened by our extensive networks
                and partners across Southeast Asia (SEA), enabling us to support
                a holistic Asia-Pacific strategy. We facilitate not just a
                direct entry, but also strategic staging and expansion through
                the vital markets in between.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mb-20 relative animate-on-scroll section"
          id="conduit"
        >
          <div className="border-l-4 border-[#daa520] pl-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1e3a5f]">
              Our Role as a Strategic Conduit for Cyberport
            </h2>
          </div>
          <div className="mt-4 premium-card rounded-xl p-6">
            <p className="text-slate-700 body-text">
              Our team is positioned to act as a formal strategic conduit for
              Cyberport, actively promoting Hong Kong and its ecosystem to
              inbound companies in the ANZ region and facilitating their entry
              into its programs. Additionally, Voluntas has a dedicated fund
              platform currently in formation. We can provide further details on
              this initiative and its potential synergies as the structure
              develops, first round is underway out of NZ.
            </p>
          </div>
        </section>

        <footer className="relative mt-20">
          <div className="premium-card rounded-2xl p-8 md:p-12 mx-4 md:mx-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-[#1e3a5f] mb-4">
                  Hong Kong
                </h4>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-slate-800">
                    David Thomas
                  </p>
                  <p className="text-slate-600">
                    <a
                      href="mailto:david@thinkglobal.com"
                      className="text-[#1e3a5f] hover:text-[#daa520] transition-colors duration-200 font-medium"
                    >
                      david@thinkglobal.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-[#1e3a5f] mb-4">
                  Australia & New Zealand
                </h4>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-slate-800">
                    Charlie Streeter
                  </p>
                  <p className="text-slate-600">
                    <a
                      href="mailto:charlie@voluntasgroup.com"
                      className="text-[#1e3a5f] hover:text-[#daa520] transition-colors duration-200 font-medium"
                    >
                      charlie@voluntasgroup.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <div className="flex items-center justify-center mb-8">
                <Image
                  src="/partnership-assets/voluntas-logo.png"
                  alt="Voluntas Group Logo"
                  width={400}
                  height={120}
                  className="h-20 w-auto object-contain opacity-90"
                />
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm font-semibold text-slate-700">
                  © {new Date().getFullYear()} Think Global & Voluntas Group
                </p>
                <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  This document contains proprietary information and is intended
                  solely for the recipient. Distribution is prohibited without
                  written consent.
                </p>
              </div>
            </div>
          </div>
        </footer>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Smooth scroll for internal anchors
              document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                  const href = this.getAttribute('href');
                  if (!href) return;
                  const target = document.querySelector(href);
                  if (!target) return;
                  e.preventDefault();
                  const nav = document.querySelector('.site-nav');
                  const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                  const offset = navHeight + 10;
                  const rect = target.getBoundingClientRect();
                  const top = rect.top + window.pageYOffset - offset;
                  window.scrollTo({ top, behavior: 'smooth' });
                });
              });

              // Intersection Observer for scroll reveal
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                  }
                });
              }, { threshold: 0.15 });

              document.querySelectorAll('.animate-on-scroll').forEach((el) => {
                observer.observe(el);
              });


              // Elevate nav on scroll
              const navEl = document.querySelector('.site-nav');
              function onScrollNav() {
                if (!navEl) return;
                if (window.scrollY > 10) navEl.classList.add('scrolled'); else navEl.classList.remove('scrolled');
              }
              window.addEventListener('scroll', onScrollNav, { passive: true });
              onScrollNav();
            `,
          }}
        />
      </main>
    </div>
  );
}
