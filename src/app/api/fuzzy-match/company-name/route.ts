import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { EachCompany } from "@/types/routes.types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const companyName = searchParams.get("company_name");

  try {
    const { companies } = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "public", "json", "company_products.json"),
        "utf-8"
      )
    );

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
