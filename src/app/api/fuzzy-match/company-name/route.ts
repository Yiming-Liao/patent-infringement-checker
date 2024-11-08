import { NextRequest, NextResponse } from "next/server";
import { EachCompany } from "@/types/routes.types";
import { company_products } from "@/data/company_products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const companyName = searchParams.get("company_name");

  try {
    const { companies } = company_products;

    // Get matching company names
    const companyNames = companies
      .filter((eachCompany: EachCompany) =>
        new RegExp(companyName || "", "i").test(eachCompany.name)
      )
      .map((eachCompany: EachCompany) => eachCompany.name);

    return NextResponse.json({ companyNames }, { status: 200 });

    // Error handling
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
