// Props type
export interface GetPotentiallyInfringingClaimsProps {
  claims: { text: string; num: string }[];
  products: { name: string; description: string }[];
}

// Return type
export interface PotentiallyInfringingClaim {
  parsedGptResponse: {
    similarity: string;
    message: string;
    specific_feature: string;
  };
  num: string;
  productName: string;
}
