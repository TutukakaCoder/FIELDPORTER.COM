import type { ReactNode } from "react";

/** Full article bodies keyed by insight id. Keep copy practical and current. */
export const ARTICLE_BODIES: Record<string, ReactNode> = {
  "from-ai-pilot-to-production": (
    <>
      <p>
        By late 2025, McKinsey reported that about 88% of organizations use AI
        in at least one business function. That sounds like victory. It is not.
        Most of those programs are still experimenting or piloting. Only a
        minority attribute meaningful EBIT impact to AI, and an even smaller
        group redesigns work around the model instead of bolting a chatbot onto
        a broken process.
      </p>
      <p>
        The gap is not model quality. Frontier models are strong enough for most
        business workflows. The gap is operating design: ownership, evaluation,
        integration depth, and the willingness to change how work actually
        moves.
      </p>

      <h2>Why pilots stall</h2>
      <ul>
        <li>
          <strong>Demo metrics, not business metrics.</strong> Success is
          measured as &quot;users liked the chat&quot; instead of cycle time,
          error rate, margin, or throughput.
        </li>
        <li>
          <strong>No workflow owner.</strong> IT sponsors the tool. Ops never
          owns the outcome. Nobody retires the old process.
        </li>
        <li>
          <strong>Weak evaluation.</strong> Teams ship prompts without golden
          tests, escalation rules, or human review for high-cost edge cases.
        </li>
        <li>
          <strong>Shallow integration.</strong> The model answers questions but
          cannot update the CRM, raise a ticket, or write back to the system of
          record.
        </li>
      </ul>

      <h2>A production path that works</h2>
      <h3>1. Pick one workflow with money attached</h3>
      <p>
        Start with a high-volume, repeatable process where mistakes have a known
        cost: lead qualification, invoice exception handling, support triage,
        document intake, or portfolio reporting. Avoid &quot;company-wide
        AI&quot; programs. One owned workflow beats five orphaned demos.
      </p>

      <h3>2. Redesign the workflow before you pick the model</h3>
      <p>
        Map the current steps, handoffs, systems, and decision points. Decide
        what the model should draft, decide, or escalate. If the process is
        unclear on paper, AI will only accelerate confusion.
      </p>

      <h3>3. Define &quot;done&quot; in business terms</h3>
      <p>
        Write the target before build starts. Example: cut average first-response
        time from 6 hours to 20 minutes, with human review on any case above a
        confidence or risk threshold. If you cannot name the KPI, you are not
        ready to build.
      </p>

      <h3>4. Ship with evals and an escape hatch</h3>
      <p>
        Production AI needs a test set of real cases, monitoring for drift, and
        a clean path for humans to take over. Agentic features should call tools
        through audited actions, not free-form side effects.
      </p>

      <h3>5. Scale only after the first workflow pays back</h3>
      <p>
        Once one process shows durable savings or revenue lift, clone the
        pattern: same ownership model, same eval discipline, next workflow. That
        is how the small set of AI high performers pull ahead while everyone else
        stays stuck in pilot theater.
      </p>

      <blockquote>
        Adoption without workflow redesign is a dashboard story. Value comes
        when AI changes how work finishes, not just how people chat about it.
      </blockquote>

      <h2>What FIELDPORTER does differently</h2>
      <p>
        We treat AI as a layer on real software and operations: portals,
        databases, integrations, and automation. The model is never the product
        by itself. The product is a reliable workflow your team can run every
        day.
      </p>
      <p>
        If you have pilots that never left staging, start with one process, one
        owner, and one KPI. That is usually enough to tell whether AI will
        create margin or just another subscription line.
      </p>
    </>
  ),

  "build-vs-buy-ai-agents": (
    <>
      <p>
        In 2026, build vs buy for AI agents is a real decision, not a slogan.
        Packaged platforms such as Copilot Studio, Agentforce, and similar
        suites get teams to first value quickly. Custom stacks on model APIs and
        agent SDKs cost more up front, then often win on control and unit
        economics once volume rises.
      </p>
      <p>
        The wrong choice is usually made early: a custom platform for a thin
        use case, or a seat-based agent that cannot touch the systems that
        matter.
      </p>

      <h2>Buy when speed and coverage matter most</h2>
      <ul>
        <li>You need a working agent in weeks, not quarters.</li>
        <li>
          The workflow lives mostly inside a suite you already pay for (CRM,
          ITSM, productivity suite).
        </li>
        <li>
          Volume is modest, so per-conversation or per-seat pricing will not
          dominate the P&amp;L.
        </li>
        <li>
          Your team can configure and govern, but does not want to own model
          infra, eval harnesses, and tool routers long term.
        </li>
      </ul>
      <p>
        Vendor agents commonly reach first value in roughly a month. That speed
        is valuable when you are still proving the workflow.
      </p>

      <h2>Build when the workflow is the moat</h2>
      <ul>
        <li>
          You have proprietary data or process logic competitors cannot buy.
        </li>
        <li>
          The agent must orchestrate several internal systems with strict audit
          trails and data residency rules.
        </li>
        <li>
          Volume is high enough that platform per-action pricing will grow
          faster than infrastructure and maintenance.
        </li>
        <li>
          You need model flexibility, custom evaluation, and deep product
          embedding inside software you own.
        </li>
      </ul>
      <p>
        Industry TCO analyses put the rough crossover near very high
        conversation volumes. Below that, buy usually wins on time and
        overhead. Above it, custom builds start to look cheaper over a
        multi-year horizon — if you actually own the ops.
      </p>

      <h2>A simple decision scorecard</h2>
      <p>Score each factor from 1 (favors buy) to 5 (favors build):</p>
      <ol>
        <li>Expected annual agent interactions</li>
        <li>Need for proprietary data advantage</li>
        <li>Number of systems the agent must write to</li>
        <li>Regulatory / audit pressure</li>
        <li>Internal ability to maintain evals and tooling</li>
      </ol>
      <p>
        Average under 2.5: buy or configure. Average 2.5–3.5: hybrid — vendor
        for standard work, custom for the core path. Average above 3.5: custom
        agent inside software you control.
      </p>

      <h2>Hybrid is often the adult answer</h2>
      <p>
        Many teams should start on a platform to learn the workflow, then peel
        the highest-volume or highest-sensitivity path into a custom agent once
        the process is proven. That avoids building infrastructure for a use
        case that dies in month two.
      </p>

      <blockquote>
        Do not build an agent platform to feel technical. Build when ownership,
        volume, or differentiation make renting the wrong long-term bet.
      </blockquote>

      <h2>How we help</h2>
      <p>
        FIELDPORTER scopes the workflow first, then recommends buy, build, or
        hybrid. When custom is right, we ship the agent inside the portal,
        database, and automation layer your team already needs — not as a
        disconnected demo.
      </p>
    </>
  ),

  "when-custom-software-wins": (
    <>
      <p>
        Buying another SaaS seat is the default because it is easy. Custom
        software wins when the way you work is the advantage — or when generic
        tools force expensive workarounds that never show up as a clean line
        item.
      </p>
      <p>
        We see the same pattern across operators, service businesses, and
        portfolio companies: spreadsheets, shared inboxes, and five loosely
        connected apps holding a process that should be one secure system.
      </p>

      <h2>Signals custom software will pay for itself</h2>
      <ul>
        <li>
          <strong>Role-based work.</strong> Clients, staff, partners, and admins
          need different views of the same data with real permissions.
        </li>
        <li>
          <strong>Approvals and status are the product.</strong> The business
          runs on handoffs, uploads, reviews, and audit history — not a static
          CRM record.
        </li>
        <li>
          <strong>Integration tax is climbing.</strong> Your team spends more
          time copying between tools than serving customers.
        </li>
        <li>
          <strong>Process is unique on purpose.</strong> Fitting into a vendor
          template would erase how you differentiate.
        </li>
        <li>
          <strong>Data ownership matters.</strong> You need the schema, exports,
          and AI layer on infrastructure you control.
        </li>
      </ul>

      <h2>Where SaaS still wins</h2>
      <p>
        Use packaged tools for commodity functions: email, payroll, accounting,
        basic CRM for simple pipelines. Custom should surround your core
        operating workflow, not recreate every commodity app.
      </p>

      <h2>A practical scope for first builds</h2>
      <p>
        Strong first products are usually portals and internal tools, not
        moonshots:
      </p>
      <ul>
        <li>Client or partner portals with login and role views</li>
        <li>Internal ops dashboards with approvals and document flows</li>
        <li>Database-backed trackers that replace fragile sheets</li>
        <li>AI assistants grounded in your own records and rules</li>
      </ul>
      <p>
        Typical useful timelines land around 8–12 weeks when scope is honest:
        one primary workflow, clear roles, and a short integration list.
      </p>

      <h2>Total cost, not sticker price</h2>
      <p>
        Compare three years, not the first invoice. Include seats, admin time,
        workaround labor, failed handoffs, and the cost of decisions made on
        stale data. Custom has higher upfront cost. SaaS has quieter ongoing
        drag. The better choice is whichever path reduces operational waste
        faster for your actual process.
      </p>

      <blockquote>
        If removing one SaaS tool would break your unique process, you may be
        over-customizing. If five tools barely hold the process together, you
        are under-building.
      </blockquote>

      <h2>FIELDPORTER&apos;s bias</h2>
      <p>
        We build custom portals, databases, dashboards, integrations, and
        AI-enabled tools around how your business actually runs. The goal is not
        software for its own sake. The goal is one secure place where the right
        people see the right information and can act.
      </p>
    </>
  ),

  "automation-that-pays-back": (
    <>
      <p>
        Automation fails when teams automate noise. A low-volume, high-variance
        process gets a fancy workflow while the real margin leak — rework,
        delays, and manual reconciliation — stays untouched.
      </p>
      <p>
        Payback comes from ranking work by economic impact, then automating the
        top of that list with clear measurement.
      </p>

      <h2>Score every candidate process</h2>
      <p>Rate each process from 1–5 on:</p>
      <ol>
        <li>
          <strong>Volume</strong> — how often it runs per week
        </li>
        <li>
          <strong>Labor minutes</strong> — fully loaded time per run
        </li>
        <li>
          <strong>Error / rework cost</strong> — what a mistake costs
        </li>
        <li>
          <strong>Cycle-time value</strong> — revenue or cash unlocked by speed
        </li>
        <li>
          <strong>Rule stability</strong> — how predictable the steps are
        </li>
      </ol>
      <p>
        Multiply the scores. Automate from the top. Low stability plus low
        volume usually means improve the process manually first.
      </p>

      <h2>Count the full cost of staying manual</h2>
      <ul>
        <li>Direct labor on repetitive steps</li>
        <li>Manager time spent chasing status</li>
        <li>Customer delays and churn risk</li>
        <li>Compliance exposure from missed steps</li>
        <li>Opportunity cost of skilled people doing copy-paste work</li>
      </ul>
      <p>
        Dashboards often miss the last three. That is why &quot;we only spend
        two hours a week on it&quot; can still be expensive.
      </p>

      <h2>Pick the right automation layer</h2>
      <ul>
        <li>
          <strong>Rules and integrations</strong> for stable, structured steps
          (sync, route, notify, update records).
        </li>
        <li>
          <strong>Document and intake automation</strong> when forms, PDFs, or
          email attachments create the backlog.
        </li>
        <li>
          <strong>AI-assisted steps</strong> when judgment or unstructured text
          is involved — with human review on high-cost decisions.
        </li>
        <li>
          <strong>Full custom workflow software</strong> when the process is
          core and no tool fits without painful compromise.
        </li>
      </ul>

      <h2>Instrument before you celebrate</h2>
      <p>
        Define baseline metrics for two weeks: runs per week, average handle
        time, error rate, and time-to-complete. After launch, compare the same
        numbers. If you cannot measure the baseline, you cannot prove payback.
      </p>

      <blockquote>
        Good automation feels boring in month one and obvious in month six.
        If the business case needs theater, the process was probably the wrong
        target.
      </blockquote>

      <h2>A 30-day starting plan</h2>
      <ol>
        <li>List ten candidate processes with owners.</li>
        <li>Score them with the matrix above.</li>
        <li>Pick one winner and write the baseline metrics.</li>
        <li>Automate the first 80% path, not every edge case.</li>
        <li>Review results, then queue the next process.</li>
      </ol>
      <p>
        FIELDPORTER helps teams do this with automation consulting and custom
        software so the workflow, data, and AI layer stay coherent. Start where
        margin leaks. Ignore the shiny side quests.
      </p>
    </>
  ),
};
