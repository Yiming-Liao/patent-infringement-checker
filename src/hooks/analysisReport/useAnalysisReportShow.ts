import axios, { isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAnalysisReportShow() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const analysisReportShow = async ({ analysisId }: { analysisId: string }) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `/api/analysis-reports/show?analysisId=${analysisId}`
      );

      if (response) {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 3000,
        });

        return response.data;
      }

      // Error handling
    } catch (error: unknown) {
      console.log(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          position: "bottom-right",
        });
      } else {
        toast.error("Unkown error.", {
          position: "bottom-right",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { analysisReportShow, isLoading };
}
