import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const analysisId = searchParams.get("analysisId");

  // Error handling
  if (!analysisId || isNaN(Number(analysisId))) {
    return NextResponse.json(
      { error: "Invalid or missing analysisId." },
      { status: 400 }
    );
  }

  try {
    // Get the report by analysis_id
    const analysisReport = await prisma.analysisReport.findUnique({
      where: { analysis_id: Number(analysisId) },
      select: {
        analysis_id: true,
        patent_id: true,
        company_name: true,
        analysis_date: true,
        top_infringing_products: true,
        overall_risk_assessment: true,
      },
    });

    // Error handling
    if (!analysisReport) {
      return NextResponse.json(
        { error: "Analysis report not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Fetched report successfully.", analysisReport },
      { status: 200 }
    );

    // Error handling
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
