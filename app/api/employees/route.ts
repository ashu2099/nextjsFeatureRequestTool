import { NextResponse } from "next/server";

import { getEmployees } from "./helper";

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
