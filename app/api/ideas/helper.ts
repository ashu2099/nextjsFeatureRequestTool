import fs from "fs/promises";

export const FILE_PATH = "./ideas.json";

export const getIdeas = async () => {
  const fileContents = await fs.readFile(FILE_PATH, "utf8");

  return JSON.parse(fileContents);
};

export const getIdeaById = async (idToGet: string) => {
  const ideasMap = await getIdeas();

  return ideasMap[idToGet] || null;
};
