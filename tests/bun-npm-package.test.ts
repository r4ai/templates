import { describe, expect, test } from "vitest";
import { helloWorld } from "../templates/bun-npm-package/dist/esm";

describe("bun-npm-package", () => {
  test("should pass esm", () => {
    expect(helloWorld()).toBe("Hello, world!");
  });
});
