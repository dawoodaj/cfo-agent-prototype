<div align="center">

# CFO Agent — Qonto Prototype

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black)](https://nextjs.org/)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8)
![Prototype](https://img.shields.io/badge/Status-Prototype-7C3AED)

</div>

Professional prototype for a **CFO Agent** experience focused on two product pillars:

- **Auto‑PCG Categorization**: automatically classify expenses into PCG/accounting categories from receipt data.
- **Confidence Governance**: make model confidence visible, auditable, and actionable (human-in-the-loop when needed).

---

## What this prototype demonstrates

### Auto‑PCG Categorization

- **Receipt ingestion**: drag-and-drop receipt files (image/PDF) into the UI.
- **Categorization-ready UX**: a place to surface extracted fields (merchant, amount, date) and predicted category.
- **Spend overview**: dashboard card that visualizes expenses by category.

### Confidence Governance

Confidence governance is the product layer that wraps model outputs with controls:

- **Confidence score** per prediction (e.g., category assignment)
- **Policy thresholds** (e.g., auto-accept \(\ge 0.85\), route to review otherwise)
- **Audit trail** events (upload → extraction → prediction → review/override)
- **Explainability hooks** (e.g., “why this category?” features, highlighted receipt cues)

> This repository focuses on the **UI foundation** and interaction patterns; model/extraction backends can be integrated behind stable interfaces as the prototype evolves.

---

## Tech stack

- **Next.js** (App Router)
- **React + TypeScript**
- **Tailwind CSS**
- **Recharts** (expense visualization)

---

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install & run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

---

## Project structure

```text
app/
  layout.tsx        # App shell
  page.tsx          # CFO Agent main screen
  globals.css       # Tailwind styles

components/
  FileUploader.tsx      # Receipt drag-and-drop zone
  ExpenseDashboard.tsx  # Expense donut chart (Recharts)
```

---

## UX principles (prototype)

- **Safe automation**: default to automation only when confidence is high.
- **Transparent decisions**: show confidence + reasoning cues.
- **Fast review**: enable CFO/finance ops to override quickly and feed back corrections.

---

## Roadmap (suggested)

- **Receipt parsing**: integrate OCR/extraction and show extracted fields
- **PCG taxonomy**: configurable chart of accounts / PCG mapping
- **Confidence policies**: per-merchant, per-team, per-amount thresholds
- **Review queue**: triage “low confidence” transactions with bulk actions
- **Observability**: model drift & governance dashboards (accept rate, override rate)

---

## Disclaimer

This is a **prototype** intended for product exploration and UX validation. It is **not** production-hardened and does not include security/compliance controls required for real financial data handling.
