# Playwright Safe UI Automation

Playwright UI automation patterns against the public [Sauce Demo](https://www.saucedemo.com) app: session reuse via `storageState`, opt-in destructive flows, and cleanup that runs even when assertions fail.

## Setup

```bash
npm install
npx playwright install chromium
cp .env.example .env   # optional — defaults work with Sauce Demo
```

## Run

```bash
npm run test:safe          # everyday suite (skips @destructive)
npm test                   # destructive specs self-skip without ALLOW_DESTRUCTIVE
npm run test:destructive   # opt-in checkout flow that mutates cart/checkout state
npm run report             # open last HTML report
```

## Layout

```
global-setup.ts          UI login → .auth/user.json
playwright.config.ts     serial worker, storageState, artifacts on failure
tests/fixtures.ts        requireDestructive() gate
tests/utils/cart.ts      cart helpers + reset
tests/*.spec.ts          inventory, cart, destructive checkout
```

## Notes

- Credentials come from the environment (or Sauce Demo public defaults).
- Destructive tests call `requireDestructive()` in `beforeEach`.
- Cleanup resets app state instead of relying on the next test to start clean.
- Workers are serial (`workers: 1`) when tests share mutable UI state.
- Trace / screenshot / video are retained on failure.

## License

MIT
