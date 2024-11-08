import { PotentiallyInfringingClaim } from "./potentiallyInfringingClaim.types";

// Props
export interface GetTopTwoProductsProps {
  potentiallyInfringingClaims: PotentiallyInfringingClaim[];
}

// return
export interface TopTwoProducts {
  product_name: string;
  infringement_likelihood: "High" | "Moderate" | "Low";
  relevant_claims: string[];
  explanation: string;
  specific_features: string[];
}
