import {
  AnalyzeWithGptProps,
  ParsedGptResponse,
} from "@/types/analyzeWithGpt.types.types";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY });

export default async function analyzeWithGpt({
  text,
  description,
}: AnalyzeWithGptProps): Promise<ParsedGptResponse | null> {
  // Access GPT API
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        //  Prompt
        content: `
Please analyze the similarity between the following two inputs and provide a similarity percentage in JSON format. Assume the role of a machine checking for potential patent infringement.

1. **Patent Claim**: ${text}
2. **Product Description**: ${description}

Focus on the following aspects:
- **Functional Similarity**: Analyze if the product implements any of the specific functionalities outlined in the patent claim, including but not limited to core features, processes, or technical mechanisms.
- **User Interaction**: Compare how users interact with the product versus the patent claim, including the steps or processes involved.
- **Data Handling**: Examine if the product processes, stores, or manipulates data in a manner similar to the patent, focusing on the type of data handled, the flow of data, or specific data structures mentioned in the claim.
- **General Purpose**: Consider the overall goal or purpose of both the patent and the product. Does the product serve a similar purpose, or does it solve a similar problem, even if the methods differ?
- **Technological Approach**: Compare the underlying technologies, architectures, or methodologies used by the product and the patent claim, identifying any common approaches or potential overlap.

Provide a similarity percentage reflecting the extent of overlap between the patent claim and the product description. 

Return your response in the following JSON format:
{
  "similarity": "100%",
  "message": "Explain the reason for the similarity percentage in no more than 50 words. Highlight any direct functional overlaps, specific user interactions, or data handling similarities or differences that impact the similarity rating.",
  "specific_feature": "the most likely infringing feature"
}`,
      },
    ],
    temperature: 0.2,
  });

  // Clean response
  const cleanedGptResponse = completion.choices[0].message
    .content!.replace(/^\s+|\s+$/g, "")
    .replace(/```json|```/g, "");

  // Parse into json format
  const parsedGptResponse = JSON.parse(cleanedGptResponse);
  const similarity = parsedGptResponse.similarity;

  // logging in console 👀
  console.log(parsedGptResponse);

  // Return when similarity >= 70%
  if (Number(similarity.split("%")[0]) >= 70) {
    return { parsedGptResponse };
  }
  return null;
}
