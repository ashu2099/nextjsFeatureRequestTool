import { NextResponse } from "next/server";

import fs from "fs/promises";
import { FeatureRequest } from "@/types/commons";

import { getEmployeeById } from "../employees/route";

const FILE_PATH = "./ideas.json";

const getIdeas = async () => {
  const fileContents = await fs.readFile(FILE_PATH, "utf8");

  return JSON.parse(fileContents);
};

export async function GET(request: Request) {
  try {
    const ideas = await getIdeas();

    ideas.sort((a: FeatureRequest, b: FeatureRequest) => b.upvotes - a.upvotes);

    const url = new URL(request.url);

    const params = new URLSearchParams(url.search);

    const page = parseInt(params.get("page")!);
    const limit = parseInt(params.get("limit")!);
    const total = ideas.length;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (startIndex >= total || isNaN(page) || isNaN(page)) {
      return NextResponse.json({
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const paginatedIdeas = ideas.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        paginatedIdeas,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
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

export async function POST(request: Request) {
  try {
    const input = await request.json();

    const ideas = await getIdeas();

    const requestingEmployee = await getEmployeeById(input.requestingEmployee);

    const newIdea: FeatureRequest = {
      id: ideas.length + 1,
      author: requestingEmployee,
      description: input.featureDescription,
      title: input.featureSummary,
      priority: input.requestPriority,
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    ideas.push(newIdea);

    await fs.writeFile(FILE_PATH, JSON.stringify(ideas, null, 2));

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
