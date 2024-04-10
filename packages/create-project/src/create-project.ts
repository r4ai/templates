import fs from "node:fs";
import { input, select } from "@inquirer/prompts";
import chalk from "chalk";
import { downloadTemplate } from "giget";
import { templates } from "./template" with { type: "macro" };

const log = console.log;

// Select a template
const templateName = await select({
  message: "Select a template",
  choices: templates(),
});

// Confirm the directory to download the template to
const templateDir =
  process.argv[2] ||
  (await input({
    message: "Enter the directory to download the template to",
    default: templateName,
    validate: (input) => {
      if (!input) {
        return "Directory cannot be empty";
      }
      if (fs.existsSync(input)) {
        return "Directory already exists";
      }
      return true;
    },
  }).catch(() => process.exit(1)));

// Download the template
const { dir } = await downloadTemplate(
  `github:r4ai/templates/templates/${templateName}`,
  {
    dir: templateDir,
  },
);
log(
  `\n Template ${chalk.greenBright("downloaded")} to ${chalk.underline(dir)}`,
);
