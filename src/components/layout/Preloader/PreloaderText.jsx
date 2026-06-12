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
        className="flex items-center justify-center font-black uppercase text-white/50 w-full max-w-[90vw]"
        style={{
          fontSize: 'clamp(9px, 2.5vw, 13px)',
          letterSpacing: '0.15em',
          whiteSpace: 'nowrap',
          maxWidth: '75vw',
          overflow: 'hidden',
          textOverflow: 'clip',
        }}
      >
        <Sparkles className="w-3 h-3 text-[#76C945] animate-pulse mr-1.5 flex-shrink-0" />
        
        <div className="flex whitespace-nowrap overflow-hidden text-ellipsis">
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
