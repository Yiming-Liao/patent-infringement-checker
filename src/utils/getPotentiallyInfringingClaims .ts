import {
  GetPotentiallyInfringingClaimsProps,
  PotentiallyInfringingClaim,
} from "@/types/potentiallyInfringingClaim.types";
import analyzeWithGpt from "@/utils/gpt/analyzeWithGpt";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function getPotentiallyInfringingClaims({
  claims,
  products,
}: GetPotentiallyInfringingClaimsProps): Promise<PotentiallyInfringingClaim[]> {
  // An array to store all potentially infringing claims
  const potentiallyInfringingClaims = [];

  // Iterate through each product
  for (const product of products) {
    const parsedGptResponses = await Promise.all(
      // Iterate through each claim
      claims.map(async (claim) => {
        // Analyze with GPT
        const response = await analyzeWithGpt({
          text: claim.text,
          description: product.description!,
        });

        // Only include responses with similarity >= 75%
        if (response) {
          return {
            parsedGptResponse: response.parsedGptResponse,
            num: claim.num,
            productName: product.name,
          };
        }
        return null;
      })
    );

    potentiallyInfringingClaims.push(
      ...parsedGptResponses.filter((res) => res !== null)
    );

    await sleep(120); // Sleep to avoid excessive API requests
  }

  return potentiallyInfringingClaims;
}
