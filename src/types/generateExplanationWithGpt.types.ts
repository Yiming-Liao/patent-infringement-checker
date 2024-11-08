// props
export interface GenerateExplanationWithGptProps {
  productName: string;
  specificFeatures: string[];
  claims: {
    parsedGptResponse: {
      similarity: string;
      message: string;
      specific_feature: string;
    };
    num: string;
    productName: string;
  }[];
}
