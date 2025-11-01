// components/ui/Spotlight.jsx
import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function Spotlight() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const bg = useTransform([x, y], ([latestX, latestY]) => {
    return `radial-gradient(600px circle at ${latestX}px ${latestY}px, rgba(99,102,241,0.18), transparent 40%)`
  })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      className="absolute inset-0"
      style={{ background: bg, mixBlendMode: 'screen', pointerEvents: 'none' }}
    />
  )
}
