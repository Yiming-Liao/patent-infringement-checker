import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
  const { analysis_id }: { analysis_id: number } = await request.json();

  try {
    // Delete report
    await prisma.analysisReport.delete({ where: { analysis_id } });

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
      orderBy: { analysis_date: "desc" },
    });

    return NextResponse.json(
      { message: "Deleted successfully.", analysisReports },
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
