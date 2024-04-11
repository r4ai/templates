import fs from "node:fs";
import path from "node:path";

const getDirectories = (pathToDir: string) =>
  fs
    .readdirSync(pathToDir)
    .filter((file) => fs.statSync(path.join(pathToDir, file)).isDirectory());

type TemplateConfig = {
  name: string;
  description?: string;
};

export const templates = (
  templatesDirPath = path.join(
    import.meta.dirname,
    "..",
    "..",
    "..",
    "templates",
  ),
) => {
  const templateDirs = getDirectories(templatesDirPath);
  return templateDirs.map((dir) => {
    const templateConfigPath = path.join(
      templatesDirPath,
      dir,
      "template.config.json",
    );
    const templateConfig: TemplateConfig = JSON.parse(
      fs.readFileSync(templateConfigPath, "utf-8"),
    );
    return {
      name: templateConfig.name,
      value: templateConfig.name,
      description: templateConfig.description,
    };
  });
};
