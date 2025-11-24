# SCROLL LAG INVESTIGATION PROMPT - Hero Section Focus

## Problem Statement

Website scroll is laggy and stops moving up/down, especially near the hero section on the main page. Scroll wheel moves but page doesn't respond smoothly.

## Investigation Priority Areas

### 1. HERO SECTION - HIGHEST PRIORITY ⚠️

**Files to Check:**

- `components/homepage/hero-section.tsx`
- `components/homepage/hero-3d-background.tsx`
- `components/homepage/hero-3d-background-simplified.tsx`

**Check For:**

- Multiple `useScroll`/`useTransform` hooks recalculating on every scroll frame
- Heavy Framer Motion animations running during scroll
- `useFrame` hooks in 3D components competing with scroll RAF loop
- State updates (`setIsScrolled`, `setIsScrolling`) triggering React re-renders
- Layout thrashing from `getBoundingClientRect()` calls
- IntersectionObserver callbacks firing during scroll
- CSS animations/transitions blocking main thread
- `will-change` properties causing unnecessary repaints

**Specific Issues to Find:**

```typescript
// BAD: Recalculates on every scroll
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 100], [0, 50]);

// BAD: State update during scroll
window.addEventListener("scroll", () => {
  setIsScrolled(true); // Triggers re-render
});

// BAD: Layout read during scroll
const rect = element.getBoundingClientRect(); // Forces reflow
```

### 2. CTA SECTION - MEDIUM PRIORITY

**File:** `components/homepage/cta-section.tsx`

**Check:**

- Line 93-96: `useScroll` + `useTransform` hooks
- Line 33-34: `mousemove` listener updating state every frame
- Heavy backdrop-blur effects during scroll
- Magnetic field 3D effects running during scroll

### 3. HEADER COMPONENT - MEDIUM PRIORITY

**File:** `components/layout/header.tsx`

**Check:**

- Line 27-38: Scroll handler with RAF throttling (verify it's working)
- State updates frequency (`setIsScrolled`)
- Motion animations triggering during scroll
- Layout shifts from header position changes

### 4. MULTIPLE SCROLL LISTENERS - CUMULATIVE IMPACT

**Files with scroll listeners:**

- `components/layout/header.tsx` (line 41)
- `components/layout/footer.tsx` (line 76)
- `components/layout/back-to-top.tsx` (line 31)
- `components/homepage/hero-3d-background.tsx` (line 414)
- `components/homepage/hero-3d-background-simplified.tsx` (line 340)
- `components/ui/3d-section-background.tsx` (lines 53, 339)
- `components/homepage/technical-circuit-background.tsx` (line 38)

**Check:**

- Are all listeners passive? (should be `{ passive: true }`)
- Are handlers doing heavy work?
- Can multiple listeners be consolidated?

### 5. FRAMER MOTION SCROLL HOOKS - PERFORMANCE IMPACT

**Search Pattern:** `useScroll|useTransform|useSpring`

**Known Locations:**

- `components/homepage/cta-section.tsx` (lines 93-96)
- `components/contact/contact-hero.tsx` (lines 131-143)
- `components/services/service-hero.tsx` (lines 150-162)

**Check:**

- Are transforms recalculating unnecessarily?
- Can `useSpring` wrappers be removed?
- Are transform ranges optimized?

### 6. 3D BACKGROUND PERFORMANCE

**Files:**

- `components/homepage/hero-3d-background.tsx`
- `components/homepage/hero-3d-background-simplified.tsx`

**Check:**

- `useFrame` hooks running at 60fps during scroll
- Scroll detection (`isScrolling`) working correctly
- Particle system calculations blocking main thread
- WebGL context performance settings

### 7. CSS PERFORMANCE ISSUES

**Check `app/globals.css`:**

- Global transitions on `*` selector
- Heavy backdrop-blur effects
- `will-change` overuse
- CSS animations interfering with scroll

## Investigation Commands

### Find all scroll-related code:

```bash
grep -r "useScroll\|useTransform\|useSpring" components/
grep -r "addEventListener.*scroll" components/
grep -r "getBoundingClientRect\|offsetHeight\|offsetWidth" components/
```

### Find state updates during scroll:

```bash
grep -r "setIsScrolled\|setIsScrolling\|setScroll" components/
```

### Find IntersectionObserver usage:

```bash
grep -r "IntersectionObserver\|useInView" components/
```

## Root Cause Hypotheses

1. **Hero section `useScroll` hooks** recalculating transforms on every scroll frame
2. **Multiple scroll listeners** creating cumulative overhead
3. **3D background `useFrame` hooks** competing with browser scroll RAF
4. **State updates during scroll** triggering React re-renders
5. **Layout thrashing** from DOM reads during scroll handlers
6. **CSS animations** blocking main thread

## Success Criteria

Scroll must:

- Respond immediately to scroll wheel (< 16ms)
- Never pause or halt mid-scroll
- Maintain 60fps during rapid scrolling
- Work smoothly on both mouse wheel and trackpad
- Not drop frames even during heavy page sections

## Performance Targets

- Long Task duration: 0ms during scroll
- Main thread idle: >50% during scroll
- Frame time: <16.67ms (60fps)
- JavaScript execution during scroll: <5ms per frame

## Next Steps

1. Profile scroll performance in Chrome DevTools Performance tab
2. Identify which component/hook is causing the lag
3. Implement fixes (throttle, debounce, remove unnecessary calculations)
4. Test scroll smoothness after each fix
5. Verify no regressions in visual quality
