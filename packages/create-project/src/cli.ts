import { select } from "@inquirer/prompts";

const templateName = await select({
  message: "Select a template",
  choices: [],
});
