import axios from "axios";

export const analyzeReviews = async (reviews) => {

  if (!process.env.OPENAI_API_KEY) {
    return {
      sentimentSummary: basicSentiment(reviews)
    };
  }

  try {
    const prompt = `
Summarize sentiment:
${reviews.join("\n")}
`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    return {
      sentimentSummary: response.data.choices[0].message.content
    };

  } catch (err) {
    console.log("OpenAI failed — using fallback.");
    return {
      sentimentSummary: basicSentiment(reviews)
    };
  }
};

// 🔥 FREE fallback sentiment logic
function basicSentiment(reviews) {
  const text = reviews.join(" ").toLowerCase();

  if (text.includes("best") || text.includes("amazing")) {
    return "Overall Sentiment: Positive. Audience response is highly favorable.";
  }

  if (text.includes("slow")) {
    return "Overall Sentiment: Mixed. Some viewers found pacing slow.";
  }

  return "Overall Sentiment: Mixed.";
}