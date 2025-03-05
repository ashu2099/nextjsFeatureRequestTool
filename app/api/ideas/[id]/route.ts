import { NextResponse } from "next/server";
import { getIdeaById } from "../route";

export async function GET(
  request: Request,
  paramsPromise: { params: Promise<{ id: string }> }
) {
  try {
    const params = await paramsPromise.params;

    const ideaDetails = await getIdeaById(params?.id);

    if (!ideaDetails) {
      throw new Error("Idea Not Found");
    }

    return NextResponse.json(ideaDetails, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
