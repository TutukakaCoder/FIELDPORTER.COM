# Starting Prompt: Website Task Runner (Duplicate & Continue)

Use this as the **first message** when you start a new chat (or duplicate a chat) to run website tasks from the master list. In a **duplicated/forked chat**, your second message can just be: **Continue.**

---

## Your role

You are working through **FIELDPORTER.COM/MASTER_WEBSITE_TASK_LIST.md**. Your job is to:

1. **Find where we are**  
   Open `FIELDPORTER.COM/MASTER_WEBSITE_TASK_LIST.md`. The next task is the **first unchecked item** in the file (first `- [ ]`). It can be anywhere (e.g. line 20 or line 300). Ignore section order if needed; “next” = first `[ ]` from the top.

2. **Research and plan**
   - Read the task and any linked files/components.
   - Consider different ways to do it; challenge assumptions; ask yourself: “What could go wrong? What’s the simplest correct approach? Does this conflict with existing patterns?”
   - Answer those questions briefly, then pick an approach.

3. **Implement**  
   Make the code/copy changes. Prefer minimal, clear changes that match the existing codebase.

4. **Test**  
   Run a build (`npm run build` from the site root, e.g. `FIELDPORTER.COM`). Fix any errors. If the task is UI/copy, sanity-check the relevant page.

5. **Mark done**  
   In **MASTER_WEBSITE_TASK_LIST.md** only, change that task’s `- [ ]` to `- [x]`. That file is the only “logging” document; there is no separate log.

6. **Context check**  
   If you’re under **~50–60%** of your context window (or at least under ~80%), **start the next task**: go back to step 1, find the next unchecked `- [ ]`, and repeat (research → implement → test → mark done).  
   When you’re around **50–80%** context used, **stop** and report briefly what you did and what the next unchecked task is.

---

## Rules

- **One task at a time** in your head: finish (implement + test + mark done) before moving to the next.
- **Always build** after changes; no “I’ll assume it works.”
- **Summaries only**: short report at the end, no emojis, no jargon. Say what you changed and what the next task is.
- **If you’re unsure** about product/positioning (e.g. “primary buyer”, “AIOS positioning”), implement the concrete part of the task and note the open decision; don’t block on it.
- **Workspace**: FIELDPORTER website repo; site code lives under `FIELDPORTER.COM` (Next.js, TypeScript).
- **On “Continue”** (in a forked chat): open the master task list again, find the first `- [ ]`, and run the loop from step 2 (research/plan → implement → test → mark done → next or stop by context).

---

## First message (paste this)

```
Use the instructions in FIELDPORTER.COM/STARTING_PROMPT_WEBSITE_TASKS.md.

Open MASTER_WEBSITE_TASK_LIST.md and find the first unchecked task (- [ ]). Research it, plan, implement, test, mark it done in that file, then continue with the next unchecked task until you're around 50–80% context, then stop and give a short summary and the next task.
```

---

## Second message in a forked chat (after “Continue”)

You can say only:

```
Continue.
```

The agent will re-open the task list, find the first remaining `- [ ]`, and run the same loop (research → implement → test → mark done → continue or stop by context).
