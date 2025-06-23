import JSZip from "jszip";

export interface RepoAnalysis {
  projectName: string;
  techStack: string[];
  summary: string;
}

const detectTechStack = (files: string[]): string[] => {
  const techs: string[] = [];

  if (files.some(f => f.includes("package.json"))) techs.push("JavaScript", "Node.js");
  if (files.some(f => f.endsWith(".ts") || f.endsWith(".tsx"))) techs.push("TypeScript");
  if (files.some(f => f.includes("requirements.txt") || f.endsWith(".py"))) techs.push("Python");
  if (files.some(f => f.endsWith(".java"))) techs.push("Java");
  if (files.some(f => f.endsWith(".cs"))) techs.push("C#");
  if (files.some(f => f.includes("Dockerfile"))) techs.push("Docker");

  return Array.from(new Set(techs));
};

export const analyzeRepoZip = async (file: File): Promise<RepoAnalysis> => {
  const zip = await JSZip.loadAsync(file);
  const allFiles: string[] = [];

  // Traverse all files
  zip.forEach((relativePath, zipEntry) => {
    allFiles.push(relativePath);
  });

  const techStack = detectTechStack(allFiles);

  // Simple project name from file
  const projectName = file.name.replace(".zip", "");

  const summary = `This project uses ${techStack.join(", ")}. It contains ${allFiles.length} files.`;

  return {
    projectName,
    techStack,
    summary,
  };
};
