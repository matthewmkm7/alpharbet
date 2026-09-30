<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Alpharbet

## What this is
An A–Z reference site for drugs/pharmaceutical compounds. Audience is deliberately NOT limited to
students — this is for healthcare professionals (pharmacists, nurses, physicians), pharmacy/nursing/
pre-med students, and the general public curious how drugs actually work, all at once. Do not write
copy, slogans, or features that frame the site as a student study tool first — "for students" is one
audience among several, not the identity of the site. Built around interactive, game-like ways to
explore the material (not flat flashcards or a dry database), but the positioning is "understand
drugs," not "study for an exam." Non-technical founder building this solo; be explicit and avoid
unexplained jargon in responses. Optimize for getting things right the first time — founder has
limited token budget, so avoid speculative or unrequested scope.

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
4. Chemical data (formula, molecular weight, category) — the earlier animated
   molecular-weight-vs-water/caffeine comparison bar was removed by founder
   request (added no real information); the section is plain stats only for
   now
5. Mechanism of action / how it works in the body (NOT step-by-step synthesis routes — see Hard rules)
6. Side effects — the common effects experienced during NORMAL therapeutic use (e.g. "commonly
   causes drowsiness, dry mouth"). Distinct from Hazards below: side effects covers day-to-day
   tolerability; hazards covers allergy risk, drug interactions, contraindications, and
   misuse/resistance risk. Keep it at the same informational level as hazards — no dosage,
   overdose, or lethal-dose figures (see Hard rules). Field is `sideEffects` in data/drugs.ts.
7. Historical/discovery context
8. Hazards / dangers of usage (informational level only — see Hard rules)

## Games (final — only these two)
- **Solitaire**: sort compounds into sequence by molar mass, drug class, or potency to clear the board. Mechanic may vary by drug class/topic area. Has a Medium/Hard difficulty toggle: Medium shows each card's name and drug class as always; Hard shows only the chemical formula, so you're judging weight from the chemistry itself rather than recognizing the drug by name.
- **Poker** (Top Trumps–style stat comparison, not real poker mechanics — no betting/bluffing): players compare drug "stat cards" (potency, molar mass, discovery era, etc.) against a target hand or class to win. Hidden-variable "reveal" moments should be based on mechanism-of-action surprises or historical facts (e.g. "these two share a receptor target," "this one was the first FDA-approved in its class") — see Hard rules for what the hidden variable must NOT be. Your whole hand is dealt face-up and you choose which card to play each hand (not a forced top-of-deck order); the computer plays a random card from its hidden hand in response. Three distinct battling stats, all derived from real data already on the card — molecular weight, years since discovery, and total atom count (parsed from the formula via `atomCount()` in data/drugs.ts) — deliberately not a fabricated "potency score", per the hard rule against presenting invented numbers as real.
- Pool/8-ball is cut. Do not reintroduce a synthesis-based game mechanic under any name.

## Engagement loop (design principle for every page)
No page should be a dead end. Each section should pull the user toward the next at the moment they're curious, all routing back through the entry page as the hub:
- History entries end with a direct challenge into a Game on that drug
- Game results surface a relevant Trends hook (e.g. a real pricing shift) for that drug
- Trends views surface the Tools/pharmacy-finder for that drug
- Tools results link back to that drug's full entry page
Build this cross-linking into each feature as it's built, not as an afterthought.

## Build order — ALL PHASES COMPLETE as of this note
1. Single entry page template — done (84 entries across 19 categories; most categories have
   exactly 4, Antibiotic and Antidiabetic have grown to 8 each as the catalog expands — always
   add new entries in multiples of 4 to a category, since that's what data/rounds.ts's 4-class
   Solitaire/Poker rounds are built around)
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
7. Real per-drug pricing on Trends — done. data/nadac-prices.json is populated (72 drugs, from
   the founder running the script locally), but data/nadac-price-history.json is still EMPTY
   ({}) — it was added after that last run, so the per-drug price snapshot works but the "compare
   over time" chart (build order #10, below) has nothing to plot yet and will keep showing "no
   price history yet" until the founder re-runs the script. The AI sandbox that built this can't
   reach data.medicaid.gov's network, so this can only be run from the founder's own Terminal
   (not through Claude/Cowork):
   run `npm run fetch-nadac-prices` to (re-)populate both files with real prices from CMS's free
   NADAC dataset. Re-run it any time to refresh — it's a manual script, not wired into the build,
   since the source file is 50+ MB and shouldn't
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
12. Conditions section (originally called "Illnesses" — renamed in phase 17 below) — done, at
    /conditions (data/conditions.ts). Each condition lists real, cited
    CDC prevalence stats and links to the drug classes that treat it, cross-linking back into
    entries, Games, and Trends per the engagement loop. Starts with 6 conditions covering 8 of the
    19 drug categories (same "start real, grow later" pattern as Trends' spotlightFacts) — add
    more the same way: WebSearch + WebFetch a primary CDC/WHO page, never invented numbers.
    IMPORTANT scope decision: "geographic data" here means real published aggregate figures
    (national, and state-level only where a verified source exists — currently diabetes and
    depression) — NOT a live "conditions near you" feature. No free source for that exists;
    CDC's own county/ZIP-level PLACES dataset lives at data.cdc.gov, which — like
    data.medicaid.gov (see NADAC pricing, above) — this sandbox's shell can't reach directly, so
    live per-user geolocation isn't buildable here without a paid data provider.
13. Monetization scaffolding — done, but INACTIVE until the founder has real accounts/IDs.
    Nothing here changes what a visitor sees until env vars are set in Vercel:
    - NEXT_PUBLIC_PHARMACY_AFFILIATE_URL — once set, shows a disclosed affiliate link ("Find a
      discount card") on /tools right after someone finds a nearby pharmacy. Needs the founder to
      apply to a pharmacy-discount affiliate program (e.g. GoodRx's) and paste the tracked URL
      they're given. See .env.local.example.
    - NEXT_PUBLIC_ADSENSE_CLIENT_ID — once set, loads the Google AdSense script site-wide
      (app/layout.tsx). Needs the founder to apply at adsense.google.com once the site is live on
      its own domain (their review requires a real domain + a privacy policy, which this site
      already has at /privacy).
    Both follow the same "degrade gracefully with no key" pattern already used for the Google
    Places/Maps keys — leaving either blank renders nothing, not a broken link or placeholder.

14. SEO foundation + a second affiliate channel — done, and this one is NOT inert: it changes
    what search engines see immediately (per-page titles/descriptions, a sitemap, robots.txt,
    Open Graph tags), because none of the monetization in phase 13 can earn anything without
    organic traffic finding these pages first.
    - app/sitemap.ts / app/robots.ts — auto-generated from data/drugs.ts and data/illnesses.ts,
      so every entry and illness page is listed without hand-maintaining a list.
    - Every entry page, illness page, and hub page (Entries, Illnesses, Trends, Tools) now has
      its own title and description via generateMetadata/export const metadata, instead of all
      pages sharing the homepage's title — this is what shows up in a Google search result or a
      shared link's preview.
    - NEXT_PUBLIC_SITE_URL (see .env.local.example) — set this to the real domain as soon as one
      exists; until then the sitemap/robots/link-previews use a placeholder domain.
    - NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG — a second, independent affiliate channel from the
      pharmacy-discount one in phase 13: a "search study resources" link on every entry page,
      pointed at Amazon search results for textbooks/study guides on that drug's class. Same
      degrade-gracefully pattern — inert until the founder has a real Associate tag.

15. Richer chemical data + direct institution sponsorships — done.
    - Chemical data panel now shows real PubChem descriptors beyond formula/weight/category —
      lipophilicity (XLogP), polar surface area, H-bond donor/acceptor counts, rotatable bonds,
      and IUPAC name — once populated. Like NADAC pricing, this sandbox can't reach PubChem's
      network (blocked by robots.txt/proxy), so data/pubchem-properties.json ships as {} and the
      founder runs `npm run fetch-chem-data` once from their own Terminal to populate it (batches
      ~40 drugs per PubChem request via scripts/fetch-chem-data.mjs). The panel just shows the 3
      original stats until that's been run — same degrade-gracefully pattern as everything else.
    - Direct institution/company sponsorships — the fastest-to-launch revenue stream on the site,
      because unlike AdSense/affiliate programs it needs NO third-party approval: the founder
      pitches nursing/pharmacy programs, test-prep companies, etc. directly and sets a price
      themselves.
      - /partners — a pitch page explaining the offer, linked from the site footer.
      - NEXT_PUBLIC_PARTNERSHIP_EMAIL — the inquiry contact address shown on /partners.
      - data/sponsors.ts — starts as an empty array; once a deal is actually closed and paid for,
        add one object here by hand (id, name, tagline, url) — no other code changes needed.
      - SponsorSpot (app/sponsor-spot.tsx) — renders nothing while data/sponsors.ts is empty;
        once it has entries, shows them as a clearly labeled "Sponsored" card. Placed on entry
        pages and /tools.
    Adding more drug entries (the catalog is still 84) was intentionally left for a follow-up
    pass — writing accurate mechanism/history/hazards content for new drugs is its own focused
    piece of work, not something to rush alongside a data-schema and revenue-infrastructure phase.

16. Positioning pivot: general audience, not "student study tool" — done. The site was originally
    framed as being built first for pharmacy/nursing/pre-med students ("built around games, not
    flashcards"). The founder explicitly rejected that framing as too narrow — the site has no
    upper limit on audience and should read that way everywhere. Changed:
    - Homepage hero line (app/page.tsx), root layout's default meta description (app/layout.tsx),
      and the legacy index.html reference copy — all dropped the "for pharmacy/nursing/pre-med
      students" framing and the "not flashcards" slogan specifically.
    - /terms and /privacy — broadened from "built for pharmacy, nursing, and pre-med students" to
      general-audience language, while keeping the substance of both pages (not medical advice,
      not directed at children) exactly as before — those protections don't change with audience.
    - /partners — broadened "who sees it" and the sponsor-fit list beyond student-recruiting
      pitches to the full audience (healthcare pros, students, general public) and adjacent
      sponsor categories (health media, telehealth, equipment brands).
    This does NOT relax any Hard rule below — if anything, a broader, non-professional audience
    makes the no-synthesis/no-toxicity-mechanics/informational-only-hazards rules MORE important,
    not less, since more readers won't have professional judgment to fall back on. Do not read
    "no true limit" as license to loosen those rules; it's about who the content is framed for,
    not what the content is allowed to contain.

17. Side effects field + Conditions expansion/rename — done.
    - Every drug entry now has a `sideEffects` field (see Content Structure item 6 above) —
      distinct from `hazards`: side effects covers the common, day-to-day tolerability profile of
      normal use; hazards covers allergy risk, interactions, contraindications, and misuse risk.
      All 84 entries were populated with real, drug-specific content (not generic placeholder
      text) at the same informational level as hazards — no dosage/overdose figures.
    - The "Illnesses" section was renamed to "Conditions" (founder's choice, from a short list of
      options) and expanded with real `symptoms` (string list) and `treatment` (approach, not
      dosing) fields per condition:
      - data/illnesses.ts → data/conditions.ts; type `Illness` → `Condition`; `illnesses` →
        `conditions`; `getIllnessBySlug`/`getIllnessesForCategory` →
        `getConditionBySlug`/`getConditionsForCategory`.
      - app/illnesses/ → app/conditions/; route is now /conditions and /conditions/[slug].
      - CSS classes `.illness-drug-*` → `.condition-drug-*`; added `.condition-symptom-list`.
      - All cross-links updated (nav in site-header.tsx, homepage card, entry-page "Related
        condition" card, sitemap.ts).
      - symptoms/treatment content is standard, well-established medical knowledge (same
        no-citation-needed bar as drugs.ts's mechanism/history/hazards fields) — the
        prevalence/geographic stats keep their existing real, cited-source bar unchanged.
    If more conditions get added later, follow the same real-sourced-numbers pattern as before for
    prevalence/geographic data, but symptoms/treatment can be written straight from established
    medical knowledge like mechanism/history/hazards already are.

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
