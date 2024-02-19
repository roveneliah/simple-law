'use client'
import { useMemo } from 'react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const STEPS = [
  { name: 'Enter Info', href: '#', status: 'complete' },
  { name: 'We Interview Lawyers', href: '#', status: 'current' },
  { name: 'You Choose One', href: '#', status: 'upcoming' },
  // { name: 'Preview', href: '#', status: 'upcoming' },
]
export default function CaseProgress({ stageIndex = 0 }) {
  const steps = useMemo(() => {
    return STEPS.map((step, i) => {
      if (i < stageIndex) {
        return { ...step, status: 'complete' }
      } else if (i === stageIndex) {
        return { ...step, status: 'current' }
      } else {
        return { ...step, status: 'upcoming' }
      }
    })
  }, [STEPS, stageIndex])

  return (
    <div className="h-fit w-full whitespace-nowrap">
      <nav className="flex w-full justify-center" aria-label="Progress">
        <ol role="list" className="flex w-full flex-row justify-evenly">
          {steps.map((step) => (
            <li key={step.name} className="">
              {step.status === 'complete' ? (
                <a href={step.href} className="group">
                  <span className="flex items-start">
                    <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      <CheckCircleIcon
                        className="h-full w-full text-indigo-600 group-hover:text-indigo-800"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              ) : step.status === 'current' ? (
                <a
                  href={step.href}
                  className="flex items-start"
                  aria-current="step"
                >
                  <span
                    className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="absolute h-4 w-4 rounded-full bg-indigo-200" />
                    <span className="relative block h-2 w-2 rounded-full bg-indigo-600" />
                  </span>
                  <span className="ml-3 text-sm font-medium text-indigo-600">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a href={step.href} className="group">
                  <div className="flex items-start">
                    <div
                      className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </p>
                  </div>
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
