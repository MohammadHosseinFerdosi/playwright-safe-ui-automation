# Playwright Safe UI Automation

Portfolio sample that demonstrates production-minded Playwright patterns on a **public** demo app ([Sauce Demo](https://www.saucedemo.com)).

No company systems, credentials, or proprietary product logic are included.

## What this showcases

| Pattern | Why it matters |
| --- | --- |
| `global-setup` + `storageState` | Log in once, reuse an authenticated session across specs |
| `@destructive` + `ALLOW_DESTRUCTIVE` | Default runs stay safe; risky flows are opt-in |
| `try/finally` cleanup | Failed assertions still leave shared state clean |
| Serial workers (`workers: 1`) | Avoid flaky interference when tests share mutable UI state |
| Trace / screenshot / video on failure | Fast triage without re-running blindly |

## Setup

```bash
npm install
npx playwright install chromium
cp .env.example .env   # optional — defaults already work with Sauce Demo
```

## Run

```bash
npm run test:safe          # everyday suite (skips @destructive)
npm test                   # same gate behavior — destructive self-skips without env
npm run test:destructive   # opt-in checkout flow that mutates cart/checkout state
npm run report             # open last HTML report
```

## Layout

```
global-setup.ts          UI login → .auth/user.json
playwright.config.ts     serial worker, storageState, artifacts on failure
tests/fixtures.ts        requireDestructive() gate
tests/utils/cart.ts      reusable cart helpers + reset
tests/*.spec.ts          inventory, cart, destructive checkout
```

## Design notes

- Credentials come from the environment (or Sauce Demo public defaults). Nothing is hardcoded in specs.
- Destructive tests call `requireDestructive()` in `beforeEach`, so forgetting the env var cannot accidentally run them.
- Cleanup prefers **resetting app state** over hoping the next test starts clean.

## License

MIT
