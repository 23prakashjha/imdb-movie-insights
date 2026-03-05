import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      
      {/* Animated Gradient Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-20 h-20 rounded-full 
                   border-4 border-blue-500/30 
                   border-t-blue-500 
                   shadow-lg"
      />

      {/* Animated Text */}
      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-gray-400 text-lg tracking-wide"
      >
        Analyzing audience sentiment...
      </motion.p>
    </div>
  );
};

export default Loader;