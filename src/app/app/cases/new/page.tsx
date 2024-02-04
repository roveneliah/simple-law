'use client'
import AutoFlipComponent from '@/components/AutoFlip'
import { Files } from '@/components/CaseViews/Files'
import AppLayout from '@/components/Layout/AppLayout'
import prisma from '@/lib/prismaClient'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/lib/useUser'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { POST } from '@/app/api/cases/refine/route'

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

function NewCaseForm() {
  const router = useRouter()
  const user = useUser()
  const [currentIndex, setCurrentIndex] = useState(0)

  const [whatsUp, setWhatsUp] = useState('')
  const [goals, setGoals] = useState('')
  const [dates, setDates] = useState('')
  const [files, setFiles] = useState([])

  // make sure there is userid??
  const handleCreateCase = async () => {
    console.log('Create case')

    // const refinedCase = refineCaseWithAI({ whatsUp, goals, dates, files })
    // call POST /api/cases/refine with caseData to get refinedCase

    // call endpoint
    const refinedCase = await fetch('/api/cases/refine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refinedCase: {
          whatsUp,
          goals,
          dates,
          files,
        },
      }),
    }).then((res) => res.json())

    supabase
      .from('Case')
      .insert([
        {
          // generate id
          id: uuidv4(),
          userId: user.id,
          status: 'new',
          title: refinedCase?.title,
          description: refinedCase?.description,
          whatsUp,
          goals,
          dates,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .select()
      .then(({ data, error }) => {
        if (error?.code === '23503') {
          console.error('User not found')
          return { data, error }
        }

        console.log(data, error)
      })

    // then upload docs
    router.push('/app/cases')
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Tell us about your situation.
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            We will use this to interview lawyers on your behalf.
          </p>
        </div>
        {/* <button
          type="button"
          className="h-fit rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button> */}
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="">
          <AutoFlipComponent
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            className={'py-4'}
          >
            <div className="col-span-full">
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
                  defaultValue={''}
                  value={whatsUp}
                  onChange={(e) => setWhatsUp(e.target.value)}
                />
              </div>
              <button className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </button>
            </div>

            <div className="col-span-full">
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
                  defaultValue={''}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Let's make sure you and your attorney get each other from Day 1.
              </p>
            </div>

            <div className="col-span-full">
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
                  defaultValue={''}
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                This will help attorneys understand your situation and set your
                expectation.
              </p>
            </div>
            <Files files={files} setFiles={setFiles} />
          </AutoFlipComponent>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {currentIndex > 0 && (
              <button
                type="button"
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Back
              </button>
            )}
            {currentIndex < 3 && (
              <button
                type="submit"
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            )}
            {currentIndex === 3 && (
              <button
                type="submit"
                onClick={handleCreateCase}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Let's go.
              </button>
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
    </>
  )
}

export default function NewCase() {
  const caseData = {
    id: 0,
    name: '',
    description: '',
    access: 'Private',
    status: 'Open',
    documents: [],
  }

  return (
    <AppLayout>
      <NewCaseForm caseData={caseData} />
    </AppLayout>
  )
}
