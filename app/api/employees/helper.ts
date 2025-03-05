import fs from "fs/promises";

const FILE_PATH = "./employees.json";

export const getEmployees = async () => {
  const fileContents = await fs.readFile(FILE_PATH, "utf8");

  return JSON.parse(fileContents);
};

export async function getEmployeeById(employeeId: string) {
  try {
    const fileContents = await getEmployees();

    return fileContents[employeeId];
  } catch (error) {
    return error;
  }
}
