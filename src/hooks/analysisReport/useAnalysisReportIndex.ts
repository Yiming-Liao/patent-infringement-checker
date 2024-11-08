import axios, { isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAnalysisReportIndex() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const analysisReportIndex = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("/api/analysis-reports/index");

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

  return { analysisReportIndex, isLoading };
}