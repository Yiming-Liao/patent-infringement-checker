import { NextRequest, NextResponse } from "next/server";
import { EachPatent } from "@/types/routes.types";
import { patents } from "@/data/patents";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const patentId = searchParams.get("patent_id");

  try {
    // Get matching patent IDs
    const patentIds = patents
      .filter((eachPatent: EachPatent) =>
        new RegExp(patentId || "", "i").test(eachPatent.publication_number)
      )
      .map((eachPatent: EachPatent) => eachPatent.publication_number);

    return NextResponse.json({ patentIds }, { status: 200 });

    // Error handling
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
