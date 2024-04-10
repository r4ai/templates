import fs from "node:fs";
import path from "node:path";

const getDirectories = (pathToDir: string) =>
  fs
    .readdirSync(pathToDir)
    .filter((file) => fs.statSync(path.join(pathToDir, file)).isDirectory());

type Package = {
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
    const packageJsonPath = path.join(templatesDirPath, dir, "package.json");
    const packageJson: Package = JSON.parse(
      fs.readFileSync(packageJsonPath, "utf-8"),
    );
    return {
      name: packageJson.name,
      value: packageJson.name,
      description: packageJson.description,
    };
  });
};
