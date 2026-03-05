import OpenAI from "openai";

export const analyzeReviews = async (reviews) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY missing in .env file");
    }

    const openai = new OpenAI({ apiKey });

    // 🚨 IMPORTANT: Limit input size (prevents token overflow)
    const limitedReviews = reviews
      .slice(0, 5)                // only first 5 reviews
      .join(" ")
      .slice(0, 2000);            // max 2000 chars

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content:
            "You are a professional movie critic. Summarize audience sentiment clearly and engagingly in 2-3 sentences.",
        },
        {
          role: "user",
          content: `Analyze these reviews:\n\n${limitedReviews}`,
        },
      ],
      max_tokens: 150,
    });

    return {
      sentimentSummary:
        response?.choices?.[0]?.message?.content ||
        "AI analysis unavailable.",
    };

  } catch (error) {
    console.error("🔥 OPENAI ERROR:", error);

    // Detect quota error
    if (error?.status === 429) {
      throw new Error("quota exceeded");
    }

    throw new Error("AI request failed");
  }
};