// Props type
export interface AnalyzeWithGptProps {
  text: string;
  description: string;
}

// Return type
export interface ParsedGptResponse {
  parsedGptResponse: {
    similarity: string;
    message: string;
    specific_feature: string;
  };
}
