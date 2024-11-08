"use client";

import TopInfringingProducts from "@/components/ReportPage/TopInfringingProducts";
import useAnalysisReportShow from "@/hooks/analysisReport/useAnalysisReportShow";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ReportPage = () => {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysisId");

  const { analysisReportShow } = useAnalysisReportShow();
  const [report, setReport] = useState<AnalysisReport | null>(null);

  // Fetch report
  useEffect(() => {
    const fetchReport = async () => {
      if (!analysisId) {
        return;
      }

      const { analysisReport } = await analysisReportShow({ analysisId });
      setReport(analysisReport);

      console.log(analysisReport);
    };
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysisId]);

  return (
    <main className="flex flex-col justify-center items-center pt-40 px-8">
      <div className="container xl:h-[640px] rounded-3xl bg-[#2E3438] shadow-xl p-8 flex flex-col gap-8">
        {/* Content */}
        <div className="w-full flex justify-center gap-4 max-xl:flex-col">
          {/* Info */}
          <div className="w-[500px] h-[360px] px-24 rounded-2xl shadow-[0_3px_16px_8px_rgb(0,0,0,0.2)]">
            <div className="size-full flex flex-col gap-8 py-16">
              {report ? (
                <>
                  {/* Patent ID */}
                  <p className="flex flex-col gap-2 text-2xl">
                    <span className="w-max text-gray-300/80 text-sm">
                      Patent ID:
                    </span>
                    {report.patent_id}
                  </p>
                  {/* Company name */}
                  <p className="flex flex-col gap-2 text-2xl">
                    <span className="w-max text-gray-300/80 text-sm">
                      Company name:
                    </span>
                    {report.company_name}
                  </p>
                </>
              ) : (
                <div className="size-full flex justify-center items-center">
                  <div className="size-12 border-4 border-gray-300/60 animate-spin shadow-2xl"></div>
                </div>
              )}
            </div>
          </div>

          {/* Top two products */}
          {report ? (
            <div className="w-[700px] flex flex-col gap-4 px-4 rounded-2xl max-h-[360px]">
              <h2 className="rounded-xl bg-gray-500/20 py-2 mx-2 px-8 text-gray-300/80">
                Top infringing products :
              </h2>
              <div className="flex flex-col gap-4 px-0 rounded-2xl max-h-[360px] overflow-y-auto">
                <TopInfringingProducts report={report} />
              </div>
            </div>
          ) : (
            <div className="w-[700px] px-4 max-h-[400px] flex justify-center items-center">
              <div className="size-12 border-4 border-gray-300/60 animate-spin shadow-2xl"></div>
            </div>
          )}
        </div>

        {/* Overall risk assessment */}
        <div className="w-[1210px] mx-auto min-h-[184px]  px-24 rounded-2xl shadow-[0_3px_16px_8px_rgb(0,0,0,0.2)]">
          <div className="size-full flex flex-col gap-8 p-8">
            {report ? (
              <p className="flex flex-col gap-4">
                <span className="w-max text-gray-300/80">
                  Overall risk assessment:
                </span>
                {report.overall_risk_assessment}
              </p>
            ) : (
              <div className="size-full flex justify-center items-center">
                <div className="size-12 border-4 border-gray-300/60 animate-spin shadow-2xl"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const ReportPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportPage />
    </Suspense>
  );
};

export default ReportPageWrapper;

// Report type
interface AnalysisReport {
  analysis_id: string;
  patent_id: string;
  company_name: string;
  overall_risk_assessment: string;
  analysis_date: string;
  top_infringing_products: string;
}
