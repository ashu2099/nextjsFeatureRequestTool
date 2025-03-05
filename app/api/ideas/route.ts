import { NextRequest, NextResponse } from "next/server";

import fs from "fs/promises";
import { Idea } from "@/types/commons";

import { FILE_PATH, getIdeas } from "./helper";

import { getEmployeeById } from "../employees/helper";

export async function GET(request: Request) {
  try {
    const ideasMap = await getIdeas();

    const ideas: Idea[] = Object.values(ideasMap);

    ideas.sort((a: Idea, b: Idea) => b.upvotes - a.upvotes);

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

    const ideasMap = await getIdeas();

    const requestingEmployee = await getEmployeeById(input.requestingEmployee);

    const ideaDate = new Date();

    const ideaId = String(ideaDate.getTime());

    const newIdea: Idea = {
      id: ideaId,
      author: requestingEmployee,
      description: input.featureDescription,
      title: input.featureSummary,
      priority: input.requestPriority,
      upvotes: 0,
      downvotes: 0,
      createdAt: ideaDate.toISOString(),
      updatedAt: ideaDate.toISOString(),
    };

    ideasMap[ideaId] = newIdea;

    await fs.writeFile(FILE_PATH, JSON.stringify(ideasMap, null, 2));

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

export async function DELETE(request: NextRequest) {
  try {
    const deletionId = request.nextUrl.searchParams.get("deletionId");

    if (!deletionId) {
      throw new Error("No Id Found");
    }

    const data = await getIdeas();

    if (!data[deletionId]) {
      throw new Error("Record dosen't Exist");
    }

    delete data[deletionId];

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
