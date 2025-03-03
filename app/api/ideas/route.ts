import { NextResponse } from "next/server";

import fs from "fs/promises";
import { FeatureRequest } from "@/types/commons";

const FILE_PATH = "./ideas.json";

const getIdeas = async () => {
  const fileContents = await fs.readFile(FILE_PATH, "utf8");

  return JSON.parse(fileContents);
};

export async function GET() {
  try {
    const data = await getIdeas();

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

export async function DELETE(request: Request) {
  try {
    const idToDelete = request.url.slice(request?.url?.indexOf("=") + 1);

    let data = await getIdeas();

    data = data.filter(
      (idea: FeatureRequest) => idea.id !== parseInt(idToDelete)
    );

    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
