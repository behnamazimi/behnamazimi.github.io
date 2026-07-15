# Frontend Architecture & Design Thinking — Resources

## Knowledge

### Component/API design, coupling & cohesion
- [Advanced React Component Composition — Frontend Mastery](https://frontendmastery.com/posts/advanced-react-component-composition-guide/)
  In-depth, senior-level guide to composition-based APIs, slot patterns, and defending components against changing requirements. Use for: composition vs. configuration, compound components.
- [React Design Patterns — patterns.dev](https://www.patterns.dev/react/react-2026/)
  Maintained reference of current React patterns (compound components, render props, custom hooks as the primary composition unit). Use for: pattern vocabulary, current idioms.
- [Organizing your React Code: Cohesion and Coupling — DEV Community](https://dev.to/cloudx/organizing-your-react-code-cohesion-and-coupling-579)
  Direct, accessible mapping of classic cohesion/coupling theory onto React components. Use for: first-pass definitions, before generalizing to non-frontend code later.

### State management strategy
- [React State Management in 2025: What You Actually Need — Nadia Makarevich (Developer Way)](https://www.developerway.com/posts/react-state-management-2025)
  Widely respected, technically deep, opinionated take on matching state tool to state shape rather than defaulting to a library. Use for: local vs. global vs. derived state decision framework.
- [Managing State — react.dev](https://react.dev/learn/managing-state)
  Official React docs. Use for: canonical vocabulary (lifting state up, colocation) — verify third-party summaries against this.

### Rendering strategy (SSR/SSG/streaming/RSC)
- [Caching (Cache Components) — Next.js official docs](https://nextjs.org/docs/app/getting-started/caching)
  Current (Next.js 16, 2026) official model: `use cache`, Partial Prerendering, Suspense-based streaming. Supersedes the older ISR/SSG-only mental model.
  **Gotcha already caught:** the older `/docs/app/building-your-application/rendering` URL now redirects here. Don't trust older tutorials' terminology (ISR "revalidate" as the primary lever) without cross-checking current docs — this framework moves fast.
- [How to Choose the Best Rendering Strategy for Your App — Vercel Blog](https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app)
  Primary-source decision framework from the framework's own maker. Use for: tradeoff table across SSR/SSG/ISR/RSC.
- [Server Components — react.dev](https://react.dev/reference/rsc/server-components)
  Official React docs on the RSC model itself (framework-agnostic). Use for: what RSC actually is vs. Next.js's specific implementation of it.

### Performance & scalability
- [Web Vitals — web.dev (Google)](https://web.dev/articles/vitals)
  Official definition source for LCP, INP, and CLS with concrete thresholds. Use for: naming what "fast" actually means before optimizing anything.
- [Next.js Performance Optimization: 10 Proven Techniques — Pagepro](https://pagepro.co/blog/nextjs-performance-optimization-in-9-steps/)
  Practitioner round-up of concrete Next.js levers (bundle analysis, `next/dynamic`, image optimization). Use for: a checklist once the conceptual tradeoff is understood — not for the tradeoff itself.

### Data fetching architecture
- [Fetching Data — Next.js official docs](https://nextjs.org/docs/app/getting-started/fetching-data)
  Current (v16, 2026) canonical reference for request memoization, sequential vs. parallel fetching, `Promise.all`, and `React.cache`. Verified directly — use for all data-fetching code examples.

## Wisdom (Communities)
- [r/reactjs](https://reddit.com/r/reactjs) — high-signal, well-moderated; good for sanity-checking architecture calls against working engineers.
- [r/nextjs](https://reddit.com/r/nextjs) — Next.js-specific, useful once rendering-strategy lessons are underway.
- No community preference stated by the user yet — revisit when a question actually needs real-world wisdom rather than more explanation.

## Secondary track (process/collaboration)

### Code review
- [The Standard of Code Review — Google eng-practices](https://google.github.io/eng-practices/review/reviewer/standard.html)
  Canonical, widely-cited standard for what review is for and what to look for. Use for: review vocabulary (code health, nits, functionality vs. complexity).

### Testing strategy
- [The Testing Trophy and Testing Classifications — Kent C. Dodds](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
  Primary source — Dodds coined the Testing Trophy model. Use for: static/unit/integration/E2E vocabulary and the "resembles usage" confidence principle.

### Incident response
- [Postmortem Culture: Learning from Failure — Google SRE Book](https://sre.google/sre-book/postmortem-culture/)
  Primary source for blameless postmortem practice. Use for: incident-writeup vocabulary and structure.

### Technical documentation / design docs
- [Architectural Decision Records — adr.github.io](https://adr.github.io/)
  Canonical ADR reference (Nygard template plus variants). Use for: Context/Decision/Consequences structure for design-doc exercises.

## General software design principles (broadening pass)
- [A Philosophy of Software Design — John Ousterhout (summaries + primary text)](https://web.stanford.edu/~ouster/cgi-bin/aposd.php)
  Deep modules, information hiding, complexity as the enemy. Use for: generalizing coupling/cohesion beyond components (Lesson 6).
- [No Silver Bullet: Essence and Accident in Software Engineering — Fred Brooks (1986)](https://www.cs.unc.edu/techreports/86-020.pdf)
  Primary source (original tech report). Use for: essential vs. accidental complexity, generalizing performance/abstraction-cost tradeoffs (Lesson 9).
- CAP theorem — Eric Brewer (2000); explained at [BMC](https://www.bmc.com/blogs/cap-theorem/)
  Use for: the canonical "pick two" tradeoff-analysis shape, generalizing rendering-strategy tradeoffs (Lesson 8).
- "Premature optimization is the root of all evil" — Donald Knuth, *Structured Programming with Go To Statements* (1974)
  Often misquoted without the "97%/3%" context. Use for: when a performance tradeoff is worth reasoning about vs. premature.
