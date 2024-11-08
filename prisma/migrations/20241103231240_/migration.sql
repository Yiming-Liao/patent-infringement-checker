-- CreateTable
CREATE TABLE "AnalysisReport" (
    "analysis_id" SERIAL NOT NULL,
    "patent_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "analysis_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "top_infringing_products" JSONB NOT NULL,
    "overall_risk_assessment" TEXT NOT NULL,

    CONSTRAINT "AnalysisReport_pkey" PRIMARY KEY ("analysis_id")
);
