import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function PreloaderText({ isExiting }) {
  const textString = "VITAL AGRO CHEMICAL INDUSTRIES";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.8,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 0.75,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      animate={isExiting ? {
        opacity: 0,
        y: -15,
        transition: { duration: 0.5, ease: 'easeIn' }
      } : {}}
      className="flex flex-col items-center select-none pointer-events-none mb-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center text-[10px] font-black tracking-[0.3em] uppercase text-white/50"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#76C945] animate-pulse mr-2 flex-shrink-0" />
        
        <div className="flex flex-wrap justify-center">
          {textString.split('').map((char, index) => {
            if (char === ' ') {
              return <span key={index}>&nbsp;</span>;
            }
            return (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
