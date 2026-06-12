'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/lib/CartContext'

// Navigation items with angles (360° / 6 items = 60° each)
const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     icon: '🏠', path: '/',           angle: 90  },
  { id: 'products', label: 'Products', icon: '🧪', path: '/products',   angle: 30  },
  { id: 'about',    label: 'About',    icon: 'ℹ️',  path: '/about',      angle: 330 },
  { id: 'scanner',  label: 'AI Scan',  icon: '🤖', path: '/ai-scanner', angle: 270 },
  { id: 'contact',  label: 'Contact',  icon: '📍', path: '/contact',    angle: 210 },
  { id: 'cart',     label: 'Cart',     icon: '🛒', path: '/cart',       angle: 150 },
]

const RADIUS = 72  // Distance of icons from center

export const CircularNav = ({ isOpen, onClose }) => {
  const [selectedId, setSelected] = useState('home')
  const [knobAngle, setKnobAngle] = useState(90) // starts pointing up = Home
  const navigate  = useNavigate()
  const { setIsCartOpen } = useCart()
  const centerRef = useRef(null)
  const dragging  = useRef(false)

  // Get angle from center to pointer
  const getAngle = useCallback((clientX, clientY) => {
    if (!centerRef.current) return 0
    const rect = centerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = clientX - cx
    const dy = clientY - cy
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
    if (angle < 0) angle += 360
    return angle
  }, [])

  // Snap to nearest nav item
  const snapToNearest = useCallback((angle) => {
    let best = NAV_ITEMS[0]
    let minDiff = Infinity
    NAV_ITEMS.forEach(item => {
      const diff = Math.abs(((angle - item.angle + 540) % 360) - 180)
      if (diff < minDiff) { minDiff = diff; best = item }
    })
    return best
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!dragging.current) return
    const angle = getAngle(e.clientX, e.clientY)
    setKnobAngle(angle)
    const nearest = snapToNearest(angle)
    setSelected(nearest.id)
  }, [getAngle, snapToNearest])

  const handlePointerUp = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false
    const item = NAV_ITEMS.find(n => n.id === selectedId)
    if (item) {
      setKnobAngle(item.angle)
      setTimeout(() => {
        if (item.id === 'cart') {
          setIsCartOpen(true)
        } else {
          navigate(item.path)
        }
        onClose()
      }, 150)
    }
  }, [selectedId, navigate, onClose, setIsCartOpen])

  const handleItemTap = (item) => {
    setSelected(item.id)
    setKnobAngle(item.angle)
    setTimeout(() => {
      if (item.id === 'cart') {
        setIsCartOpen(true)
      } else {
        navigate(item.path)
      }
      onClose()
    }, 200)
  }

  const selectedItem = NAV_ITEMS.find(n => n.id === selectedId)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[90]"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Circular Menu Container */}
          <motion.div
            className="fixed bottom-28 left-1/2 z-[91]"
            style={{ transform: 'translateX(-50%)' }}
            initial={{ scale: 0, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 60 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            {/* Outer ambient glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                width: 220, height: 220,
                left: '50%', top: '50%',
                transform: 'translate(-50%,-50%)',
                background: 'radial-gradient(circle, rgba(92,184,92,0.12) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Main circle */}
            <div
              ref={centerRef}
              className="relative"
              style={{ width: 200, height: 200 }}
              onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId) }}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Background circle with glassmorphism */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'rgba(6, 20, 6, 0.92)',
                  backdropFilter: 'blur(32px)',
                  border: '1px solid rgba(92,184,92,0.25)',
                  boxShadow: [
                    '0 0 0 1px rgba(92,184,92,0.1)',
                    '0 0 40px rgba(92,184,92,0.08)',
                    'inset 0 0 40px rgba(0,0,0,0.4)',
                  ].join(','),
                }}
              />

              {/* Rotating track ring */}
              <div
                className="absolute inset-3 rounded-full"
                style={{
                  border: '1px solid rgba(92,184,92,0.12)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
                }}
              />

              {/* Nav icons arranged in circle */}
              {NAV_ITEMS.map((item) => {
                const rad     = (item.angle - 90) * (Math.PI / 180)
                const x       = Math.cos(rad) * RADIUS
                const y       = Math.sin(rad) * RADIUS
                const isActive = item.id === selectedId

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleItemTap(item)}
                    className="absolute flex items-center justify-center
                      rounded-full text-xl cursor-pointer z-10"
                    style={{
                      width: 36, height: 36,
                      left:  `calc(50% + ${x}px - 18px)`,
                      top:   `calc(50% + ${y}px - 18px)`,
                    }}
                    animate={{
                      scale:   isActive ? 1.2 : 1,
                      filter:  isActive
                        ? 'drop-shadow(0 0 8px rgba(92,184,92,0.9))'
                        : 'drop-shadow(0 0 0px transparent)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    whileTap={{ scale: 0.85 }}
                  >
                    {item.icon}
                  </motion.button>
                )
              })}

              {/* CENTER KNOB */}
              <motion.div
                className="absolute rounded-full flex items-center justify-center z-20 cursor-grab"
                style={{
                  width: 64, height: 64,
                  left: 'calc(50% - 32px)',
                  top:  'calc(50% - 32px)',
                  background: 'linear-gradient(135deg, #1a4a1a, #2d7a2d)',
                  border: '2px solid rgba(92,184,92,0.6)',
                  boxShadow: [
                    '0 0 0 4px rgba(92,184,92,0.1)',
                    '0 0 20px rgba(92,184,92,0.4)',
                    'inset 0 1px 0 rgba(255,255,255,0.15)',
                    '0 8px 20px rgba(0,0,0,0.5)',
                  ].join(','),
                }}
                animate={{ rotate: knobAngle - 90 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {/* Knob indicator line */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 3, height: 16,
                    background: 'linear-gradient(to top, #5cb85c, rgba(92,184,92,0.3))',
                    top: 6,
                    boxShadow: '0 0 6px rgba(92,184,92,0.8)',
                    borderRadius: 99,
                  }}
                />
                {/* Knob center dot */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 8, height: 8,
                    background: '#5cb85c',
                    boxShadow: '0 0 8px rgba(92,184,92,1)',
                  }}
                />
              </motion.div>

              {/* Neon ring that lights up at selected item */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `conic-gradient(
                    transparent ${knobAngle - 20}deg,
                    rgba(92,184,92,0.15) ${knobAngle}deg,
                    transparent ${knobAngle + 20}deg
                  )`,
                }}
                animate={{ rotate: 0 }}
              />
            </div>

            {/* Selected item label */}
            <motion.div
              key={selectedId}
              className="text-center mt-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-[#5cb85c] font-bold text-sm tracking-widest uppercase">
                {selectedItem?.label}
              </p>
              <p className="text-white/30 text-[10px] mt-0.5">
                Tap center to navigate
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
