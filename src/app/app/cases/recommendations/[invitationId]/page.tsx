'use client'
import AutoFlipComponent from '@/components/AutoFlip'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import { CANDIDATES, FALLBACK_AVATAR, dummyLawyers } from '@/data/dummy'
import { supabase } from '@/lib/supabaseClient'
import { UUID } from 'crypto'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export const useInvitation = (invitationId: UUID) => {
  const [invitation, setInvitation] = useState(null)
  useEffect(() => {
    const fetchInvitation = async () => {
      const {data, error } = await supabase
        .from('Invitation')
        .select('*, Case(*), Lawyer(*), Service(*)')
        .eq('id', invitationId)
        .single()

      console.log({data, error})
      return {data, error}
    }

    console.log("trying to ftech invitation")
    invitationId && fetchInvitation().then(({data, error}) => setInvitation(data))

  }, [invitationId])

  return invitation
}

const interview = CANDIDATES[0].interview
function InvitationView() {
  const invitationId = usePathname().split('/').pop()
  const invitation = useInvitation(invitationId)
  console.log(invitation)

  const lawyerData = invitation?.Lawyer

  const [step, setStep] = useState(0)

  const router = useRouter()
  const saveFeedback = (value: string) => {
    // write status to invitation field in supabase
    console.log('feedback saved')
    router.push('/app/cases/services/' + invitation?.Case?.id)
  }


  return (
    <AppLayout>
      <CaseLayout viewName="Lawyers" id={invitation?.Case?.id}>
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-4">
            <div className="flex w-full flex-col">
              <AutoFlipComponent
                currentIndex={step}
                setCurrentIndex={setStep}
                className="mt-0 flex flex-col gap-8"
              >
                <div>
                  <p>Hey Eli,</p>
                  <p className="mt-4">
                    {interview.ourAnalysis}
                  </p>
                  <p className="mt-4">
                    They're available to take your case, and their rate is
                    $300/hr. This is typical of the industry.
                  </p>
                  <p className="mb-2 mt-4">
                    Booking with IMPOSSIBLELaw, you get:
                  </p>
                  <li>First 2 hours free ($600)</li>
                  <li>Free weekly updates on your case.</li>
                  <li>Free lawyer swap if you're not satisfied.</li>
                  <p className="mt-4">
                    Check out the interview we conducted to see if it's a good
                    fit.
                  </p>
                  <div className="mt-8 flex w-full flex-row justify-center">
                    <button
                      onClick={() => setStep(step + 1)}
                      className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    >
                      👍 Start Interview
                    </button>
                  </div>
                  {/* <div className="flex w-1/2 flex-row items-end justify-between">
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
                  </div> */}
                </div>

                {/* <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-start gap-2">
                      <p className="font-medium">
                        {candidate.first} {candidate.last}
                      </p>
                      <p className="text-gray-600">{candidate.firm}</p>
                    </div>
                    <div className="flex flex-row justify-start gap-4">
                      <p>{candidate.note}</p>
                    </div>
                  </div> */}
                {interview.map(
                  ({ question, answer, notes = '' }, i) => {
                    const [questionLive, setQuestionLive] = useState('')
                    useEffect(() => {
                      const interval = setInterval(() => {
                        setQuestionLive(
                          question.slice(0, questionLive.length + 1),
                        )
                      }, 15)
                      return () => clearInterval(interval)
                    }, [questionLive, question])

                    const [answerLive, setAnswerLive] = useState('')
                    useEffect(() => {
                      if (questionLive.length !== question.length) return

                      const interval2 = setInterval(() => {
                        setAnswerLive(answer.slice(0, answerLive.length + 1))
                      }, 15)
                      return () => clearInterval(interval2)
                    }, [answerLive, answer, questionLive, question])

                    const [notesLive, setNotesLive] = useState('')
                    useEffect(() => {
                      if (answerLive.length !== answer.length) return

                      const interval3 = setInterval(() => {
                        setNotesLive(notes.slice(0, notesLive.length + 1))
                      }, 15)
                      return () => clearInterval(interval3)
                    }, [notesLive, notes, answerLive, answer])

                    // reset on step change
                    useEffect(() => {
                      setAnswerLive('')
                      setQuestionLive('')
                      setNotesLive('')
                    }, [step])

                    return (
                      <div>
                        <div className="flex w-full  flex-row items-center justify-between">
                          <div className="mb-4">
                            <label className="text-base font-semibold text-gray-900">
                              Interview
                            </label>
                            <p className="text-sm text-gray-500">
                              Jot down a few thoughts to help you narrow down.
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-8" key={i}>
                          <div className="flex flex-row gap-4">
                            <img
                              src={FALLBACK_AVATAR}
                              className="h-10 w-10 rounded-full bg-gray-800"
                              alt="avatar"
                            />
                            <div className="flex flex-col">
                              <p className="font-medium">IMPOSSIBLE</p>
                              <p className="">{questionLive}</p>
                            </div>
                          </div>
                          {answerLive && (
                            <div className="flex flex-row gap-4">
                              <img
                                src={lawyerData?.imageUrl || FALLBACK_AVATAR}
                                className="h-10 w-10 rounded-full bg-gray-800"
                                alt="avatar"
                              />
                              <div>
                                <p className="font-medium">{lawyerData?.first}</p>
                                <p>{answerLive}</p>
                              </div>
                            </div>
                          )}
                          {notesLive && (
                            <div className="flex flex-row gap-4 rounded-lg bg-gray-100 px-3 py-2">
                              {/* <img
                                src={FALLBACK_AVATAR}
                                className="h-10 w-10 rounded-full bg-gray-800"
                                alt="avatar"
                              /> */}
                              <div className="rounded-full">
                                <p className="px-1 text-4xl">👍</p>
                              </div>
                              <div>
                                <p className="font-medium">Our Perspective</p>
                                <p>{notesLive}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-8 flex w-full flex-row justify-center gap-4">
                          <button
                            onClick={() => setStep(step + 1)}
                            className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => setStep(step + 1)}
                            className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                          >
                            👍 Next
                          </button>
                        </div>
                      </div>
                    )
                  },
                )}
                <div>
                  <div>
                    <div className="mb-8">
                      <label className="text-base font-semibold text-gray-900">
                        Our Feedback
                      </label>
                      <p>{invitation?.ourAnalysis}</p>
                    </div>

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
                    {/* <fieldset className="">
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
                    </fieldset> */}
                    <div className="mt-8 flex w-full flex-row justify-evenly gap-4">
                      <button
                        onClick={() => saveFeedback('Shortlist')}
                        className="w-full rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => saveFeedback('Decline')}
                        className="w-full rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                      >
                        Decline Offer
                      </button>
                      <div className="w-full">
                        <Link href={`/app/cases/services/${invitation?.Case?.id}`}>
                          <button className="w-full rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">
                            Skip
                          </button>
                        </Link>
                      </div>
                      <div className="w-full">
                        <Link href={`/app/cases/services/book/${invitation?.id}`}>
                          <button className="w-full rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">
                            Book Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </AutoFlipComponent>
            </div>
          </div>
        </div>
      </CaseLayout>
    </AppLayout>,
  )
}

export default InvitationView
