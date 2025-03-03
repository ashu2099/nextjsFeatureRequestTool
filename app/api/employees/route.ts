import { NextResponse } from "next/server";

import fs from "fs/promises";

export async function GET(request: Request) {
  try {
    const fileContents = await fs.readFile("./employees.json", "utf8");

    const data = JSON.parse(fileContents);

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
