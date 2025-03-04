import { NextResponse } from "next/server";

import fs from "fs/promises";

const FILE_PATH = "./employees.json";

const getEmployees = async () => {
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

export async function GET() {
  try {
    const employeeMap = await getEmployees();

    const data = Object.values(employeeMap);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
