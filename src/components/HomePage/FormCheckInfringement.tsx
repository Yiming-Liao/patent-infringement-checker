"use client";

import useAnalysisReportStore from "@/hooks/analysisReport/useAnalysisReportStore";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import Processing from "./Processing";
import PatentFuzzyMatch from "./PatentIdFuzzyMatch";
import CompanyNameFuzzyMatch from "./CompanyNameFuzzyMatch";

const FormCheckInfringement = () => {
  const { push } = useRouter();
  const { analysisReportStore, isLoading } = useAnalysisReportStore();

  const [patentId, setPatentId] = useState<string>("US-RE49889-E1");
  const [companyName, setCompanyName] = useState<string>("Walmart Inc.");

  // Create new report
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const response = await analysisReportStore({
      patentId,
      companyName,
    });

    if (response) {
      const analysisId = response.analysisReport.analysis_id;
      push(`/report?analysisId=${analysisId}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-[439px] px-24 rounded-2xl shadow-[0_3px_16px_8px_rgb(0,0,0,0.2)]"
      >
        <div className="size-full flex flex-col gap-8 pt-20 pb-24">
          {/* Input: Patent ID */}
          <div className="flex flex-col gap-2">
            <label htmlFor="patentId" className="pl-1 text-gray-300/80">
              Patent ID
            </label>
            <div className="relative group">
              <input
                id="patentId"
                type="text"
                placeholder="patentId"
                value={patentId}
                onChange={(e) => setPatentId(e.target.value)}
                className="px-4 py-3 rounded-md bg-[#474C50]"
              />

              {/* Patent ID fuzzy match options */}
              <div
                className={`absolute top-12 p-2 border bg-[#474C50] hidden group-focus-within:block group-focus-within:z-50`}
              >
                <PatentFuzzyMatch
                  patentId={patentId}
                  setPatentId={setPatentId}
                />
              </div>
            </div>
          </div>

          {/* Input: Company Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="companyName" className="pl-1 text-gray-300/80">
              Company Name
            </label>
            <div className="relative group">
              <input
                id="companyName"
                type="text"
                placeholder="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="px-4 py-3 rounded-md bg-[#474C50]"
              />

              {/* Patent ID fuzzy match options */}
              <div
                className={`absolute top-12 p-2 border bg-[#474C50] hidden group-focus-within:block group-focus-within:z-5`}
              >
                <CompanyNameFuzzyMatch
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                />
              </div>
            </div>
          </div>

          {/* Button: Submit */}
          <button
            disabled={isLoading ? true : false}
            className="px-4 py-3 bg-gradient-to-tr from-sky-500 to-sky-600 rounded-3xl flex justify-center mt-8"
          >
            {isLoading ? (
              <span className="block size-6 border-2 border-r-0 border-white animate-spin rounded-full"></span>
            ) : (
              <span>Check</span>
            )}
          </button>
        </div>
      </form>

      {isLoading ? <Processing isLoading={isLoading} /> : null}
    </>
  );
};
export default FormCheckInfringement;
