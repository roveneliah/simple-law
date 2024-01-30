'use client'
import { useState } from 'react'
import { Dropdown } from '../Dropdown'

export function CaseSwitcherDropdown() {
  const [openDropdown, setOpenDropdown] = useState(false)
  return (
    <div className="w-full transition-all">
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className={`${openDropdown && 'border bg-gray-50'} -ml-6 w-full rounded-md px-6 py-3 text-left text-gray-600 transition-all  hover:border hover:bg-gray-50 hover:text-gray-700`}
      >
        <p>Contract dispute with John Smith</p>
        {openDropdown && <Dropdown setOpenDropdown={setOpenDropdown} />}
      </button>
    </div>
  )
}
