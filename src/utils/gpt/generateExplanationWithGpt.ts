import { GenerateExplanationWithGptProps } from "@/types/generateExplanationWithGpt.types";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY });

export default async function generateExplanationWithGpt({
  productName,
  specificFeatures,
  claims,
}: GenerateExplanationWithGptProps): Promise<{ explanation: string }> {
  // Acess GPT API
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        //  Prompt
        content: `
  The product "${productName}" implements certain key features that may align with elements from the patent claims, specifically in the following areas:
  - ${specificFeatures.join("\n  - ")}

  Here are relevant points from the patent claims related to this product:
  ${claims.map((claim) => `- ${claim.parsedGptResponse.message}`).join("\n")}

  Based on these features and claims, generate a concise explanation that summarizes potential infringement by highlighting the most relevant overlapping functionalities. Use the following format as a guide:

  "The ${productName} implements key elements from the patent claims, including [specific overlapping features], [additional relevant functions], and [any distinctive integrations or modules]. The product’s [specific functionalities] show a similarity in purpose and method to the patented technology."

  Ensure the explanation is brief and focused, around 2-3 sentences in length.
`,
      },
    ],
    temperature: 0.2,
  });

  const explanation = completion.choices[0].message.content;

  // logging in console 👀
  console.log(explanation);

  return { explanation: explanation || "" };
}
