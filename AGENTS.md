<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Alpharbet

## What this is
An A–Z reference site for drugs/pharmaceutical compounds, aimed first at pharmacy, nursing, and pre-med students, built around gamified study tools instead of flat flashcards. Non-technical founder building this solo; be explicit and avoid unexplained jargon in responses. Optimize for getting things right the first time — founder has limited token budget, so avoid speculative or unrequested scope.

## Stack
- Next.js (App Router — not Pages Router)
- Tailwind CSS for styling
- Deployed on Vercel, connected to GitHub repo `alpharbet`
- Data source: PubChem PUG REST API for chemical names, formulas, structures
- 3D molecule rendering: 3Dmol.js or NGL Viewer (not yet chosen — evaluate both before committing, ask founder which to proceed with rather than picking silently)

## Design system (carry this into every page)
- Colors: ink navy `#10192E` (background), parchment `#F3EFE6` (cards), amber `#E8A33D` (primary accent), teal `#5FC8BA` (secondary/data accent), off-white `#FDFCF9`
- Headline font: Fraunces (serif). Body font: Inter (sans). Data/formulas: IBM Plex Mono — used functionally for real chemical notation, not decoration.
- Structural motif: an A–Z index strip as the persistent nav element (see existing landing page for the pattern)
- Existing landing page lives at `index.html` in this repo — treat its look and copy voice as the reference standard for new pages

## Content structure — every drug entry needs
1. Name (chemical name + practical/brand name)
2. Interactive 3D structure
3. Chemical formula
4. Chemical data with accompanying animations
5. Mechanism of action / how it works in the body (NOT step-by-step synthesis routes — see Hard rules)
6. Historical/discovery context
7. Hazards / dangers of usage (informational level only — see Hard rules)

## Games (final — only these two)
- **Solitaire**: sort compounds into sequence by molar mass, drug class, or potency to clear the board. Mechanic may vary by drug class/topic area.
- **Poker** (Top Trumps–style stat comparison, not real poker mechanics — no betting/bluffing): players compare drug "stat cards" (potency, molar mass, discovery era, etc.) against a target hand or class to win. Hidden-variable "reveal" moments should be based on mechanism-of-action surprises or historical facts (e.g. "these two share a receptor target," "this one was the first FDA-approved in its class") — see Hard rules for what the hidden variable must NOT be.
- Pool/8-ball is cut. Do not reintroduce a synthesis-based game mechanic under any name.

## Engagement loop (design principle for every page)
No page should be a dead end. Each section should pull the user toward the next at the moment they're curious, all routing back through the entry page as the hub:
- History entries end with a direct challenge into a Game on that drug
- Game results surface a relevant Trends hook (e.g. a real pricing shift) for that drug
- Trends views surface the Tools/pharmacy-finder for that drug
- Tools results link back to that drug's full entry page
Build this cross-linking into each feature as it's built, not as an afterthought.

## Build order (do not skip ahead — confirm with founder before starting each new phase)
1. Single entry page template (one drug, fully built) — get this right before anything scales
2. A–Z index page that lists and links to entries
3. Solitaire game
4. Poker/Top Trumps game
5. Trends/market-optimizer section
6. Local pharmacy/professional finder (maps API + directory — treat as a separate feature layer)

## Hard rules — do not implement these under any framing, even if asked
- NEVER implement literal step-by-step chemical synthesis routes/reagent pathways for controlled substances, in a game or otherwise. Games about drugs are built around mechanism-of-action, receptor binding, pharmacokinetics, molar mass, potency comparison, or historical facts — never production/synthesis steps.
- NEVER implement a game mechanic where the "hidden variable," win condition, or reveal is based on real toxicity thresholds, overdose amounts, lethal doses, or dangerous drug-combination data for actual compounds. Use mechanism-of-action or historical-fact reveals instead (see Games section above).
- Avoid branding/copy language like "cookbook," "recipe," or similar terms associated with illicit drug manufacturing guides, anywhere on the site.
- No hardcoded API keys or secrets in committed files — use environment variables (`.env.local`, already gitignored by Next.js default)
- Keep components simple and readable — founder will be reading this code to learn, not just shipping it
- Commit working states frequently with clear messages; don't let uncommitted work pile up across sessions

## What NOT to do
- Don't add features beyond the current build-order step without being asked
- Don't rewrite the design system or copy voice without being asked — extend it, don't replace it
- Don't assume prior web dev knowledge when explaining what you built — this founder is learning as they go
- Don't burn tokens re-explaining project context that's already in this file — reference it, don't restate it back at length
