'use client'
import { useState } from 'react'

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="child w-2xl fixed z-50 flex animate-none items-center justify-center bg-black bg-opacity-50 hover:animate-none">
      <div className="h-full w-full overflow-auto bg-green-100 p-6">
        {children}
        <button
          onClick={onClose}
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default function MagicText({ children }) {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const openDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)

  return (
    <>
      <span
        onClick={openDialog}
        className="cursor-pointer transition-all hover:animate-pulse hover:cursor-pointer hover:font-medium hover:text-purple-400"
      >
        {children}
      </span>
      {/* <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <p>Your content here...</p>
      </Dialog> */}
    </>
  )
}
