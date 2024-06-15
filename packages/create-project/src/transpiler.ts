import fs from "node:fs/promises";
import path from "node:path";

export type Variables = Record<string, string>;

const transpileText = async (text: string, variables: Variables) => {
  let output = text;
  for (const [key, value] of Object.entries(variables)) {
    output = output.replaceAll(`{{${key}}}`, value);
  }
  return output;
};

const transpileFile = async (filePath: string, variables: Variables) => {
  const content = await fs.readFile(filePath, "utf-8");
  const transpiledContent = await transpileText(content, variables);
  await fs.rm(filePath);
  await fs.writeFile(filePath, transpiledContent);
};

const rename = async (filePath: string, variables: Variables) => {
  let basename = path.basename(filePath);
  for (const [key, value] of Object.entries(variables)) {
    basename = basename.replaceAll(`{{${key}}}`, value);
  }
  const newFilePath = path.join(path.dirname(filePath), basename);
  if (filePath !== newFilePath) {
    await fs.rename(filePath, newFilePath);
  }
  return newFilePath;
};

const transpileDir = async (dir: string, variables: Variables) => {
  const transpiling: Promise<void>[] = [];
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const filstStats = await fs.stat(filePath);
    if (filstStats.isDirectory()) {
      const newFilePath = await rename(filePath, variables);
      transpiling.push(transpileDir(newFilePath, variables));
    } else {
      const newFilePath = await rename(filePath, variables);
      transpiling.push(transpileFile(newFilePath, variables));
    }
  }
  await Promise.all(transpiling);
};

const removeTemplateConfig = async (dir: string) => {
  const templateConfigPath = path.join(dir, "template.config.json");
  await fs.rm(templateConfigPath);
};

export const transpile = async (dir: string, variables: Variables) => {
  await removeTemplateConfig(dir);
  await transpileDir(dir, variables);
};
