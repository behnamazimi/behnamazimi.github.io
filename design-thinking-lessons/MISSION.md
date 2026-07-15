# Mission: Frontend Architecture & Design Thinking (Next.js/TypeScript, senior IC)

## Why
As a working senior engineer on a Next.js/TypeScript/Bun/Node stack, you want fluent command of frontend architecture and design vocabulary — not to pass an exam, but so you can make and defend real component, state, rendering, and performance decisions at work, explain them clearly to teammates and reviewers, and carry the same design thinking (coupling, cohesion, tradeoff analysis) into any codebase, including your PHP/MySQL background. The problem this workspace exists to solve: concepts and terms you've studied before evaporate afterward — the constraint on every lesson is retention, not exposure.

## Success looks like
- You can look at a real Next.js/TypeScript component and name its coupling/cohesion problems using correct vocabulary, unprompted.
- You can justify a state-management choice (local vs. global vs. derived) by pointing to the component boundaries that constrain it.
- You can pick SSR/SSG/streaming/RSC for a given scenario and defend the choice on tradeoffs, not habit.
- You can trace a performance/scalability tradeoff back to an earlier architectural decision (component boundary, state shape, rendering choice).
- Weeks after a lesson, you can still produce the term and use it correctly in a spaced quiz — not just recognize it in a multiple-choice list.
- You can write a short design-doc/ADR-style note justifying an architecture decision, and know what a code review, test plan, or incident writeup for that decision should cover.
- For each frontend-specific lesson, you can restate the underlying general software-design principle (e.g. coupling/cohesion, abstraction, tradeoff analysis) and give a non-frontend example of it.

## Constraints
- Senior engineer — no syntax tutorials. Teach the "why" and the vocabulary; assume fluency in JS/TS/React mechanics.
- Daily stack: Next.js, TypeScript, JavaScript, Bun, Node. Secondary background: PHP, MySQL.
- All primary-track examples must be real Next.js/TypeScript code or case studies — no abstract pseudocode.
- Every lesson builds on the previous one: component boundaries → state shape → rendering strategy → performance, each lesson explicitly naming how earlier decisions constrain the current topic.
- Active retrieval is mandatory: build something small, then explain the decision back, naming the specific pattern/term used. Vocabulary and concepts get re-quizzed after time has passed, not just immediately after teaching.
- Flag it explicitly (don't just silently correct) when a concept is used correctly but named wrong, or named right but used wrong.
- Lesson *content* for all topics is available up front (user's explicit choice, 2026-07-15) — but a topic only counts as actually learned once explanations are confident and vocabulary is produced unprompted in conversation. Shaky or fuzzy explanations mean reinforce that topic in conversation even if later lessons are already sitting on disk.
- Secondary track (code review, testing strategy, incident response, design docs) runs in parallel, lower intensity, introduced only when it naturally attaches to whatever primary-track topic is current.

## Out of scope (for now)
- Backend system design and infra beyond what's needed to reason about data-fetching/rendering boundaries.
- Deep internals of specific state libraries (Redux internals, Zustand internals) — strategy and tradeoffs over library API mastery.
- Visual/CSS design systems.
- EM/leadership-level process — this stays at the individual-contributor level: reviewing, testing, incident response, docs.
