# NUCLEAR SCROLL FREEZE INVESTIGATION

## CRITICAL: User Cannot Scroll Freely on Homepage

After years of work and multiple fix attempts, scroll is STILL broken. This prompt is for a fresh investigation that leaves NO STONE UNTURNED.

---

## SYMPTOM

- User cannot scroll freely up/down the homepage
- Scroll freezes, lags, or stops responding
- Problem persists despite multiple previous fix attempts

---

## KNOWN HISTORY (Previous Fixes That Did NOT Work)

1. Made event listeners passive - did not fix
2. Throttled header state updates - did not fix
3. Added scroll detection to pause 3D animations - did not fix
4. Removed CTA section animations - did not fix
5. CSS scroll optimizations (scroll-behavior: auto, overscroll-behavior-y: none) - did not fix

---

## ACTIVE WEBGL CANVAS COMPONENTS ON HOMEPAGE

These are STILL running on the homepage and each has multiple `useFrame` hooks running at 60fps:

### 1. hero-3d-background.tsx

- Location: `components/homepage/hero-3d-background.tsx`
- Has: Canvas, 2x useFrame hooks (particle system + camera controls)
- Loaded by: HeroSection via dynamic import

### 2. hero-3d-background-simplified.tsx

- Location: `components/homepage/hero-3d-background-simplified.tsx`
- Has: Canvas, 2x useFrame hooks
- Loaded by: HeroSection as fallback

### 3. trust-particles-3d.tsx

- Location: `components/homepage/trust-particles-3d.tsx`
- Has: Canvas, 1x useFrame hook
- Loaded by: TrustIndicatorBar

### 4. technical-circuit-background.tsx

- Location: `components/homepage/technical-circuit-background.tsx`
- Has: Canvas, 4x useFrame hooks (camera, particles, connections, nodes)
- This is the MOST SUSPICIOUS - 4 useFrame loops is excessive

### 5. subtle-ai-portfolio-background.tsx

- Location: `components/homepage/subtle-ai-portfolio-background.tsx`
- Has: Canvas ref with requestAnimationFrame loop
- Manual animation loop

### 6. cta-premium-background.tsx (orphaned but may still be imported)

- Location: `components/homepage/cta-premium-background.tsx`
- Has: Canvas, 2x useFrame hooks

---

## HOMEPAGE COMPONENT STACK (app/page.tsx)

```tsx
<PageWrapper>
  <UnifiedAuroraBackground />  // CSS animations (aurora-drift-1,2,3)
  <div className="relative z-10">
    <HeroSection />           // Contains TieredBackground -> 3D Canvas
    <AIAuditSection />        // Unknown - needs audit
    <ServicesSection />       // Unknown - needs audit
    <TrustIndicatorBar />     // May use TrustParticles3D
    <PortfolioSection />      // May use SubtleAIPortfolioBackground
    <CTASection />            // SIMPLIFIED - should be clean now
  </div>
</PageWrapper>
```

---

## INVESTIGATION TASKS

### PHASE 1: Identify ALL Active Animation Sources

1. **Read and audit each component on homepage:**
   - `components/homepage/hero-section.tsx` - What 3D background does it load?
   - `components/homepage/ai-audit-section.tsx` - Any animations?
   - `components/homepage/services-section.tsx` - Any 3D backgrounds?
   - `components/homepage/trust-indicator-bar.tsx` - Uses TrustParticles3D?
   - `components/homepage/portfolio-section.tsx` - Uses SubtleAIPortfolioBackground?

2. **Count total useFrame hooks on homepage** - Each runs 60fps

3. **Count total scroll event listeners** - Search for `addEventListener.*scroll`

4. **Count total useScroll hooks** - Framer Motion scroll tracking

### PHASE 2: Check for CSS Blocking

1. **Search globals.css for:**
   - `overflow: hidden` on body/html (can trap scroll)
   - `position: fixed` elements covering viewport
   - `will-change` properties causing layer issues
   - `contain` properties that might be misconfigured

2. **Check layout.tsx** for any scroll-blocking wrappers

### PHASE 3: Check for JavaScript Blocking

1. **Search for `preventDefault` calls** - May block scroll events
2. **Search for `window.scrollTo`** - May hijack scroll
3. **Search for heavy computations in scroll handlers**
4. **Check for state updates during scroll** (React re-renders)

### PHASE 4: Browser DevTools Analysis

1. Run Performance profiler during scroll
2. Check for long tasks (>50ms)
3. Check for layout thrashing
4. Check GPU usage

---

## NUCLEAR OPTION (If Investigation Fails)

If the issue cannot be identified, systematically disable components:

1. **Comment out HeroSection 3D background** - Test scroll
2. **Comment out TrustIndicatorBar** - Test scroll
3. **Comment out PortfolioSection** - Test scroll
4. **Comment out ServicesSection** - Test scroll
5. **Comment out UnifiedAuroraBackground** - Test scroll

This binary search will identify the culprit.

---

## FILES TO READ FIRST

1. `FIELDPORTER.COM/app/page.tsx` - Homepage structure
2. `FIELDPORTER.COM/components/homepage/hero-section.tsx` - Hero with 3D
3. `FIELDPORTER.COM/components/homepage/trust-indicator-bar.tsx` - Check 3D usage
4. `FIELDPORTER.COM/components/homepage/portfolio-section.tsx` - Check 3D usage
5. `FIELDPORTER.COM/components/homepage/services-section.tsx` - Check animations
6. `FIELDPORTER.COM/app/globals.css` - CSS scroll properties
7. `FIELDPORTER.COM/app/layout.tsx` - Root layout

---

## SEARCH PATTERNS

```bash
# Find all scroll listeners
grep -r "addEventListener.*scroll" components/

# Find all useFrame hooks
grep -r "useFrame" components/

# Find all Canvas elements
grep -r "<Canvas" components/

# Find all useScroll hooks
grep -r "useScroll" components/

# Find overflow hidden
grep -r "overflow.*hidden" app/

# Find position fixed
grep -r "position.*fixed" components/
```

---

## EXPECTED OUTCOME

1. Identify the EXACT component(s) causing scroll freeze
2. Provide a minimal fix (ideally disabling/simplifying the offending component)
3. Verify scroll works freely after fix
4. Document the root cause for future reference

---

## PRIORITY

This is CRITICAL. The website is unusable if users cannot scroll. All other work should pause until this is resolved.
