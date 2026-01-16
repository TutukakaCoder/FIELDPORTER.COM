# FIELDPORTER Booking System Implementation Plan & Context

## 1. Project Context & Constraints

- **Application:** FIELDPORTER Website (Next.js 14, TypeScript, Tailwind, Framer Motion).
- **Brand Identity:** Premium AI Strategy Consultancy. Dark mode, Glassmorphism, Mobile-first.
- **User Persona:** "Not a coder" - requires clear, step-by-step external instructions.
- **Key Constraint:** "80/20 Rule" - Focus only on the critical path (booking a time). No complex payments or multi-user flows for now.
- **Tech Stack:**
  - **Frontend:** Next.js 14 (App Router).
  - **Styling:** Tailwind CSS + Framer Motion (Animations).
  - **Backend:** Firebase (Auth/Firestore) + n8n (Automation).
  - **Calendar:** Microsoft 365 / Outlook.

## 2. Selected Solution: Cal.com Platform (Atoms)

- **Why:** "Headless" architecture allowing a 100% custom UI while outsourcing the complex calendar logic (Timezones, Availability, Outlook Sync).
- **Cost:** Free for <25 bookings/month (perfect for high-ticket consultancy).
- **Integration:** Native Outlook sync.

## 3. Architecture & Integration Strategy

### Frontend Integration (`app/contact/page.tsx`)

- **Current State:** Contains `SimpleContactForm` and `ContactMethods`.
- **New Design:**
  - Add a **Toggle/Switch**: "Send a Message" vs. "Book a Call".
  - **Component:** `components/booking/BookingWidget.tsx`.
  - **Styling:** The widget MUST inherit the existing "Glassmorphism" styles (translucent backgrounds, borders, blurs) defined in `globals.css` and existing components.
  - **Performance:** Lazy load the booking widget using `next/dynamic` (just like the contact form) to ensure fast initial page loads.

### Data Flow

1.  User selects time in `BookingWidget` (Frontend).
2.  Cal.com API handles the booking logic.
3.  **Calendar:** Meeting appears in User's Outlook & Client's Calendar.
4.  **Future Extension (n8n/Firebase):** We can add a webhook later to send booking data to n8n for CRM automation (not in V1 Scope, but architecturally ready).

## 4. Implementation Checklist

### Phase A: Manual Setup (USER ACTION REQUIRED)

_Detailed steps for the user to perform outside Cursor:_

1.  **Account Setup:**
    - Go to [Cal.com](https://cal.com) and sign up.
    - **Connect Calendar:** Settings > Calendars > Add **Microsoft 365/Outlook**.
2.  **Event Configuration:**
    - Create a new Event Type: "Discovery Call".
    - Set Duration: **30 minutes**.
    - **Location:** Select "Microsoft Teams" or "Google Meet" or "Phone" (default meeting location).
    - **URL Slug:** Change this to something simple like `discovery`.
3.  **API Access:**
    - Go to **Settings > Developer > API Keys**.
    - Click **Generate API Key**.
    - **Action:** Copy the **Public API Key**.
4.  **Critical Info to Provide:**
    - Your Cal.com **Username** (e.g., `freddyfieldporter`).
    - The **Event Slug** (e.g., `discovery`).
    - The **Public API Key**.

### Phase B: Agent Coding Tasks

1.  **Dependencies:** Install `@calcom/atoms` (or best available React wrapper).
2.  **Environment Variables:** Securely add API keys to `.env`.
3.  **Component Development (`BookingWidget.tsx`):**
    - Implement the calendar view.
    - **Crucial:** Override default Cal.com styles with FIELDPORTER's Tailwind classes (e.g., `bg-black/50`, `backdrop-blur-md`, `border-white/10`).
4.  **Page Integration:**
    - Update `contact/page.tsx` with the Toggle state.
    - Ensure smooth Framer Motion transitions between "Form" and "Booking" views.
5.  **Build & Verify:** Run `npm run build` to ensure no type errors.

## 5. Research Prompt for Deep Research Agent

_Copy and paste this if you need the agent to find the exact code syntax:_

```markdown
# Research Task: Headless Cal.com Implementation for Next.js 14

## Context

Project: FIELDPORTER (Premium AI Consultancy).
Stack: Next.js 14, TypeScript, Tailwind CSS, Framer Motion.
Goal: Implement a "Headless" booking widget using Cal.com.

## specific Technical Questions to Answer

1.  **Package Selection:** Is `@calcom/atoms` the correct public package, or should we use `@calcom/embed-react` for the most reliable "headless-like" experience on the free tier?
2.  **Styling Overrides:** Find the specific API/Prop for injecting custom CSS variables or Tailwind classes into the Cal.com component to force a "Dark Mode Glassmorphism" look.
3.  **Event Triggering:** How do we pre-fill fields (Name, Email) if we already know them?
4.  **Outlook Sync:** Confirm that the Outlook Calendar sync works natively with the "Platform" (Headless) usage.

## Output

- A ready-to-use `BookingWidget.tsx` component code snippet.
- Instructions for `page.tsx` integration with a toggle.
```
