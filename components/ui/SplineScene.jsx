// components/ui/SplineScene.jsx
import React from 'react'
import Spline from '@splinetool/react-spline'

export default function SplineScene({ sceneUrl, className }) {
  if (!sceneUrl) return null
  return (
    <div className={className}>
      <Spline scene={sceneUrl} />
    </div>
  )
}
