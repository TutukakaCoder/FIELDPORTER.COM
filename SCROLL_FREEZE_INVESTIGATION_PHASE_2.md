# Cursor IDE Research Prompt: FIELDPORTER Scrolling Freeze - Phase 2 Investigation

## PROBLEM STATEMENT (UPDATED)

The FIELDPORTER website STILL has a scrolling freeze/pause issue specifically when users attempt to scroll down FROM the hero section on the homepage. The scroll becomes "stuck" for approximately 1 second before continuing normally. This is a **hero section-specific issue**.

**Previous Investigation**: Phase 1 addressed scroll-behavior, overflow properties, event listeners, animations, and IntersectionObservers - but the issue persists.

**Critical Observation**: The freeze happens specifically when **leaving the hero section**, suggesting the issue is related to hero-specific components, 3D backgrounds, or performance monitoring rather than general scroll architecture.

---

## TECHNICAL CONTEXT

- Next.js 14.2.32 with App Router
- React Three Fiber for 3D backgrounds (hero section only)
- Framer Motion for animations
- Dynamic imports for 3D components
- Tiered background system (full/simplified/css-only)
- Performance monitoring hooks active
- Video entrance animation system

---

## PHASE 2 INVESTIGATION AREAS

### 1. 3D BACKGROUND SYSTEM (HIGHEST PRIORITY)

**Files to Examine**:

- `components/homepage/hero-3d-background.tsx`
- `components/homepage/hero-3d-background-simplified.tsx`
- `components/homepage/hero-section.tsx` (lines 15-40: Dynamic imports)
- `lib/webgl-context-manager.ts`

**Specific Issues to Check**:

#### A. Dynamic Import Loading State

```typescript
// Line 15-27 in hero-section.tsx
const Hero3DBackground = dynamic(
  () => import("./hero-3d-background").then((mod) => ({
      default: mod.Hero3DBackground,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
    ),
  },
);
```

**Question**: Does the loading state create a brief render block that interferes with scroll initialization?

**Check**:

- Is the 3D background lazy-loaded during initial scroll attempt?
- Does the transition from loading placeholder to actual component block scroll?
- Is there a hydration mismatch?

#### B. React Three Fiber Canvas Initialization

**Look for**:

- Canvas mounting/unmounting during scroll
- WebGL context creation timing
- Frame loop initialization
- Camera position calculations

**Potential Issues**:

- Canvas `useFrame` hooks blocking main thread
- Heavy shader compilation during scroll
- Geometry calculations in render loop
- Texture loading blocking scroll events

#### C. WebGL Context Manager

**File**: `lib/webgl-context-manager.ts`

**Check for**:

- Context creation during scroll
- Memory cleanup triggered by scroll position
- Force cleanup threshold conflicts
- Context loss/restore events

---

### 2. PERFORMANCE MONITORING HOOKS (VERY HIGH PRIORITY)

**Files to Examine**:

- `hooks/use-performance-monitor.ts`
- `hooks/use-device-capability.ts`
- `components/homepage/hero-section.tsx` (lines 763, 802-833)

**Specific Issues**:

#### A. Performance Monitor in Hero Section

```typescript
// Line 763
const { metrics } = usePerformanceMonitor();

// Lines 807-833: Performance monitoring effect
useEffect(() => {
  let logInterval: NodeJS.Timeout | undefined;

  if (process.env.NODE_ENV === "development") {
    logInterval = setInterval(() => {
      if (metrics.fps < 30 || metrics.memoryUsage > 300) {
        console.log("Hero Performance Warning:", metrics);
      }
    }, 10000);
  }

  // Memory cleanup trigger
  if (metrics.memoryUsage > 320) {
    import("../../lib/webgl-context-manager").then(
      ({ WebGLContextManager }) => {
        const manager = WebGLContextManager.getInstance();
        manager.forceCleanup();
      },
    );
  }

  return () => {
    if (logInterval) {
      clearInterval(logInterval);
    }
  };
}, [metrics]);
```

**Critical Questions**:

1. **Does `usePerformanceMonitor` calculate FPS/memory synchronously during scroll?**
2. **Is the dynamic import of WebGLContextManager blocking scroll?**
3. **Does the metrics dependency array cause re-renders during scroll?**
4. **Is FPS calculation using requestAnimationFrame conflicting with scroll RAF?**

#### B. Device Capability Detection

**Check**:

- Does capability detection run during scroll?
- Is GPU tier detection blocking?
- Does switching between full/simplified/css-only backgrounds happen mid-scroll?

---

### 3. TIERED BACKGROUND SYSTEM

**File**: `components/homepage/hero-section.tsx` (lines 229-249)

```typescript
const TieredBackground = memo(() => {
  const { experience } = useDeviceCapability();

  useEffect(() => {
    console.log("Device experience tier:", experience);
  }, [experience]);

  switch (experience) {
    case "full":
      return <Hero3DBackground />;
    case "simplified":
      return <Hero3DBackgroundSimplified />;
    case "css-only":
    default:
      return <PremiumAuroraBackground />;
  }
});
```

**Critical Issues to Check**:

1. **Does the useEffect console.log trigger during scroll?**
2. **Is the background component being re-evaluated/re-mounted during scroll?**
3. **Does the memo comparison fail, causing re-render?**
4. **Is there a race condition where experience tier changes mid-scroll?**

---

### 4. AURORA BACKGROUND MOTION COMPONENTS

**File**: `components/homepage/hero-section.tsx` (lines 252-368)

**Check PremiumAuroraBackground**:

```typescript
// Lines 282-336: Animated aurora blobs with motion.div
<motion.div
  className="absolute w-[300px] h-[300px] rounded-full opacity-15"
  style={{
    // ... styles
    willChange: "transform",
    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
    filter: `blur(${auroraSettings.blurAmount}px)`,
    contain: "layout style paint size",
  }}
  animate={{
    x: [0, 50, -25, 0],
    y: [0, -25, 20, 0],
    scale: [1, 1.05, 0.95, 1],
  }}
  transition={{
    duration: 30,
    repeat: Infinity,
    ease: "linear",
    type: "tween",
  }}
/>
```

**Specific Issues**:

1. **Are heavy blur filters (60-80px) causing paint performance issues?**
2. **Does the infinite animation loop interfere with scroll events?**
3. **Is `willChange: "transform"` causing layer promotion conflicts?**
4. **Does `contain: "layout style paint size"` actually help or hurt?**

---

### 5. FLOATING ORBS WITH CONDITIONAL RENDERING

**File**: `components/homepage/hero-section.tsx` (lines 867-884)

```typescript
{!isMobile &&
  metrics.memoryUsage < 320 && (
    <>
      <FloatingOrb className="top-20 left-10 hidden lg:block" delay={0} />
      {metrics.memoryUsage < 300 && (
        <FloatingOrb className="bottom-20 right-20 hidden lg:block" delay={3} />
      )}
      {metrics.memoryUsage < 280 && (
        <FloatingOrb className="top-40 right-40 hidden xl:block" delay={6} />
      )}
    </>
  )}
```

**Critical Issue**:
**Does checking `metrics.memoryUsage` during scroll cause conditional rendering that blocks scroll?**

The memory thresholds (320, 300, 280) might be causing orbs to mount/unmount during scroll based on real-time memory readings.

---

### 6. VIDEO ENTRANCE ANIMATION SYSTEM

**Files to Examine**:

- `components/layout/entrance-provider.tsx`
- `components/layout/video-entrance.tsx`

**Specific Checks**:

1. **Is the video entrance completing JUST as user tries to scroll?**
2. **Does the opacity transition from 0 to 100 interfere with scroll initialization?**
3. **Is pointer-events transition causing scroll event capture issues?**
4. **Does sessionStorage check run during scroll?**

---

### 7. SECTION STYLE CONTAINMENT

**File**: `components/homepage/hero-section.tsx` (lines 838-863)

```typescript
<section
  style={{
    position: "relative",
    overflowX: "hidden",
    overflowY: "visible",
    width: "100%",
    maxWidth: "100%",
    contain: "layout style paint",  // <--- THIS
    isolation: "isolate",
  }}
>
```

**Question**: Does `contain: "layout style paint"` actually prevent the browser from optimizing scroll?

**Check**:

- Is containment too aggressive?
- Should it be `contain: "paint"` only?
- Is `isolation: isolate` creating stacking context issues?

---

### 8. BACKGROUND PATTERN SVG

**File**: `components/homepage/hero-section.tsx` (lines 163-224)

```typescript
const BackgroundPattern = memo(() => {
  // Contains SVG pattern with motion.div overlay
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-30">
      <svg className="absolute w-full h-full">
        {/* Pattern definition */}
      </svg>

      {!isMobile && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "200% 200%",
            willChange: "background-position",
          }}
        />
      )}
    </div>
  );
});
```

**Potential Issue**: Animating `backgroundPosition` on an absolute positioned full-screen element during scroll.

---

## DIAGNOSTIC SEQUENCE FOR PHASE 2

**Priority Order** (most likely to least likely):

1. **Performance Monitor Effects** - Real-time FPS/memory calculations during scroll
2. **3D Background Dynamic Import** - Loading state transition timing
3. **Tiered Background Switching** - Component mounting during scroll
4. **Memory-Based Conditional Rendering** - Floating orbs mount/unmount
5. **Aurora Background Blur Filters** - Heavy paint operations (60-80px blur)
6. **CSS Containment Strategy** - Too aggressive containment
7. **Background Pattern Animation** - Full-screen backgroundPosition animation
8. **Video Entrance Completion** - Pointer-events and opacity transitions
9. **WebGL Frame Loop** - useFrame in React Three Fiber
10. **Device Capability Detection** - GPU tier detection during scroll

---

## SPECIFIC CODE PATTERNS TO SEARCH FOR

### Pattern 1: Synchronous Performance Calculations

```bash
grep -r "performance.now\|Date.now\|requestAnimationFrame" hooks/
```

### Pattern 2: Dynamic Imports During Render

```bash
grep -r "dynamic import\|import(.*)" components/homepage/
```

### Pattern 3: Conditional Rendering Based on Metrics

```bash
grep -r "metrics\." components/homepage/hero-section.tsx
```

### Pattern 4: WebGL/Canvas Operations

```bash
grep -r "useFrame\|useThree\|Canvas" components/homepage/
```

### Pattern 5: Heavy CSS Filters

```bash
grep -r "filter.*blur\|backdrop-filter" components/homepage/hero-section.tsx
```

---

## VERIFICATION TESTS

For each suspect, test by:

1. **Comment out the entire suspect code**
2. **Test scroll from hero section**
3. **If freeze disappears = ROOT CAUSE FOUND**
4. **If freeze persists = Continue to next suspect**

### Quick Isolation Tests:

#### Test A: Remove ALL 3D Backgrounds

```typescript
// In TieredBackground component
return <PremiumAuroraBackground />; // Force CSS-only
```

#### Test B: Remove Performance Monitoring

```typescript
// Comment out entire usePerformanceMonitor() calls
// const { metrics } = usePerformanceMonitor();
```

#### Test C: Remove Conditional Orbs

```typescript
// Comment out entire floating orbs section (lines 867-884)
```

#### Test D: Remove Aurora Animations

```typescript
// In PremiumAuroraBackground, remove all motion.div, use static divs
```

---

## EXPECTED FINDINGS

**Most Likely Culprits**:

1. Performance monitoring hook calculating FPS during scroll (synchronous)
2. Memory-based conditional rendering triggering re-renders mid-scroll
3. 3D background component loading/mounting during scroll attempt
4. Heavy blur filters on animated elements

**Less Likely But Possible**:

- WebGL context operations
- Device capability tier switching
- Background pattern animation
- Video entrance timing

---

## OUTPUT FORMAT FOR INVESTIGATION

For each suspect tested, document:

```markdown
### Suspect: [Name]

**File**: [path]
**Lines**: [range]
**Test Method**: [what was disabled/changed]
**Result**: ✅ SOLVED / ❌ Not the cause
**Evidence**: [what happened when tested]
```

---

## NOTES FOR INVESTIGATOR

1. **Focus on hero section ONLY** - other sections scroll fine
2. **The freeze is ~1 second** - suggests heavy synchronous operation
3. **Happens specifically when LEAVING hero** - suggests scroll position threshold trigger
4. **Phase 1 fixes didn't work** - it's NOT general scroll architecture
5. **Most likely: Performance monitoring or 3D background system**

---

## SUCCESS CRITERIA

Scroll from hero section to services section with **ZERO pause or freeze**.

---

_Phase 2 Investigation - Focus on Hero-Specific Systems_
_Previous Phase: Scroll architecture, animations, event listeners (ruled out)_
