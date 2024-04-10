import fs from "node:fs/promises";
import { build } from "bun";
import { bannerPlugin } from "bun-banner-plugin";

await fs.rmdir("dist", { recursive: true });
const result = await build({
  entrypoints: ["src/create-project.ts"],
  target: "node",
  outdir: "dist",
  minify: true,
  plugins: [
    bannerPlugin({
      ts: "#!/usr/bin/env node",
    }),
  ],
});

const successMsg = `Build completed successfully!${
  result.logs.length > 0 ? `\n${result.logs}` : ""
}`;
const errorMsg = `Build failed!${
  result.logs.length > 0 ? `\n${result.logs}` : ""
}`;

if (result.success) {
  console.log(successMsg);
} else {
  console.error(errorMsg);
}
process.exit(result.success ? 0 : 1);
