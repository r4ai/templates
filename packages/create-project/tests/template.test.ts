import * as path from "node:path";
import { describe, expect, test } from "vitest";
import { templates } from "../src/template";

const templatesDirPath = path.join(
  import.meta.dirname ?? __dirname,
  "templates",
);

describe("templates", () => {
  test("Get templates", () => {
    const result = templates(templatesDirPath);
    expect(result).toEqual([
      {
        name: "npm-project",
        value: "npm-project",
      },
      {
        name: "vite-project",
        value: "vite-project",
      },
    ]);
  });
});
