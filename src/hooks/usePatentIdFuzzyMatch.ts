import axios from "axios";

export const usePatentIdFuzzyMatch = () => {
  const patentIdFuzzyMatch = async ({ patentId }: { patentId: string }) => {
    try {
      const response = await axios.get(
        `/api/fuzzy-match/patent-id?patent_id=${patentId}`
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { patentIdFuzzyMatch };
};
