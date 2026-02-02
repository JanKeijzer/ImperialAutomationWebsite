# CLAUDE.md — Imperial Automation Website Project

## Project Overview

Build a landing page for **imperial-automation.eu** and adjust the branding on the existing **jan-keijzer.nl** MkDocs site to create a clear separation between personal (Jan Keijzer) and business (Imperial Automation) identity.

## Context

Jan runs Imperial Automation, an AI automation consultancy. He has two domains:

- **jan-keijzer.nl** — Currently a MkDocs Material site with portfolio, experience pages, and blog. Currently fully branded as "Imperial Automation" (logo, name, CTAs). Deployed via GitHub Actions to GitHub Pages.
- **imperial-automation.eu** — Not yet live. Needs a branded landing page.

## Strategic Decisions (Already Made)

### Two-site architecture

| Site                       | Role                | Identity                                                                                                                   |
| -------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **jan-keijzer.nl**         | Personal hub        | "Jan Keijzer — AI Automation Consultant". Portfolio, experience, tech blog, personal projects. Warmer, more personal tone. |
| **imperial-automation.eu** | Business front door | "Imperial Automation". Short, punchy landing page. Services pitch, CTAs, brand identity. Professional but approachable.    |

Cross-linking: IA site links to jan-keijzer.nl for "meet the person behind IA". Jan-keijzer.nl links to imperial-automation.eu for "my current business".

### Technology choice for imperial-automation.eu

**Static HTML** on GitHub Pages. Reasons:
- A single-page landing page doesn't need MkDocs or WordPress
- Full pixel-perfect control over brand styling
- Zero maintenance, free hosting
- Can be migrated to MkDocs later if more pages are needed

### The Ariadne Thread as visual motif (beeldmerk)

The "thread of Ariadne" (draad van Ariadne) is a key brand element — a flowing curve with the brand gradient (Navy #1E3A8A → Blue #3B82F6 → Gold #FCD34D) that appears as a subtle visual connector across all brand touchpoints.

**Story:** Like Ariadne's golden thread that guided Theseus out of the labyrinth, Jan guides companies out of their operational maze.

**Implementation:**
- On **imperial-automation.eu**: Prominent — the thread is a hero visual element, representing the journey from complexity to clarity
- On **jan-keijzer.nl**: Subtle — a delicate line in the header/footer area that visually connects to the IA brand without making the personal site feel corporate
- The thread consists of: one main flowing curve (stroke-width ~6) with subtle secondary curves (stroke-width ~2, low opacity) and small accent dots along the path

**Reference SVG** (from LinkedIn banner, located in brand assets):
```
Main curve: M -50 350 Q 100 320, 200 280 Q 350 220, 500 200 Q 700 175, 900 190 Q 1000 198, 1050 195
Gradient: #1E3A8A (0%) → #3B82F6 (40%) → #FCD34D (80-100%)
Secondary curve: stroke #3B82F6, width 2, opacity 0.15
Accent curve: stroke #FCD34D, width 2, opacity 0.25
Dots: small circles along the path with increasing gold opacity
```

## Brand Specifications

### Colors
- **Navy:** #1E3A8A (primary, headings, primary buttons)
- **Blue:** #3B82F6 (secondary, accents)
- **Gold:** #FCD34D (CTAs, highlights, thread endpoint)
- **Light Steel Blue:** #E0E7F1 (backgrounds)
- **Gradient direction:** Navy → Blue → Gold

### Typography
- **Logo:** Comfortaa (Google Font)
- **Body text:** system-ui, -apple-system, Arial, sans-serif
- **Headings:** Bold, Navy
- **Hierarchy:** H1 18pt Bold Navy, H2 14pt Bold Blue, body 11pt Regular

### Logo files
Located in brand assets zip (`v3.zip`):
- `final/imperial-color-icon.svg` — Favicon, social
- `final/imperial-color-horizontal.svg` — Header
- `final/imperial-white-horizontal.svg` — On dark backgrounds
- `social/favicon-32x32.png` — Browser favicon
- `social/apple-touch-icon.png` — iOS

### Tagline
- **Primary (English):** "Turn friction into flow"
- **Secondary (Dutch):** "Van knelpunt naar groei"
- The English tagline is the default. The Dutch variant may be used in Dutch-language communications but is never the default.

### Tone of Voice
- Clear and direct, no jargon
- Warm and personal, address the reader directly
- Pragmatic, focused on results
- Slightly witty where appropriate, never forced
- English is the default for all external communications
- Dutch may be used when communicating with Dutch-speaking clients

### Button styles
- Primary: Navy background, white text
- Secondary: White background, navy border
- CTA: Gold background, navy text

## Task 1: Build imperial-automation.eu

### Structure
```
imperial-automation-site/
├── index.html              # The entire site (single file, inline CSS)
├── CNAME                   # imperial-automation.eu
├── assets/
│   ├── logo-horizontal.svg # From brand assets
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── profile.jpg         # Jan's photo (to be added)
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deployment
└── README.md
```

### Landing page content sections

1. **Hero** — Ariadne thread as background visual element. IA logo. Tagline "Turn friction into flow". Short elevator pitch (2-3 sentences in English). Primary CTA: "Book Free Strategy Call" → Calendly link.

2. **What I do** — Three value propositions as cards:
   - "Process Automation" — Identify and eliminate operational bottlenecks
   - "AI Integration" — Bring AI capabilities into existing workflows
   - "Technical Leadership" — Architecture, build, or lead your dev team to delivery

3. **Why Imperial Automation** — Brief trust indicators:
   - 30+ years across healthcare, aerospace, defence, finance
   - PhD in Nuclear Reactor Physics (TU Delft)
   - Datalumina Certified AI Engineer
   - Scaled companies from small teams to 40-50 employees

4. **CTA section** — "Wondering what automation could do for your business?" with two buttons:
   - "Book a Strategy Call" → Calendly
   - "Get to know me" → jan-keijzer.nl

5. **Footer** — Contact email, KvK number, BTW number, LinkedIn link, link to jan-keijzer.nl

### Design notes
- The Ariadne thread should flow across the hero section, perhaps continuing subtly down the page
- Background: Light Steel Blue (#E0E7F1)
- Use the brand gradient for decorative elements
- Mobile responsive
- The page should feel premium but approachable — not a generic template
- Language: English (international audience, especially important with upcoming relocation to Hungary)

### DNS (already at INWX)
```
imperial-automation.eu      A      185.199.108.153
imperial-automation.eu      A      185.199.109.153
imperial-automation.eu      A      185.199.110.153
imperial-automation.eu      A      185.199.111.153
www.imperial-automation.eu  CNAME  <github-username>.github.io
```

### Redirects to configure
- imperialautomation.eu → imperial-automation.eu
- imperial-automation.com → imperial-automation.eu

## Task 2: Adjust jan-keijzer.nl branding

### Local location
The location locally is ~/Projects/PortfolioWebsite

### Changes needed
1. **Site name:** Change from "Imperial Automation" to "Jan Keijzer" or "Jan Keijzer — AI Automation Consultant"
2. **Logo:** Consider using a personal variant or a more subtle IA reference
3. **Tagline/subtitle:** Something personal rather than the IA tagline. E.g., "Portfolio & Blog" or "AI Automation Consultant"
4. **Footer:** Add link to imperial-automation.eu
5. **About page:** Reference imperial-automation.eu for business inquiries
6. **Ariadne thread:** Add as a subtle decorative element (in custom CSS for the MkDocs Material theme). Much more subtle than on the IA site.
7. **Overall feel:** Should feel like a personal professional site, not a company site. Think "consultant's portfolio" rather than "agency website"

### What stays the same
- MkDocs Material as the platform
- All existing content (experience pages, blog posts)
- GitHub Actions deployment pipeline
- The Calendly CTA (maybe reworded slightly)
- The overall color scheme can stay (it's professional), but should feel less "branded"

## Brand Assets Location

### Local location
The local location is ~/Documents/Werk/Imperial Automation/02-bedrijf/Huisstijl/v3

- All SVGs in `final/` directory (text converted to paths, ready for production)
- Social media PNGs in `social/` directory
- LinkedIn banner with Ariadne thread: `social/linkedin-banner-updated.svg`
- Full brand guide: `imperial-automation-huisstijlgids-v3.docx`

## Important Notes

- Jan is experienced (30+ years dev, knows HTML/CSS/PHP/Python) — don't over-explain basic concepts
- The IA site should be in English (international audience, relocating to Hungary)
- Keep it simple — this is a landing page, not a web app
- The Ariadne thread is the creative soul of the design — spend time getting it right
- Both sites deploy to GitHub Pages via GitHub Actions
- Jan's Calendly: https://calendly.com/imperial-automation/introduction-call
