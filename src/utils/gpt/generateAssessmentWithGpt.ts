import { GenerateAssessmentWithGptProps } from "@/types/generateAssessmentWithGpt.types";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY });

export default async function generateAssessmentWithGpt({
  topTwoProducts,
}: GenerateAssessmentWithGptProps): Promise<{ overallRiskAssessment: string }> {
  // Stringify
  const topTwoProductsString = JSON.stringify(topTwoProducts, null, 2);

  // Acess GPT API
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        //  Prompt
        content: `
        You are a legal analysis assistant. Based on the following product information, please generate an overall risk assessment regarding potential patent infringement, limited to 50 words:
        
        ${topTwoProductsString}
        
        The overall risk assessment should summarize the infringement likelihood of the products, emphasizing significant risks associated with the core patent claims and providing a clear and concise assessment.
      `,
      },
    ],
    temperature: 0.2,
  });

  const overallRiskAssessment = completion.choices[0].message.content;

  // logging in console 👀
  console.log(overallRiskAssessment);

  return { overallRiskAssessment: overallRiskAssessment || "" };
}
