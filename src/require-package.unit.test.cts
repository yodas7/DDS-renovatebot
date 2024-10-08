// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Using `@ts-ignore` since whether the following `import` statement will cause an error or not depends on the TypeScript version.
// @ts-ignore "vitest" can only be imported using `import`.
import { it } from "vitest";

// Note that these tests require the package built beforehand - run `npm run build` before running the test.

it("the colors.js can be required", ({ expect }) => {
  expect(() => {
    require("@daikin-oss/design-system-web-components/colors.js");
  }).not.toThrow();

  expect(() => {
    require("@daikin-oss/design-system-web-components/colors");
  }).not.toThrow();
});

// This test fails because lit is ESM only - To use our package from CJS, we have to require individual files.
it.fails("the index.js can be required", ({ expect }) => {
  expect(() => {
    require("@daikin-oss/design-system-web-components");
  }).not.toThrow();
});
