'use client'
import AutoFlipComponent from '@/components/AutoFlip'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import { withCaseData } from '@/components/withCaseData'
import { CANDIDATES, FALLBACK_AVATAR } from '@/data/dummy'
import { BookmarkIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
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
      <ol role="list" className="ml-8 flex items-center space-x-5">
        {steps.map((step) => (
          <li key={step.name}>
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

  const [step, setStep] = useState(0)

  return (
    <AppLayout>
      <CaseLayout viewName="Lawyers" id={id}>
        {/* <p>{name}</p>
        <p className="transition-all hover:animate-pulse hover:cursor-pointer hover:text-orange-500">
          {description}
        </p> */}
        <div className="flex flex-col">
          {CANDIDATES.map((candidate) => (
            <div className="flex flex-row gap-x-4">
              {/* <img
                src={
                  candidate.avatar ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                }
                className="h-10 w-10 rounded-full bg-gray-800"
                alt="avatar"
              /> */}
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-row justify-between">
                  <div className="flex w-full flex-row justify-start">
                    <p>
                      {candidate.first} {candidate.last}
                    </p>
                    <Steps
                      step={step}
                      totalSteps={candidate.interview.length + 3}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-evenly gap-4">
                    <button>
                      <StarIcon
                        className={'h-5 w-5 shrink-0 text-black'}
                        aria-hidden="true"
                      />
                    </button>
                    <button>
                      <XMarkIcon
                        className={'h-6 w-6 shrink-0 text-black'}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
                <p>{candidate.description}</p>
                <AutoFlipComponent
                  currentIndex={step}
                  setCurrentIndex={setStep}
                  className="mt-8 flex flex-col gap-8"
                >
                  <div>
                    <p>Hey Eli,</p>
                    <p className="mt-4">
                      {candidate.first} is a personal injury attorney with over
                      100 wins. She's worked with 5 other clients on Impossible
                      thus far, and has no bad reviews.
                    </p>
                    <p className="mt-4">
                      She's available to take your case, and her rate is
                      $300/hr. This is typical of the industry. With Impossible,
                      you get the first 2 hours free.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-start gap-2">
                      <p className="font-medium">
                        {candidate.first} {candidate.last}
                      </p>
                      <p className="text-gray-600">{candidate.firm}</p>
                    </div>
                    <div className="flex flex-row justify-start gap-4">
                      <img
                        src={candidate.avatar || FALLBACK_AVATAR}
                        className="h-10 w-10 rounded-full bg-gray-800"
                        alt="avatar"
                      />
                      <p>{candidate.note}</p>
                    </div>
                  </div>
                  {candidate.interview.map(({ question, answer }, i) => (
                    <div className="flex flex-col gap-4">
                      <p className="font-semibold">{question}</p>
                      <div className="flex flex-row gap-4">
                        <img
                          src={candidate.avatar || FALLBACK_AVATAR}
                          className="h-10 w-10 rounded-full bg-gray-800"
                          alt="avatar"
                        />
                        <p>{answer}</p>
                      </div>
                    </div>
                  ))}
                  <div>
                    <p>Thoughts?</p>
                    <p className="mt-4">
                      Having them give thoughts will help iterate on flows, and
                      give lawyers help marketing themselves.
                    </p>
                  </div>
                </AutoFlipComponent>
              </div>
            </div>
          ))}
        </div>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(CaseView)
