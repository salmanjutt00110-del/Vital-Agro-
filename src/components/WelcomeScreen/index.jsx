'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Easing function
const easeOutExpo = (t) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

export const WelcomeScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0)
  // 0=dark, 1=text, 2=logo, 3=exit
  const canvasRef  = useRef(null)
  const orbRef     = useRef([])

  // CANVAS — Floating light orbs
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate glowing orbs of different sizes
    const count = window.innerWidth < 640 ? 50 : 120
    orbRef.current = Array.from({ length: count }, (_, i) => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     0.5 + Math.random() * 2.5,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    -0.12 - Math.random() * 0.35,
      alpha: 0.05 + Math.random() * 0.35,
      size:  i < (window.innerWidth < 640 ? 8 : 20) ? 3 + Math.random() * 4 : 0.8 + Math.random() * 1.8,
    }))

    let t = 0
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.005

      orbRef.current.forEach((p, i) => {
        // Soft glow for larger orbs
        if (p.size > 2) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
          g.addColorStop(0, `rgba(92,184,92,${p.alpha})`)
          g.addColorStop(1, 'rgba(92,184,92,0)')
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(92,184,92,${p.alpha * 0.8})`
        ctx.fill()

        p.y  += p.vy + Math.sin(t + i) * 0.1
        p.x  += p.vx + Math.cos(t + i * 0.7) * 0.08
        p.alpha += Math.sin(t * 2 + i) * 0.003

        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
      })

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  // Phase timeline — FASTER TIMING (total 2.3s instead of 3.5s)
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),   // Text reveal starts
      setTimeout(() => setPhase(2), 900),   // Logo burst opens
      setTimeout(() => setPhase(3), 1900),  // Exit begins
      setTimeout(onComplete, 2300),         // Finished
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[1000] overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: `
          radial-gradient(ellipse 80% 70% at 50% 55%,
            #0e2e0e 0%, #061406 50%, #020c02 100%)
        `,
      }}
      animate={phase === 3 ? { opacity: 0, scale: 1.05 } : { opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Scan lines overlay — cinematic CRT feel */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Center light bloom */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          style={{
            width: '60vw', height: '60vh',
            background: 'radial-gradient(ellipse, rgba(45,106,45,0.18) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, rgba(2,10,2,0.88) 100%)',
        }}
      />

      {/* HORIZONTAL SWEEP LINE */}
      <motion.div
        className="absolute inset-x-0 h-px z-[4] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(92,184,92,0.6), transparent)',
          boxShadow: '0 0 20px rgba(92,184,92,0.4)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
      />

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">

        {/* WELCOME TO */}
        <motion.p
          className="text-white/35 tracking-[0.6em] uppercase mb-3 md:mb-4"
          style={{ fontSize: 'clamp(0.55rem, 1.8vw, 0.85rem)' }}
          initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
          animate={phase >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
        >
          Welcome to
        </motion.p>

        {/* VITAL AGRO — SPLIT REVEAL */}
        <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 md:gap-x-6 overflow-hidden mb-3 max-w-full">
          <div className="flex items-baseline gap-1 md:gap-3">
            {'VITAL'.split('').map((char, i) => (
              <motion.span key={i}
                className="font-black text-white inline-block"
                style={{
                  fontSize: 'clamp(2.5rem, 10vw, 8.5rem)',
                  letterSpacing: '-0.025em',
                  textShadow: '0 0 80px rgba(255,255,255,0.12)',
                }}
                initial={{ y: '115%', opacity: 0 }}
                animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.02 + i * 0.03,
                  ease: [0.16,1,0.3,1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div className="flex items-baseline gap-1 md:gap-3">
            {'AGRO'.split('').map((char, i) => (
              <motion.span key={i}
                className="font-black inline-block relative"
                style={{
                  fontSize: 'clamp(2.5rem, 10vw, 8.5rem)',
                  letterSpacing: '-0.025em',
                  color: '#5cb85c',
                  textShadow: '0 0 50px rgba(92,184,92,0.7), 0 0 100px rgba(92,184,92,0.25)',
                }}
                initial={{ y: '115%', opacity: 0 }}
                animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.03,
                  ease: [0.16,1,0.3,1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Green underline bar */}
        <motion.div
          className="mb-4"
          style={{
            height: 2,
            borderRadius: 99,
            background: 'linear-gradient(90deg, transparent 0%, #5cb85c 50%, transparent 100%)',
            boxShadow: '0 0 12px rgba(92,184,92,0.6)',
          }}
          initial={{ width: 0 }}
          animate={phase >= 1 ? { width: 'min(380px, 75vw)' } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16,1,0.3,1] }}
        />

        {/* CHEMICAL INDUSTRIES */}
        <motion.p
          className="text-white/45 tracking-[0.3em] uppercase mb-8 md:mb-16"
          style={{ fontSize: 'clamp(0.6rem, 2vw, 1rem)' }}
          initial={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
          animate={phase >= 1 ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16,1,0.3,1] }}
        >
          Chemical Industries
        </motion.p>

        {/* LOGO — 3D flip + burst */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div className="relative flex items-center justify-center mb-6">
              {/* Burst rings */}
              {[0,1,2,3].map(i => (
                <motion.div key={i}
                  className="absolute rounded-full"
                  style={{
                    border: `1px solid rgba(92,184,92,${0.6 - i * 0.1})`,
                    boxShadow: `0 0 ${6 + i * 4}px rgba(92,184,92,0.3)`,
                  }}
                  initial={{ width: 60, height: 60, opacity: 1 }}
                  animate={{ width: 60 + i * 80, height: 60 + i * 80, opacity: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                />
              ))}

              {/* Orbiting particle */}
              <motion.div
                className="absolute w-2 h-2 rounded-full pointer-events-none"
                style={{
                  background: '#5cb85c',
                  boxShadow: '0 0 8px rgba(92,184,92,1)',
                  top: '-30px',
                  left: '50%',
                  transformOrigin: '50% 66px'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Logo card */}
              <motion.div
                className="relative z-10 p-4 md:p-6 rounded-[20px] md:rounded-[28px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))',
                  backdropFilter: 'blur(28px) saturate(180%)',
                  border: '1px solid rgba(92,184,92,0.4)',
                  boxShadow: [
                    '0 0 0 1px rgba(92,184,92,0.15)',
                    '0 0 80px rgba(92,184,92,0.2)',
                    '0 30px 70px rgba(0,0,0,0.55)',
                    'inset 0 1px 0 rgba(255,255,255,0.14)',
                  ].join(','),
                }}
                initial={{ scale: 0.2, opacity: 0, rotateY: -180, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0, rotateX: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <motion.img
                  src="/logo.png" alt="Vital Agro"
                  className="h-12 md:h-20 w-auto"
                  style={{ filter: 'drop-shadow(0 0 18px rgba(92,184,92,0.4))' }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tagline */}
        <motion.p
          className="text-white/25 text-[10px] md:text-xs tracking-[0.3em] px-2"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          🇵🇰 Premium Agricultural Solutions · Pakistan
        </motion.p>
      </div>
    </motion.div>
  )
}
