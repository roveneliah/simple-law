import React, { useState } from 'react'

const Prototype = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const childrenArray = React.Children.toArray(children)

  const nextDesign = () => {
    setCurrentIndex((currentIndex + 1) % childrenArray.length)
  }

  return (
    <div className="relative w-fit">
      <div className="pt-8">{childrenArray[currentIndex]}</div>
      <button
        className="absolute right-0 top-0 m-2 rounded bg-gray-500 px-2 py-1 text-xs text-white"
        onClick={nextDesign}
      >
        Toggle
      </button>
    </div>
  )
}

export default Prototype
