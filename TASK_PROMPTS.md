# FIELDPORTER Task Prompts

Split into focused sessions for better results.

---

## TASK 1: Gemini 3.0 API Research & Implementation

### Research Prompt (for web search or Claude research)

```
Research the latest Gemini 3.0 models available through Firebase AI SDK (firebase/ai package).

I need to know:
1. What is the exact model name string for Gemini 3.0 Pro Preview? (e.g., "gemini-3.0-pro-preview" or different?)
2. Is Gemini 3.0 available through the Firebase AI Logic SDK (GoogleAIBackend)?
3. What are the differences between Gemini 2.5 Pro and Gemini 3.0 Pro?
4. Are there any breaking changes in the API parameters (temperature, maxOutputTokens, etc.)?
5. What is the current pricing/quota for Gemini 3.0 via Firebase?

Context: We currently use firebase/ai package with getGenerativeModel() and GoogleAIBackend. Model strings are "gemini-2.5-pro" and "gemini-2.5-flash".

Provide the exact model string to use and any code changes required.
```

### Implementation Prompt (for Cursor agent)

```
Update the FIELDPORTER chat API to use Gemini 3.0 Pro Preview.

File: app/api/chat/route.ts

Current setup:
- Uses firebase/ai SDK with GoogleAIBackend
- Models: "gemini-2.5-pro" and "gemini-2.5-flash"
- getGenerativeModel(ai, { model: modelName })

Tasks:
1. Update model strings to Gemini 3.0 equivalents
2. Verify API parameters are compatible
3. Test the endpoint works
4. Run npm run build to verify no errors

Do not change the system prompt or conversation logic - only the model selection.
```

---

## TASK 2: Premium Website Design Research

### Competitive Analysis Prompt

```
Research premium tech consulting and advisory website designs for FIELDPORTER redesign.

Analyze these specific sites for design patterns:
1. Linear.app - modern dev tool, minimal
2. Vercel.com - developer platform, dark theme
3. Stripe.com - fintech, clean documentation style
4. McKinsey.com - traditional consulting
5. Apple.com/services - premium consumer tech

For each, document:
- Hero section approach (text-first? visual-first? animation?)
- Color palette (how many colors? accent usage?)
- Information density (sparse or content-rich?)
- Navigation pattern
- Call-to-action placement
- Mobile experience
- Background treatments (gradients, animations, static?)

Identify patterns that work for "premium AI consulting" positioning.

Output: A summary of 3-5 design principles to apply to FIELDPORTER.
```

### Feed-Style UX Research Prompt

```
Research "feed-style" and "frictionless" information display patterns for service websites.

Questions to answer:
1. What makes a website feel "frictionless"? (scroll behavior, loading, transitions)
2. How do premium sites present multiple service offerings without overwhelming?
3. What is the optimal content-to-whitespace ratio for premium feel?
4. How do successful sites handle the "too much content" problem?
5. What modern interaction patterns create engagement without friction?

Examples to study:
- Apple product pages (reveal on scroll)
- Notion.so (simple but informative)
- Arc browser site (playful but premium)
- Loom.com (video-first communication)

Output: Specific UX patterns to implement for FIELDPORTER.
```

---

## TASK 3: Website Redesign Strategy

### Strategy Definition Prompt

```
Define the FIELDPORTER website redesign strategy.

Current state:
- Dark theme with glassmorphism
- 4 service pillars: Research, Build, Flows, Learn
- Multi-section homepage (Hero, AI Audit, Services, Trust, Portfolio, CTA)
- React Three Fiber 3D backgrounds (performance issues on mobile)
- Framer Motion animations throughout

User feedback: "Feels ugly, not premium, too cluttered"

Business requirements:
- Must clearly communicate 4 service offerings
- Premium positioning (high-value consulting, not cheap automation)
- Target audience: Founders, executives, decision-makers
- Lead capture through AI chat widget

Design constraints:
- Next.js 14 with TypeScript
- Tailwind CSS
- Must work on mobile
- Bundle size matters

Questions to answer:
1. Keep multi-section or simplify to single-scroll?
2. Keep 3D backgrounds or switch to CSS-only?
3. Reduce to 2-3 accent colors or keep service-specific colors?
4. Hero: text-focused or add visual element?
5. Service presentation: grid, cards, or sequential reveal?

Output: A clear design direction document with specific decisions.
```

---

## TASK 4: Website Implementation

### Phase 1 - Hero Redesign Prompt

```
Redesign the FIELDPORTER hero section for premium feel.

File: components/homepage/hero-section.tsx

Current issues:
- Aurora background too subtle (opacity 10-15%)
- 4-color service icons feel busy
- Glassmorphic dock may feel dated

Design direction: [INSERT FROM TASK 3]

Implementation tasks:
1. Simplify background to single animated gradient or remove 3D
2. Reduce color palette to 2 accent colors max
3. Increase headline impact (typography, spacing)
4. Simplify service selector or move below fold
5. Ensure mobile-first responsive design

Constraints:
- Keep existing Framer Motion setup
- Maintain accessibility (focus states, aria labels)
- Performance: no layout shift, smooth 60fps

Run npm run build after changes.
```

### Phase 2 - Unified Background Prompt

```
Implement a unified background animation across the entire FIELDPORTER app.

Current state:
- Hero has TieredBackground (3D on desktop, CSS on mobile)
- Page wrapper has UnifiedAuroraBackground
- Multiple competing background systems

Goal: Single, cohesive background that spans all sections.

Options to evaluate:
1. CSS-only gradient mesh (performant, works everywhere)
2. Single subtle particle system (React Three Fiber, desktop only)
3. Static gradient with grain texture (simplest, most reliable)

Implementation:
1. Choose approach based on performance/visual tradeoff
2. Implement in layout.tsx or page wrapper
3. Remove competing background systems
4. Test on mobile and desktop
5. Verify no scroll/performance issues

Run npm run build after changes.
```

### Phase 3 - Content Hierarchy Prompt

```
Restructure FIELDPORTER homepage content for clarity and premium feel.

Current sections:
1. HeroSection - headline + service selector
2. AIAuditSection - unknown purpose
3. ServicesSection - detailed service cards
4. TrustIndicatorBar - social proof
5. PortfolioSection - case studies
6. CTASection - final conversion

Tasks:
1. Audit each section - is it necessary?
2. Reduce to maximum 4 sections
3. Increase whitespace between sections
4. Simplify typography hierarchy
5. Ensure single clear CTA path

Questions to answer during implementation:
- Can AIAudit merge with Services?
- Is Portfolio needed on homepage or better as separate page?
- Should Trust indicators be inline rather than separate section?

Run npm run build after changes.
```

---

## Execution Order

1. **Gemini 3.0** - Quick technical win, independent of design
2. **Design Research** - Gather patterns before deciding direction
3. **Strategy Definition** - Make decisions before coding
4. **Hero Redesign** - Start with highest-impact section
5. **Unified Background** - Create cohesive visual foundation
6. **Content Hierarchy** - Polish overall structure

---

## How to Use These Prompts

For each task:

1. Start a new chat session
2. Paste the relevant prompt
3. Provide any additional context from previous tasks
4. Let the agent complete the focused task
5. Document outcomes before moving to next task

This prevents context overload and keeps each session focused.
