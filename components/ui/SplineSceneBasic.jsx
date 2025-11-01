// components/ui/SplineSceneBasic.jsx
import React from 'react'
import SplineScene from './SplineScene'

export default function SplineSceneBasic({ sceneUrl }) {
  return (
    <div className="relative w-100 h-[420px] md:h-[520px] lg:h-[620px] rounded-xl overflow-hidden ">
      <SplineScene sceneUrl={sceneUrl} className="absolute inset-0" />
    </div>
  )
}
