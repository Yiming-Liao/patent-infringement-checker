"use client";

import { useEffect, useState } from "react";
import useAnalysisReportIndex from "@/hooks/analysisReport/useAnalysisReportIndex";
import useAnalysisReportDestroy from "@/hooks/analysisReport/useAnalysisReportDestroy";
import Link from "next/link";

const HistoryReports = () => {
  const { analysisReportIndex, isLoading } = useAnalysisReportIndex();
  const { analysisReportDestroy } = useAnalysisReportDestroy();

  const [analysisReports, setAnalysisReports] = useState<AnalysisReport[]>([]);

  // Fetch reports
  useEffect(() => {
    const fetchAnalysisReports = async () => {
      const { analysisReports: fetchedReports } = await analysisReportIndex();
      setAnalysisReports(fetchedReports);
    };
    fetchAnalysisReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDestroy = async (analysis_id: number) => {
    const yes = confirm("Are you sure? 🫡");
    if (!yes) {
      return;
    }
    const { analysisReports: fetchedReports } = await analysisReportDestroy({
      analysis_id,
    });

    setAnalysisReports(fetchedReports);
  };

  return (
    <div className="w-[700px] flex flex-col gap-4 px-4 rounded-2xl">
      <h2 className="rounded-full bg-gray-500/20 py-2 text-center">History</h2>
      <div className="flex flex-col gap-4 px-4 py-2 max-h-[420px] overflow-y-auto">
        {analysisReports.length > 0 ? (
          analysisReports.map((analysisReport) => (
            <Link
              href={`/report?analysisId=${analysisReport.analysis_id}`}
              key={analysisReport.analysis_id}
              className="relative bg-gray-600/20 p-4 rounded-xl flex flex-col gap-4 shadow-md"
            >
              <p className="flex items-center gap-2">
                <span className="w-max text-gray-300/80 text-sm">
                  Patent ID:
                </span>{" "}
                {analysisReport.patent_id}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-max text-gray-300/80 text-sm">
                  Company Name:
                </span>
                {analysisReport.company_name}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-max text-gray-300/80 text-sm">
                  Overall Risk Assessment:
                </span>
                <span className="w-96 overflow-hidden text-nowrap text-ellipsis">
                  {analysisReport.overall_risk_assessment}
                </span>
              </p>

              <p className="absolute top-4 right-16 flex items-center gap-2 text-gray-300/80 text-sm">
                {new Date(analysisReport.analysis_date).toLocaleString()}
              </p>

              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleDestroy(Number(analysisReport.analysis_id));
                }}
              >
                ❌
              </div>
            </Link>
          ))
        ) : isLoading ? (
          <div className="h-[400px] flex justify-center items-center">
            <div className="size-12 border-4 border-gray-300/60 animate-spin shadow-2xl"></div>
          </div>
        ) : (
          <div className="w-full flex justify-center text-gray-500">
            No previous reports.
          </div>
        )}
      </div>
    </div>
  );
};
export default HistoryReports;

// Report type
interface AnalysisReport {
  analysis_id: string;
  patent_id: string;
  company_name: string;
  overall_risk_assessment: string;
  analysis_date: string;
}
