# Aim 1 Literature Library

A visual research library and intellectual map for doctoral research exploring:

> **Whether unpaid carers anticipate the longer-term financial consequences of caring when making labour-market decisions, and how foresight, expectations, uncertainty and constraints shape those decisions.**

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Designed with an editorial, academic aesthetic appropriate for serious doctoral scholarship.

---

## Key Features & Architecture

### 1. Home (`/`)
- **Doctoral Masthead**: Title, subtitle, and an omni-search input across authors, concepts, methods, datasets, or arguments.
- **Dynamic Metrics**: Total papers, Read/Notes complete, Core Aim 1 papers, To read/Queue, and Direct Aim 1 evidence derived dynamically from the literature dataset.
- **The Emerging Gap Callout**: Editable statement encapsulating the primary research problem.
- **Continue Reading & Core Papers**: Quick access to active reading priorities.
- **Thematic Exploration**: Direct navigation into conceptual clusters.

### 2. My Library (`/library`)
- **Signature Visual Experience: Minimal Editorial Personal Archive (Reference-Aligned)**:
  - **Archival Canvas**: Grounded in a warm, serene ivory tone (`#EAE6DF`) with vast, intentional whitespace.
  - **Editorial Masthead**: Monospace tracked subtitle (`A PERSONAL ARCHIVE`), high-contrast serif italic heading (`Welcome to my library|` with delicate blinking cursor), dynamic volume count (`20 VOLUMES`), and pill button (`RECOMMEND A PAPER` / `ADD TO ARCHIVE`).
  - **Understated Search & Delicate Outline Pills**:
    - Understated italic serif prompt: *What are you looking for?*
    - Delicate outline filter pills (`ALL`, `FORESIGHT`, `DECISIONS`, `FINANCIAL CONSEQUENCES`, `CONSTRAINTS`, `POLICY`, `THEORY`, `METHODS`).
  - **The Grand Continuous Shelf (Default View)**:
    - All catalogued research volumes sit side-by-side across a continuous horizontal shelf baseline.
    - Zero heavy container boxes, dashboard panels, or borders around the shelves.
  - **Tactile 3D Curved Paper Spines**:
    - Authentic cylindrical shading (`inset 2px 0 3px rgba(0,0,0,0.12), inset -2px 0 3px rgba(0,0,0,0.15)`) and vertical hinge highlights.
    - Organic dimension variations: widths from 28px (slender monograph) to 62px (heavy volume); heights from 240px to 305px creating an authentic physical skyline.
    - Curated palette (~68% light & medium neutrals like white, cream, sage, fog grey, seafoam mint, oatmeal, pale ochre; ~32% rich dark accents like jet black, midnight navy, plum burgundy, espresso).
    - Five typographic spine layout archetypes with vertical bold sans and serif titles.
    - Refined anchor paper indicator: subtle gold hairline rule (`w-2.5 h-[1.5px] bg-[#B08A42]`).
    - Museum caption hover preview cards with full citation, journal, evidence classification, and candidate Aim 1 interpretation.
  - **Dynamic Arrangement Modes**:
    - *Continuous Shelf (Default, matching reference)*
    - *Theme Shelves (14 PhD themes)*
    - *Evidence Type (Foresight & Anticipation, Consequences Only, Bridge, Theory)*
    - *Reading Status (Reading, To read, Notes complete, Read, Skimmed, Cited, Discovered)*
    - *Importance (Anchor 5-Star, High Priority 4-Star, Substantive 3-Star, Contextual 2-Star)*
    - *Chronology (Decades and contemporary periods)*
    - *Author A–Z (Alphabetical clusters)*
    - *Aim 1 Role (Direct evidence, Motivates research question, Establishes why foresight matters, etc.)*
  - **The Foresight Gap Bookcase**:
    - Three sculptural architectural bays (**I. BEFORE: Anticipation**, **II. DECISION: Trade-offs**, **III. CONSEQUENCES: Realised Penalties**), visually demonstrating the empirical asymmetry justifying Aim 1.
  - **Table View**: Dense analytical matrix for thesis writing with one-click export and row expansion.
- **Table View**: Dense, practical view for literature reviewing and thesis writing with expandable row synthesis.
- **Cards View**: Card catalogue grid for alternate visual scanning.
- **Multi-Attribute Filtering & Dynamic Shelf Dimming**:
  - Full-text search dims non-matching spines and keeps matching papers vivid.
  - Filter by Theme, Aim Relevance, Evidence Type, Reading Status, Methodology, and Core papers.
- **Taking a Book off the Shelf (`PaperDetailDrawer`)**:
  - Formatted Harvard/APA citation with one-click copy.
  - Direct DOI and Consensus discovery deep-links.
  - Prominent **Why this matters for Aim 1** section.
  - Authors' empirical findings.
  - **Candidate Interpretation**: Kept visually distinct in a separate editorial panel.
  - Supports / Challenges analysis.
  - Full empirical architecture: Population, Geography, Dataset, Methodology, Study Design, Outcomes.
  - Key quotations and useful page references.
  - Live editable doctoral working notes.
  - Dynamically computed related papers in the library.

### 3. Themes (`/themes`)
- Comprehensive overview of all 14 research themes:
  - *Foresight & expectations*
  - *Preparedness & planning*
  - *Labour-market decisions*
  - *Financial consequences*
  - *Constrained choice & agency*
  - *Uncertainty*
  - *Mid-life caring*
  - *Gender & household decision-making*
  - *Care transitions*
  - *Workplace & policy context*
  - *Life-course consequences*
  - *Retirement & pensions*
  - *Theory & conceptual*
  - *Qualitative methods*
- Displays paper count, core paper count, key literature exemplars, and **unresolved doctoral questions** for each theme.

### 4. Case for Aim 1 (`/case-for-aim1`)
- **The Central Gap**: Prominent, editable thesis statement:
  > *"We know considerably more about what happens to carers' employment and finances than about what carers understood, expected or anticipated when the decisions producing those outcomes were made."*
- **6 Core Academic Pillars**:
  1. *Contribution to the field*
  2. *Economics: Labour supply, information & bounded rationality*
  3. *Social and public policy*
  4. *Labour-market policy: Retention, flexibility & employer friction*
  5. *Inequality: Gender, socioeconomic status & cumulative disadvantage*
  6. *Ageing, long-term care & demographic sustainability*
- Each pillar details the primary argument, supporting papers in the library, orthodox/contradictory evidence, empirical gaps to exploit, and live editable thesis drafting notes.

### 5. Methods (`/methods`)
- Critical breakdown of methodological approaches:
  - Qualitative In-Depth & Biographical Interviews
  - Longitudinal Panel Analysis
  - Fixed Effects Econometric Regression
  - Event Studies & Lead-Lag Models
  - Difference-in-Differences (DiD)
  - Survival & Hazard Duration Models
  - Cross-Sectional Analysis
  - Mixed Methods Designs
  - Systematic & Scoping Reviews
- Explicitly demonstrates **what each method can tell us**, **what it cannot tell us**, and its **epistemic blind spot for Aim 1**.

### 6. Reading Queue (`/reading-queue`)
- Practical workflow pipeline to manage reading stages:
  - *Read next*
  - *Important*
  - *Needs full text*
  - *Needs notes*
  - *Needs coding*
  - *Possible core paper*
- Fast inline status advancement (*Discovered* &rarr; *To read* &rarr; *Reading* &rarr; *Skimmed* &rarr; *Read* &rarr; *Notes complete* &rarr; *Cited*).

### 7. Research Map (`/research-map`)
- Interactive 6-stage causal decision & consequence chain:
  1. *Expectations & Preparedness*
  2. *Understanding of Future Consequences*
  3. *Labour-Market Decision*
  4. *Immediate Financial Effect*
  5. *Cumulative Financial Effect*
  6. *Later-Life Financial Security & Pensions*
- Overlaid with 8 intersecting structural forces:
  - *Uncertainty & Prognosis Volatility*
  - *Care Intensity (>10 / >20 hrs/wk)*
  - *Gender & Intra-Household Norms*
  - *Household Wealth & Liquidity Buffer*
  - *Formal Care Availability & Cost*
  - *Workplace Flexibility & Job Quality*
  - *Policy & Welfare System Rules*
  - *Agency vs Structural Constraint*
- Clicking any stage or overlay highlights mechanisms, status in the literature, Aim 1 gaps, and linked studies.

---

## Data Principles

1. **Separation of Claims**:
   - What the authors found (`mainFinding`).
   - What the candidate thinks (`myInterpretation`).
   - How the paper is used (`whyThisMattersForAim1`, `roleInAim1`, `aimRelevance`).
2. **The Central Thesis Distinction**:
   - Explicit categorization of `evidenceType`:
     - *Foresight & Anticipation*
     - *Consequences Only*
     - *Bridge / Both*
     - *Theoretical / Conceptual*
3. **Local-First & Database Ready**:
   - Persists paper additions, edits, reading statuses, and thesis notes to `localStorage`.
   - JSON export for version control and backup.
   - Ready for Supabase connection without structural refactoring.
4. **Aim Extensibility**:
   - Future support for Aim 2 and Aim 3 built directly into the schema and UI switcher.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Runs on [http://localhost:3000](http://localhost:3000).
Deployable directly to Vercel with zero configuration required.
