import { NextRequest, NextResponse } from "next/server";
import getPatentAndCompany from "@/utils/getPatentAndCompany";
import getPotentiallyInfringingClaims from "@/utils/getPotentiallyInfringingClaims ";
import getTopTwoProducts from "@/utils/getTopTwoProducts";
import formatReportAndSave from "@/utils/formatReportAndSave";

export async function POST(request: NextRequest) {
  const {
    patentId,
    companyName,
  }: {
    patentId: string;
    companyName: string;
  } = await request.json();

  // 1. Find patent & company
  const { patent, company } = getPatentAndCompany({ patentId, companyName });

  if (!patent || !company) {
    return NextResponse.json(
      { message: "Invalid patent or company" },
      { status: 400 }
    );
  }

  try {
    const claims = JSON.parse(patent.claims);

    // 2. Get potentially infringing claims (Analyze similarities with GPT)
    const potentiallyInfringingClaims = await getPotentiallyInfringingClaims({
      claims,
      products: company.products,
    });

    // 3. Get top two products (Generate explanation with GPT)
    const topTwoProducts = await getTopTwoProducts({
      potentiallyInfringingClaims,
    });

    // 4. Format report (Generate overall risk assessment with GPT)
    const formattedReport = await formatReportAndSave({
      patentId,
      companyName,
      topTwoProducts,
    });

    return NextResponse.json(
      { analysisReport: formattedReport },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
