import React from "react";
import { motion } from "framer-motion";

const ErrorMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-linear-to-r from-red-500/20 to-pink-500/20 
                      border border-red-500/40 
                      backdrop-blur-xl 
                      text-red-400 
                      p-5 
                      rounded-2xl 
                      text-center 
                      shadow-2xl">
        <p className="font-semibold tracking-wide">
          ⚠ {message}
        </p>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;