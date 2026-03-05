import React from "react";

const SentimentBadge = ({ sentiment }) => {
  let bgColor = "from-gray-600 to-gray-700";
  let label = "Mixed";
  let emoji = "😐";

  const text = sentiment?.toLowerCase() || "";

  if (text.includes("positive")) {
    bgColor = "from-green-500 to-emerald-600";
    label = "Positive";
    emoji = "🔥";
  } else if (text.includes("negative")) {
    bgColor = "from-red-500 to-pink-600";
    label = "Negative";
    emoji = "💔";
  }

  return (
    <span
      className={`bg-linear-to-r ${bgColor} 
                  px-5 py-2 
                  rounded-full 
                  text-sm font-semibold 
                  text-white 
                  shadow-lg 
                  transition-transform 
                  hover:scale-105`}
    >
      {emoji} {label}
    </span>
  );
};

export default SentimentBadge;