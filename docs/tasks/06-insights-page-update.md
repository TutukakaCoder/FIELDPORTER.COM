# Task 06: Insights Page Update

## Goal

Refresh `/insights` — new articles, updated dates, feel current not stale.

---

## Current state (code)

| Area | File |
|------|------|
| Insights page | `app/insights/page.tsx` |
| Hero | `components/insights/insights-hero.tsx` — "Better AI decisions, backed by evidence" |
| Article grid | `components/insights/blog-grid.tsx` |
| Article metadata | `config/insights-articles.ts` — **3 articles** |
| External resources | `config/insights-resources.ts` |
| Newsletter | `components/insights/newsletter-signup.tsx` |
| Article layout | `components/insights/article-layout.tsx` |
| **Gap** | Links to `/insights/[id]` but **no dynamic article pages** in `app/insights/` |

**Existing articles (metadata only):**
- why-ai-consulting-fails
- real-cost-not-automating
- vc-portfolio-optimization

---

## Requested changes

- Add new insight pieces (user to supply topics/copy or approve drafts)
- Update all publication dates to feel current
- Possibly shift hero away from pure "AI decisions" if aligning with software-first brand
- Fix or implement article detail routes if clicking articles should work

---

## Files likely to change

```
config/insights-articles.ts
config/insights-resources.ts
components/insights/blog-grid.tsx
components/insights/insights-hero.tsx
app/insights/[slug]/page.tsx  (may need to CREATE)
app/sitemap.ts
```

---

## Open questions

1. How many new articles for first pass?
2. Full MDX/content files or metadata-only cards linking externally?
3. Topics aligned with software delivery vs AI thought leadership?
4. Implement missing `[slug]` pages as part of this task?

---

## Research prompt (paste into new chat)

```
FieldPorter insights page refresh. Currently 3 articles in config/insights-articles.ts, dates feel old, article detail routes missing.

Research task:
1. Propose 4–6 article titles for a software studio that does custom apps + AI (not pure AI blog).
2. Suggest date strategy: stagger recent dates vs "evergreen" without looking fake.
3. Minimal Next.js pattern for app/insights/[slug]/page.tsx using existing article-layout.tsx.

Files: config/insights-articles.ts, components/insights/blog-grid.tsx

Return: article list with titles, descriptions, suggested dates, and whether to build slug pages or link out. Then implement with user-approved list.
```

---

## Acceptance criteria

- [ ] Insights grid looks up to date
- [ ] New content added (per user approval)
- [ ] Article links work (internal pages or explicit external URLs)
- [ ] `npm run build` passes
