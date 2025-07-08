# NEW CHAT INVESTIGATION PROMPT

## 🎯 CRITICAL ISSUE: Double Scroll Bar Bug

**Copy this prompt to start a fresh investigation:**

---

**URGENT**: FIELDPORTER website has a persistent double scroll bar bug that has resisted ALL attempts to fix. We've spent extensive time on hero section components (Aurora, 3D backgrounds, containers, CSS) but the issue persists.

**KEY INSIGHT**: The problem is **NOT** in the hero section. Previous investigation ruled out:
- ✅ Hero background components  
- ✅ 100vw usage
- ✅ CSS containment issues
- ✅ Typography sizing
- ✅ Global overflow settings

**CRITICAL CLUES**:
1. **Intermittent behavior** - "sometimes disappears, but persistently returns"
2. **CTA interaction removes it temporarily** - suggests reflow trigger
3. **Console shows elements 19, 21, 22, 34 with overflow** - unidentified components
4. **Service Worker 404 errors**: `GET /service-worker.js 404 in 5869ms`
5. **Forced reflow violations**: `[Violation] Forced reflow while executing JavaScript took 33ms`

**INVESTIGATE THESE AREAS FIRST**:

### 1. **App Structure (HIGH PRIORITY)**
- `app/layout.tsx` - Root layout container issues
- `app/page.tsx` - Main page wrapper 
- Header/Footer in `components/layout/*`
- Viewport meta tags

### 2. **Video Entrance System (HIGH PRIORITY)**
- `components/layout/entrance-provider.tsx` - Layout effects
- Video container sizing issues
- Loading state transitions causing layout shifts

### 3. **Service Worker Issues (MEDIUM)**
- Fix 404 service worker errors
- Check if missing SW affects layout calculations

### 4. **Dynamic Loading (MEDIUM)**
- Chat widget initialization timing
- Component mounting race conditions
- Dynamic imports causing reflows

**DEBUG STRATEGY**:
1. Use Chrome DevTools Layout tab to monitor real-time reflows
2. Temporarily disable video entrance system
3. Check elements 19, 21, 22, 34 specifically
4. Monitor layout shifts during component mounting

**FILES TO CHECK FIRST**:
- `app/layout.tsx` 
- `app/page.tsx`
- `components/layout/entrance-provider.tsx`
- Any video-related components

**DO NOT** spend time on hero section components - we've confirmed they're not the issue.

**SUCCESS**: Only ONE vertical scroll bar should be visible. Current issue shows dual scroll bars on homepage.

---

**Start here**: Investigate app structure and video entrance system first. The scroll bar bug is NOT in the hero section. 