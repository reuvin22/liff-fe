import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";

function HomeLoading() {
    const styleContainer = {
      position: "relative",
      width: 50,
      height: 50
    };
    
    const styleSpan = {
      display: "block",
      width: 50,
      height: 50,
      border: "9px solid #eee",
      borderTop: "9px solid #28a745",
      borderRadius: "50%",
      boxSizing: "border-box",
      position: "absolute",
      top: 0,
      left: 0
    };
    
    const spinTransition = {
      repeat: Infinity,
      ease: "easeInOut",
      duration: 1
    };

    
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-100">
        <div style={styleContainer}>
          <motion.span
            style={styleSpan}
            animate={{ rotate: 360 }}
            transition={spinTransition}
          />
        </div>
      </div>
    );
}

export default HomeLoading