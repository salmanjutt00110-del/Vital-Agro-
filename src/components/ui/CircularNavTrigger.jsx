'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CircularNav } from './CircularNav'

export const CircularNavTrigger = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 left-1/2 z-[80]
          flex items-center justify-center
          rounded-full md:hidden"
        style={{
          transform: 'translateX(-50%)',
          width: 56, height: 56,
          background: 'rgba(6,20,6,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(92,184,92,0.4)',
          boxShadow: [
            '0 0 20px rgba(92,184,92,0.3)',
            '0 0 60px rgba(92,184,92,0.1)',
            'inset 0 1px 0 rgba(255,255,255,0.1)',
            '0 8px 32px rgba(0,0,0,0.6)',
          ].join(','),
        }}
        whileTap={{ scale: 0.92 }}
        animate={open ? {
          boxShadow: [
            '0 0 30px rgba(92,184,92,0.6)',
            '0 0 80px rgba(92,184,92,0.2)',
          ].join(','),
        } : {}}
      >
        {/* Three dots icon → X icon */}
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="#5cb85c" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <div className="flex flex-col gap-[5px] items-center">
              {[0,1,2].map(i => (
                <motion.div key={i}
                  style={{
                    width: i === 1 ? 14 : 20,
                    height: 2,
                    borderRadius: 99,
                    background: '#5cb85c',
                    boxShadow: '0 0 6px rgba(92,184,92,0.6)',
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.button>

      <CircularNav isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
