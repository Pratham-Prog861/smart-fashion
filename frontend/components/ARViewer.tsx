'use client'

import { useEffect, useRef, useState } from 'react'
import { Box } from 'lucide-react'
import { getModelUrl } from '@/utils/modelUrls'

interface ARViewerProps {
  modelSrc: string
  alt: string
  poster?: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any
    }
  }
}

export function ARViewer({ modelSrc, alt, poster }: ARViewerProps) {
  const viewerRef = useRef<HTMLElement>(null)
  const [error, setError] = useState(false)
  const modelUrl = getModelUrl(modelSrc)

  useEffect(() => {
    const viewer = viewerRef.current
    if (viewer) {
      viewer.addEventListener('error', () => setError(true))
    }
  }, [])

  if (error || !modelUrl) {
    return (
      <div className="w-full h-[500px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
        <Box size={64} className="text-gray-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-400 text-center">
          3D Model Not Available
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          AR viewing is not available for this product yet
        </p>
      </div>
    )
  }

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
      <model-viewer
        ref={viewerRef}
        src={modelUrl}
        alt={alt}
        poster={poster}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        touch-action="pan-y"
        auto-rotate
        shadow-intensity="1"
        style={{ width: '100%', height: '100%' }}
      >
        <button
          slot="ar-button"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          View in Your Space
        </button>
      </model-viewer>
    </div>
  )
}
