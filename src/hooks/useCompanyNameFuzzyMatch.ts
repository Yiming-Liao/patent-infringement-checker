import axios from "axios";

export const useCompanyNameFuzzyMatch = () => {
  const companyNameFuzzyMatch = async ({
    companyName,
  }: {
    companyName: string;
  }) => {
    try {
      const response = await axios.get(
        `/api/fuzzy-match/company-name?company_name=${companyName}`
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { companyNameFuzzyMatch };
};
