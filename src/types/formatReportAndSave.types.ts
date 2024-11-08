import { JsonValue } from "@prisma/client/runtime/library";
import { TopTwoProducts } from "./getTopTwoProducts.types";

// Props type
export interface FormatReportProps {
  patentId: string;
  companyName: string;
  topTwoProducts: TopTwoProducts[];
}

// Return type
export interface FormattedReport {
  analysis_id: number;
  patent_id: string;
  company_name: string;
  analysis_date: Date;
  top_infringing_products: JsonValue;
  overall_risk_assessment: string;
}
