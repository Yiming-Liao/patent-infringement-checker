import axios, { isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAnalysisReportStore() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const analysisReportStore = async ({
    patentId,
    companyName,
  }: {
    patentId: string;
    companyName: string;
  }) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/analysis-reports/store", {
        patentId,
        companyName,
      });

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

  return { analysisReportStore, isLoading };
}
