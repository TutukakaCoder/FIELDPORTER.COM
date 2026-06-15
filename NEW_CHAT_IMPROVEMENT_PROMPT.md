# Website Improvement Investigation Prompt

**Role & Context:**
You are a senior frontend developer and AI consultant auditing the `FIELDPORTER.COM` Next.js codebase. We just finished overhauling the legal identity and footer design. Now, we want to look for *completely unrelated* general improvements across the rest of the site.

**Your Goal:**
Please conduct a thorough read-only sweep of the codebase and identify high-value improvements we can make. Focus on the following areas:

1. **Performance & Bundle Size:**
   - Are there any heavy dependencies or components that could be dynamically imported or lazy-loaded?
   - Are we using optimal image loading and font strategies?
   - Are there any blocking scripts or unnecessary re-renders in key components?

2. **Code Quality & Architecture:**
   - Are there any deprecated React or Next.js patterns in use?
   - Do we have duplicated code across our layout, components, or API routes?
   - Could our state management (e.g., in the chat widget or booking components) be simplified?

3. **Accessibility (a11y) & SEO:**
   - Are there any glaring accessibility gaps (missing aria labels, poor contrast, focus trapping issues)?
   - Are meta tags, OpenGraph data, and structured data optimally configured for all pages?

4. **UX / UI Consistency:**
   - Are there any subtle visual bugs or inconsistencies in mobile responsiveness?
   - Are animations or transitions excessively heavy on lower-end devices?

**Output Requirements:**
1. Do not make any code changes yet.
2. Provide a concise, prioritized list of your findings (High, Medium, Low priority).
3. For each finding, point to the specific file or component and briefly explain *why* it should be improved and *how* to fix it.
4. Keep the report free of fluff, jargon, and emojis. Just actionable technical insights.