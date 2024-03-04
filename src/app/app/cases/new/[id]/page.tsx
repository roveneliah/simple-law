'use client'
import AppLayout from '@/components/Layout/AppLayout'
import prisma from '@/lib/prismaClient'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/lib/useUser'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NewFiles } from '@/components/CaseViews/NewFiles'
import { useCase } from '@/lib/useCase'
import { Files } from '@/components/CaseViews/Files'
import { InfoGatherView } from '../../lawyers/[caseId]/info/page'

const uploadDocuments = async (files) => {
  const uploadedDocs = await Promise.all(
    files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      return data
    }),
  )
  return uploadedDocs
}

const createDocumentEntries = async (uploadedDocs) => {
  const documentEntries = await Promise.all(
    uploadedDocs.map(async (doc) => {
      const document = await prisma.document.create({
        data: {
          name: doc.name,
          url: doc.url,
        },
      })
      return document.id
    }),
  )
  return documentEntries
}

function NewCaseForm({ caseData }) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)

  // basics
  const [nickname, setNickname] = useState(caseData.title)
  const [whatsUp, setWhatsUp] = useState(caseData.whatsUp)

  const [goals, setGoals] = useState('')
  const [dates, setDates] = useState('')
  const [files, setFiles] = useState([])

  const [view, setView] = useState('basics')

  const [loading, setLoading] = useState(false)

  if (!caseData?.title)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )

  const submitCaseForReview = async () => {
    console.log('submitting case for review')
  }

  const handleUpdateBasics = async (e) => {
    e.preventDefault()
    console.log('updating basics')

    if (caseData.title !== nickname || caseData.whatsUp !== whatsUp) {
      setLoading(true)
      const { data, error } = await supabase
        .from('Case')
        .update({
          title: nickname,
          whatsUp,
        })
        .eq('id', caseData.id)
        .single()
      if (!error) setLoading(false)
    }

    setView('goals')
  }

  const handleUpdateGoals = async (e) => {
    e.preventDefault()
    console.log('updating goals')

    if (caseData?.goals !== goals) {
      setLoading(true)
      const { data, error } = await supabase
        .from('Case')
        .update({
          goals,
        })
        .eq('id', caseData.id)
        .single()

      if (!error) setLoading(false)
    }

    setView('dates')
  }

  const handleUpdateDates = async (e) => {
    e.preventDefault()
    console.log('updating dates')

    if (caseData?.dates !== dates) {
      setLoading(true)
      const { data, error } = await supabase
        .from('Case')
        .update({
          dates,
        })
        .eq('id', caseData.id)
        .single()

      if (!error) setLoading(false)
    }

    setView('docs')
  }

  console.log(caseData)

  useEffect(() => {
    if (view !== 'review') return

    if (!caseData?.readyForInvitation && !caseData.Question.length) {
      console.log('triggering review with AI')
      fetch('/api/cases/review/parse', {
        method: 'POST',
        body: JSON.stringify({ caseId: caseData.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('review data', data)
          router.refresh()
        })
    }
  }, [view])

  return (
    <div className="mt-8 w-full">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="w-full px-4 sm:px-0">
          <h3 className="text-5xl font-bold leading-7 tracking-tighter text-gray-900">
            New Case
          </h3>
          {/* <p className="mt-4 max-w-2xl text-lg leading-6 text-gray-500">
            We will use this to interview lawyers on your behalf.
          </p> */}
        </div>
      </div>
      <div className="mt-16 flex w-full flex-row">
        <div className="flex w-2/5 flex-col items-start text-left font-semibold">
          <button
            type="button"
            onClick={() => setView('basics')}
            className={`mt-1 text-left text-sm leading-6 ${view === 'basics' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
          >
            Basic Information
          </button>
          <button
            type="button"
            onClick={() => setView('goals')}
            className={`mt-1 text-left text-sm leading-6 ${view === 'goals' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
          >
            Goals
          </button>{' '}
          <button
            type="button"
            onClick={() => setView('dates')}
            className={`mt-1 text-left text-sm leading-6 ${view === 'dates' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
          >
            Dates
          </button>
          <button
            type="button"
            onClick={() => setView('docs')}
            className={`mt-1 text-left text-sm leading-6 ${view === 'docs' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
          >
            Documents
          </button>
          <button
            type="button"
            onClick={() => setView('review')}
            className={`mt-1 text-left text-sm leading-6 ${view === 'review' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
          >
            Review
          </button>
        </div>
        <div className="mt-0 w-full">
          <dl className="">
            <div className={''}>
              {view === 'basics' && (
                <form
                  onSubmit={handleUpdateBasics}
                  className="relative col-span-full rounded-md"
                >
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tell us what's going on in your own words.
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={''}
                      value={whatsUp}
                      onChange={(e) => setWhatsUp(e.target.value)}
                    />
                  </div>

                  <label
                    htmlFor="nickname"
                    className="mt-8 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Oh, and let's create a nickname for our case.
                  </label>
                  <div className="mt-2">
                    <input
                      id="nickname"
                      name="nickname"
                      className="block w-3/4 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={''}
                      maxLength={28}
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                  </div>
                  <div className="mt-8 flex w-full flex-row justify-end gap-8">
                    <button
                      type="button"
                      onClick={() => setCurrentIndex(currentIndex - 1)}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {view === 'goals' && (
                <form onSubmit={handleUpdateGoals} className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    What are your goals?
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={''}
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Let's make sure you and your attorney get each other from
                    Day 1.
                  </p>
                  <div className="mt-8 flex w-full flex-row justify-end gap-8">
                    <button
                      type="button"
                      onClick={() => setView('basics')}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {view === 'dates' && (
                <form onSubmit={handleUpdateDates} className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Any dates or deadlines we should know about?
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={''}
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    This will help attorneys understand your situation and set
                    your expectation.
                  </p>
                  <div className="mt-8 flex w-full flex-row justify-end gap-8">
                    <button
                      type="button"
                      onClick={() => setView('goals)')}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {/* {view === 'docs' && (
                <NewFiles files={files} setFiles={setFiles} />
              )} */}
              {view === 'docs' && (
                <div>
                  <Files caseId={caseData.id} />
                  <div className="mt-4 flex  w-full flex-row justify-end gap-8">
                    <button
                      type="button"
                      onClick={() => setView('dates')}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setView('review')}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Review
                    </button>
                  </div>
                </div>
              )}
              {view === 'review' && (
                <div className="flex flex-col">
                  {caseData?.readyForInvitation ? (
                    <div className="flex flex-col">
                      <p className="block text-lg font-semibold leading-6 text-gray-900">
                        Review your case details.
                      </p>

                      <div className="flex w-full flex-row justify-end gap-8">
                        <button
                          type="button"
                          onClick={() => setCurrentIndex(currentIndex - 1)}
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          onClick={() => {}}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Start Interviews
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {/* <p className="block text-lg font-semibold leading-6 text-gray-900">
                        We need a few more details.
                      </p> */}
                      <InfoGatherView caseId={caseData.id} />

                      {/* <div className="flex w-full flex-row justify-end gap-8">
                        <button
                          type="button"
                          onClick={() => setCurrentIndex(currentIndex - 1)}
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          onClick={() => submitCaseForReview()}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Start Interviews
                        </button>
                      </div> */}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Attachments
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        resume_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0 space-x-4">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800"
                    >
                      Remove
                    </button>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        coverletter_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0 space-x-4">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default function NewCase({ params: { id } }) {
  const caseData = useCase(id)

  const loading = !caseData

  return (
    <AppLayout loading={loading}>
      {!loading && <NewCaseForm caseData={caseData} />}
    </AppLayout>
  )
}
