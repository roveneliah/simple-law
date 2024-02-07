import React, { useState, useEffect } from 'react'

const AutoFlipComponent = ({
  currentIndex,
  setCurrentIndex,
  children,
  className = '',
}) => {
  // Check if children is a single element or an array
  const childrenArray = React.Children.toArray(children)

  // flip on left right key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex(
          (currentIndex) =>
            (currentIndex + childrenArray.length - 1) % childrenArray.length,
        )
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(
          (currentIndex) => (currentIndex + 1) % childrenArray.length,
        )
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, setCurrentIndex])

  return <div className={className}>{childrenArray[currentIndex]}</div>
}

export default AutoFlipComponent
