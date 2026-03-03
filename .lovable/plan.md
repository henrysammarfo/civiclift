

# CivicLift — Project Landing Page

## Overview
A dark-themed landing page for **CivicLift**, an AI-powered SDG Support Agent built with OpenClaw and FLock. Keeps the same visual design language from the original spec (loading screen, floating navbar, hero with video background, GSAP/Framer Motion animations) but repurposed entirely for the CivicLift project.

## New Dependencies
- **framer-motion** — loading screen animations
- **gsap** — hero entrance animations
- **hls.js** — Mux HLS video background

## Theme & Design System
Same dark theme as original spec:
- CSS variables: `--bg: #0a0a0a`, `--surface: #141414`, `--text: #f5f5f5`, `--muted: #888`, `--stroke: #1f1f1f`
- Accent gradient: `linear-gradient(90deg, #89AACC, #4E85BF)`
- Google Fonts: Inter (body) + Instrument Serif (display headings)

## Component 1: Loading Screen (same structure)
- Full-screen overlay, 2.7s duration
- **Top-left**: "CIVICLIFT" label (replaces "PORTFOLIO")
- **Center**: Rotating words — "Triage" → "Connect" → "Act" (reflecting CivicLift's workflow)
- **Bottom-right**: Counter 000→100
- Bottom accent gradient progress bar

## Component 2: Navbar
- Floating pill navbar, fixed at top
- **Logo**: Circle with gradient ring, "CL" initials (CivicLift)
- **Nav links**: "Home", "How It Works", "Impact", "Tech Stack"
- **CTA button**: "Try on Telegram ↗" with gradient border hover

## Component 3: Hero Section
- Full viewport, Mux HLS video background (dark fluid animation)
- **Eyebrow**: "UK AI AGENT HACKATHON '26"
- **Headline**: "CivicLift" — large display italic
- **Tagline cycles**: "Triage Needs" → "Find Services" → "Build Action Plans" → "Track Impact" every 2s
- **Bio**: "An autonomous AI agent that turns urgent needs into completed steps — matching residents to local services, generating action plans, and tracking real impact. Aligned with UN SDGs 1, 3 & 10."
- **CTA buttons**: "See How It Works" (filled) + "View on GitHub" (outlined)
- Scroll indicator at bottom

## Component 4: How It Works Section (NEW)
A section below the hero showing CivicLift's 4-step flow:
1. **User sends a message** — via Telegram/WhatsApp
2. **Agent triages** — understands urgency and need
3. **Services matched** — finds relevant local resources
4. **Action plan delivered** — call scripts, email drafts, reminders

Each step shown as a card with an icon, animated on scroll.

## Component 5: Impact & SDGs Section (NEW)
- Three SDG cards: **No Poverty (SDG 1)**, **Good Health (SDG 3)**, **Reduced Inequalities (SDG 10)**
- Metrics display (placeholder): Sessions, Plans Generated, Steps Completed, Avg Time-to-Plan
- Subtle gradient accents

## Component 6: Tech Stack Section (NEW)
- Visual grid showing: **OpenClaw** (agent framework), **FLock API** (open-source LLM inference via Qwen), **TypeScript**, **SQLite**, **Telegram**
- Brief description of the architecture

## Animations
- GSAP timeline on hero: headline reveal, blur-in for supporting elements
- CSS keyframes: scroll-down indicator, fade-in for cycling tagline
- Scroll-triggered fade-in for sections below the hero

