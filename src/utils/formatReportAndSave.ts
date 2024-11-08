import prisma from "@/lib/prisma";
import generateAssessmentWithGpt from "./gpt/generateAssessmentWithGpt";
import {
  FormatReportProps,
  FormattedReport,
} from "@/types/formatReportAndSave.types";

export default async function formatReport({
  patentId,
  companyName,
  topTwoProducts,
}: FormatReportProps): Promise<FormattedReport> {
  // Generate overall risk assessment with GPT
  const { overallRiskAssessment } = await generateAssessmentWithGpt({
    topTwoProducts,
  });

  // Format report
  const formattedReport = {
    patent_id: patentId,
    company_name: companyName,
    top_infringing_products: JSON.stringify(topTwoProducts),
    overall_risk_assessment:
      topTwoProducts.length > 0 ? overallRiskAssessment : "No risk identified.",
  };

  // Save the report to the database
  const savedReport = await prisma.analysisReport.create({
    data: formattedReport,
  });

  return savedReport;
}
