# DESIGN.md — Oyange Photography

Read this before changing any public page. It overrides the "cinematic / premium" notes in `AGENTS.md` and `CLAUDE.md` wherever they conflict.

## The idea

The photos are the design. Every section is built from Aquila's own pictures and his own words, laid out like a printed photo book: big images, plain serif headings, short lines of text, hairline rules. If a section could sit on any other photographer's site unchanged, it is wrong.

**One layout primitive, repeated:** a real photo next to (or above) a serif heading and one or two sentences. Services, Process and Packages all use it. New sections should too.

## Do

- Use a real photo from `public/portfolio/` (listed in `src/data/portfolio.ts`) wherever a section needs something visual.
- Headings in Playfair Display, sentence case ("What I shoot", not "WHAT I SHOOT" or "Our Services").
- Copy in first person, in Aquila's voice. Specific beats grand: "a hiking group at Elephant Hill summit", not "timeless memories".
- Separate things with hairline borders (`border-border`) and whitespace.
- Square corners on photos. Rounded corners only on buttons, inputs' focus states and small controls.
- Gold (`primary`) sparingly: the main button, active filter underline, links. One accent, not a wash.
- Only claims Aquila has confirmed. No invented stats, awards, years, testimonials or promises.

## Don't (these read as AI-generated)

- Grids of equal cards with an icon on top, a bold title and two grey lines.
- Numbered 01 / 02 / 03 step rows or icon circles for a process.
- An all-caps, letter-spaced label above every heading. The hero's "Nairobi, Kenya" is the one allowed.
- A serif italic "accent word" in headings ("Questions *Answered*"). Italic appears once, in About ("This is *my Story*"), because that is his old site's heading.
- Glassmorphism panels, glowing shadows, gradient text, pulsing borders, floating pill navbars.
- One big rounded radius on every element.
- Stat banners ("200+ clients / 12 years / 50+ awards") unless the numbers are real and entered in the admin.
- Stock or AI images. The library is the only image source.

## Where things live

- Photos: `public/portfolio/<album>/NNN.jpg` (web-sized from `F:/Work/Websites/Aquila/converted-images/`; the raw screenshots and his old Pixieset site are in `F:/Work/Websites/Aquila/source-images/`).
- Captions and album order: `src/data/portfolio.ts`.
- Service photos: `serviceMedia` in `src/components/Services.tsx`. Package photos: `packageImages` in `src/components/Packages.tsx`.

## Before shipping

Check the page against the "Don't" list, then look at it on a phone. Why these rules exist: `DECISIONS_LOG.md`, 2026-09-27.
