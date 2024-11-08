import { PotentiallyInfringingClaim } from "@/types/potentiallyInfringingClaim.types";
import generateExplanationWithGpt from "./gpt/generateExplanationWithGpt";
import {
  GetTopTwoProductsProps,
  TopTwoProducts,
} from "@/types/getTopTwoProducts.types";

export default async function getTopTwoProducts({
  potentiallyInfringingClaims,
}: GetTopTwoProductsProps): Promise<TopTwoProducts[]> {
  const productCount: Record<string, number> = {};
  const productClaims: Record<string, PotentiallyInfringingClaim[]> = {};

  // Count occurrences
  potentiallyInfringingClaims.forEach((claim) => {
    const productName = claim.productName;

    if (!productClaims[productName]) {
      productClaims[productName] = [];
    }

    productClaims[productName].push(claim);
    productCount[productName] = (productCount[productName] || 0) + 1;
  });

  // Get the top two products
  const topTwoProductEntries = Object.entries(productCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  // Format top two products[]
  const topTwoProducts = await Promise.all(
    topTwoProductEntries.map(async ([productName]) => {
      const claims = productClaims[productName];

      // High: length>=5, Moderate: length>=3, Low: length<3
      const infringementLikelihood = (
        claims.length >= 5 ? "High" : claims.length >= 3 ? "Moderate" : "Low"
      ) as "High" | "Moderate" | "Low";

      // '00017' => '17'
      const relevantClaims = claims.map((claim) =>
        claim.num
          .split("")
          .filter((char) => char != "0")
          .join("")
      );

      // Make sure no duplicates for specificFeatures
      const specificFeatures = Array.from(
        new Set(
          claims.flatMap((claim) => claim.parsedGptResponse.specific_feature)
        )
      );

      // Generate explanation with GPT
      const { explanation } = await generateExplanationWithGpt({
        productName,
        specificFeatures,
        claims,
      });

      return {
        product_name: productName,
        infringement_likelihood: infringementLikelihood,
        relevant_claims: relevantClaims,
        explanation,
        specific_features: specificFeatures,
      };
    })
  );

  return topTwoProducts;
}
