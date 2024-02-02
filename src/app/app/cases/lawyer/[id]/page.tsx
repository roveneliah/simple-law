'use client'
import AutoFlipComponent from '@/components/AutoFlip'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import { withCaseData } from '@/components/withCaseData'
import { CANDIDATES, FALLBACK_AVATAR } from '@/data/dummy'
import { BookmarkIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

function CaseView({ caseData, candidate = CANDIDATES[0] }) {
  const { id, name, description } = caseData || {
    id: null,
    name: null,
    description: null,
  }

  const [step, setStep] = useState(0)

  const router = useRouter()
  const handleSaveFeedback = () => {
    console.log('feedback saved')
    router.push('/app/cases/lawyers/' + id)
  }

  return (
    <AppLayout>
      <CaseLayout viewName="Lawyers" id={id}>
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-4">
            <div className="flex w-full flex-col">
              {/* <Steps step={step} totalSteps={3} /> */}
              {/* <div className="flex w-full flex-row justify-between">
                  <div className="flex w-full flex-row justify-start">
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
                </div> */}
              <AutoFlipComponent
                currentIndex={step}
                setCurrentIndex={setStep}
                className="mt-0 flex flex-col gap-8"
              >
                <div>
                  <p>Hey Eli,</p>
                  <p className="mt-4">
                    {candidate.first} is a personal injury attorney with over
                    100 wins. She's worked with 5 other clients on Impossible
                    thus far, and has no bad reviews.
                  </p>
                  <p className="mt-4">
                    She's available to take your case, and her rate is $300/hr.
                    This is typical of the industry.
                  </p>
                  <p className="mb-2 mt-4">
                    Booking with IMPOSSIBLELaw, you get:
                  </p>
                  <li>First 2 hours free ($600)</li>
                  <li>Free weekly updates on your case.</li>
                  <li>Free lawyer swap if you're not satisfied.</li>
                  <p className="mt-4">
                    Check out the interview we conducted to see if she's a good
                    fit.
                  </p>
                  <div className="flex w-1/2 flex-row items-end justify-between">
                    <div>
                      <p className="mt-4">Cheers,</p>
                      <p className="text-lg font-extrabold">
                        IMPOSSIBLE<span className="font-light">Law</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex w-full  flex-row items-center justify-between">
                    <div className="mb-4">
                      <label className="text-base font-semibold text-gray-900">
                        Interview
                      </label>
                      <p className="text-sm text-gray-500">
                        Jot down a few thoughts to help you narrow down.
                      </p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-start gap-2">
                      <p className="font-medium">
                        {candidate.first} {candidate.last}
                      </p>
                      <p className="text-gray-600">{candidate.firm}</p>
                    </div>
                    <div className="flex flex-row justify-start gap-4">
                      <p>{candidate.note}</p>
                    </div>
                  </div>
                  {candidate.interview.map(({ question, answer }, i) => (
                    <div className="flex flex-col gap-4" key={i}>
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
                </div>
                <div>
                  <div>
                    <div className="mb-8">
                      <label className="text-base font-semibold text-gray-900">
                        Thoughts?
                      </label>
                      <p className="text-sm text-gray-500">
                        Jot down a few thoughts to help you narrow down.
                      </p>
                    </div>
                    <fieldset className="">
                      <legend className="sr-only">Notification method</legend>
                      <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                        {[
                          { id: 'save', title: 'Save for Later' },
                          { id: 'fav', title: 'Add to Favorites' },
                          { id: 'scrap', title: 'Decline Offer' },
                        ].map((notificationMethod) => (
                          <div
                            key={notificationMethod.id}
                            className="flex items-center"
                          >
                            <input
                              id={notificationMethod.id}
                              name="notification-method"
                              type="radio"
                              defaultChecked={notificationMethod.id === 'save'}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor={notificationMethod.id}
                              className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                            >
                              {notificationMethod.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                    <form>
                      <div className="col-span-full">
                        <div className="mt-4">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            placeholder="Jot down a few thoughts to help you narrow down."
                          />
                        </div>
                      </div>
                    </form>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleSaveFeedback}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </AutoFlipComponent>
            </div>
          </div>
        </div>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(CaseView)
