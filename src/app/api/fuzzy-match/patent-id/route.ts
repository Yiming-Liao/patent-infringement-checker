import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { EachPatent } from "@/types/routes.types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const patentId = searchParams.get("patent_id");

  try {
    const patents = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "public", "json", "Patents.json"),
        "utf-8"
      )
    );

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
