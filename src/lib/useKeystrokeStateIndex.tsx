'use client'
import { useEffect, useState } from 'react'

const useKeystrokeStateIndex = (slides) => {
  const [stateIndex, setStateIndex] = useState(0)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setStateIndex((stateIndex) => (stateIndex + slides - 1) % slides)
      } else if (e.key === 'ArrowRight') {
        setStateIndex((stateIndex) => (stateIndex + 1) % slides)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [stateIndex, setStateIndex])
  return [stateIndex, setStateIndex]
}
