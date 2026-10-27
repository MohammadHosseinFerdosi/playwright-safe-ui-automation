import { test as base, expect } from '@playwright/test';

/**
 * Opt-in gate for tests that mutate shared state aggressively.
 * Mirrors a real-world pattern: default runs stay safe; destructive
 * scenarios require ALLOW_DESTRUCTIVE=1 (or npm run test:destructive).
 */
export function requireDestructive() {
  test.skip(
    process.env.ALLOW_DESTRUCTIVE !== '1',
    'Skipped: set ALLOW_DESTRUCTIVE=1 or run npm run test:destructive',
  );
}

export const test = base;
export { expect };
