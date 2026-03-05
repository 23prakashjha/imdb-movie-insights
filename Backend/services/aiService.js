import OpenAI from "openai";

export const analyzeReviews = async (reviews) => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not set");
  }

  const openai = new OpenAI({ apiKey });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Analyze the sentiment of these reviews: ${reviews.join(
          " "
        )}`
      }
    ],
    max_tokens: 100
  });

  return {
    sentimentSummary: response.choices[0].message.content
  };
};