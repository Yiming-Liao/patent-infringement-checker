import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get reports
    const analysisReports = await prisma.analysisReport.findMany({
      select: {
        analysis_id: true,
        patent_id: true,
        company_name: true,
        analysis_date: true,
        top_infringing_products: false,
        overall_risk_assessment: true,
      },
    });

    return NextResponse.json(
      { message: "Fetched all reports successfully.", analysisReports },
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
