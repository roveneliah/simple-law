'use client'
import AutoFlipComponent from '@/components/AutoFlip'
import CaseLayout from '@/components/CaseLayout'
import LawyersTable from '@/components/LawyersTable'
import AppLayout from '@/components/Layout/AppLayout'
import { withCaseData } from '@/components/withCaseData'
import { CANDIDATES, FALLBACK_AVATAR } from '@/data/dummy'
import { BookmarkIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useMemo, useState } from 'react'

function Steps({ step, totalSteps }) {
  const steps = useMemo(() => {
    return Array(totalSteps)
      .fill()
      .map((s, i) => {
        if (i < step) {
          return { name: `Step: ${i}`, href: '#', status: 'complete' }
        } else if (i === step) {
          return { name: `Step: ${i}`, href: '#', status: 'current' }
        } else {
          return { name: `Step: ${i}`, href: '#', status: 'upcoming' }
        }
      })
  }, [step, totalSteps])

  return (
    <nav className="flex items-center justify-center" aria-label="Progress">
      {/* <p className="text-sm font-medium">
        Step {steps.findIndex((step) => step.status === 'current') + 1} of{' '}
        {steps.length}
      </p> */}
      <ol role="list" className="flex items-center space-x-5">
        {steps.map((step, i) => (
          <li key={i}>
            {step.status === 'complete' ? (
              <a
                href={step.href}
                className="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900"
              >
                <span className="sr-only">{step.name}</span>
              </a>
            ) : step.status === 'current' ? (
              <a
                href={step.href}
                className="relative flex items-center justify-center"
                aria-current="step"
              >
                <span className="absolute flex h-5 w-5 p-px" aria-hidden="true">
                  <span className="h-full w-full rounded-full bg-indigo-200" />
                </span>
                <span
                  className="relative block h-2.5 w-2.5 rounded-full bg-indigo-600"
                  aria-hidden="true"
                />
                <span className="sr-only">{step.name}</span>
              </a>
            ) : (
              <a
                href={step.href}
                className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
              >
                <span className="sr-only">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function CaseView({ caseData }) {
  const { id, name, description } = caseData || {
    id: null,
    name: null,
    description: null,
  }

  return (
    <AppLayout>
      <CaseLayout viewName="Lawyers" id={id}>
        <LawyersTable />
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(CaseView)
