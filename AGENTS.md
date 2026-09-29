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
- Colors: cream `#FAF3E3` (background, light mode) / near-black `#14120F` (background, dark mode), white/dark-elevated cards, orange `#FF6B35` + magenta `#E8437A` (primary gradient accent, light mode), green `#3F8F5B` (secondary/data accent) — full tokens live in `app/globals.css` under `:root` and `:root[data-theme="dark"]`
- Headline font: Space Grotesk (blocky/technical, "lab" feel). Body font: Inter (sans). Data/formulas: IBM Plex Mono — used functionally for real chemical notation, not decoration.
- Wordmark "alPHARbet" — the "PHAR" is always the gradient-accented part; it's orange/magenta in light mode and purple/green (`--wordmark-grad-a` / `--wordmark-grad-b`) in dark mode
- No hero/marketing sections, no waitlist form — the site is deliberately minimal: a persistent slim `site-header` (logo, nav, search icon, theme toggle) plus content, page by page
- Global search lives in a translucent centered overlay panel (`site-header.tsx`), not a separate browse page
- Existing landing page lives at `index.html` in this repo — treat its copy voice as the reference standard, but note the actual live design in `app/globals.css` is what to match, since it has since evolved past that file's original look

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

## Build order — ALL PHASES COMPLETE as of this note
1. Single entry page template — done (76 entries across 19 categories, exactly 4 per category —
   this even count is what data/rounds.ts's 4-class rounds depend on for Solitaire/Poker)
2. A–Z index page — done, at /entries (grouped by letter; moved off the homepage so the
   homepage stays a short directory of cards instead of the full list)
3. Solitaire game — done, with drag-and-drop
4. Poker/Top Trumps game — done
5. Trends/market-optimizer section — done, using real cited data (see data/trends.ts), plus a working purchasing calculator
6. Local pharmacy/professional finder — done (/tools), but needs a Google Places API key in
   .env.local (see .env.local.example) and the same var set in Vercel's project settings before
   it works live — it degrades gracefully with a clear message if the key is missing. Also shows
   a visual Google Maps Embed of nearby pharmacies once found, which needs a SECOND, separate key
   (NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY — see .env.local.example for why it's a different key and
   how to restrict it) also set in Vercel; degrades the same way if missing.
7. Real per-drug pricing on Trends — done, but data/nadac-prices.json ships EMPTY ({}) because
   the AI sandbox that built this can't reach data.medicaid.gov's network. The founder needs to
   run `npm run fetch-nadac-prices` once from their own Terminal (not through Claude/Cowork) to
   populate it with real prices from CMS's free NADAC dataset. Re-run it any time to refresh —
   it's a manual script, not wired into the build, since the source file is 50+ MB and shouldn't
   be re-downloaded on every deploy. See scripts/fetch-nadac-prices.mjs for how it works and why.
8. History gets its own page per drug — done, at /entries/[slug]/history (linked from the main
   entry page; ends in a challenge into Solitaire, per the engagement loop above). Hazards stays
   on the main entry page. A /history hub page lists every drug's origin story at a glance and
   links into each one's full history page.
9. Homepage is a directory of cards (Games, Index, History, Trends, Tools) rather than a hub that
   embeds each page's content directly — Solitaire and Poker share one "Games" card since they're
   two variants of the same idea.
10. Price-over-time compare chart on Trends — done (data/nadac-price-history.json, populated by
    the same fetch-nadac-prices script as the price snapshot). Starts with nothing selected; the
    user picks which drugs to compare, up to 6 at once.
11. Currency filter on Trends — done (app/trends/use-currency.ts). Converts the NADAC price
    display, the purchasing calculator, and the compare chart's tooltip. Fiat rates come from
    Frankfurter (api.frankfurter.app, ECB data), crypto (BTC/ETH) from CoinGecko — both free,
    no API key, called straight from the browser. Falls back to USD with a visible note if either
    is unreachable.

Future feature ideas belong in a new phase agreed with the founder first — this list is not a
queue to keep adding to on your own.

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
