// components/ui/card.jsx
import React from 'react'
import clsx from 'clsx'

export function Card({ className, children }) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white',
        'shadow-glow',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children }) {
  return (
    <div className={clsx('px-6 py-4 border-b border-white/10', className)}>
      {children}
    </div>
  )
}

export function CardContent({ className, children }) {
  return (
    <div className={clsx('px-6 py-4', className)}>
      {children}
    </div>
  )
}
