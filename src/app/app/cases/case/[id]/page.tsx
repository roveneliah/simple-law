'use client'
import CaseLayout from '@/components/CaseLayout'
import { Files } from '@/components/CaseViews/Files'
import AppLayout from '@/components/Layout/AppLayout'
import { useEffect, useState } from 'react'
import { useCase } from '../../../../../lib/useCase'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/lib/useUser'
import Link from 'next/link'

function InfoForm() {
  const user = useUser()
  const caseId = usePathname().split('/').pop()
  const caseData = useCase(caseId)

  const [files, setFiles] = useState([])

  const fetchFiles = async () => {
    console.log(user?.id, caseId)
    const { data, error } = await supabase.storage
      .from('caseFiles')
      .list(`${user?.id}/${caseId}`)

    if (error) {
      console.log('error', error)
    } else {
      console.log('setting files', data)
      setFiles(data)
    }
  }

  useEffect(() => {
    console.log('fetching files')
    if (user?.id && caseId) fetchFiles()
  }, [user?.id, caseId])

  // make sure there is userid??
  const [loading, setLoading] = useState(false)

  const [review, setReview] = useState('')
  useEffect(() => {
    caseData?.review && setReview(caseData?.review)
  }, [caseData?.review])

  const postCaseForReview = async (caseData, override = false) => {
    console.log('posting case for review with override', override, caseData)
    const { review, ready, data, error } = await fetch('/api/cases/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caseData,
        clientName: user?.first + user?.last,
        override,
      }),
    }).then((res) => res.json())

    return { data, error, review, ready }
  }

  const router = useRouter()
  useEffect(() => {
    // if review is 0, then submit case
    if (review == '0') {
      console.log('submitting case')
      fetch('/api/invitations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('submitted case')
          console.log(data?.note)
          // update Case status in db
          // create invitation in db
          router.push('/app/cases')
        })
    }
  }, [review])

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)

    const updatedData = {
      title: formData.get('nickname')?.toString().trim(),
      whatsUp: formData.get('whatsUp')?.toString().trim(),
      goals: formData.get('goals')?.toString().trim(),
      dates: formData.get('dates')?.toString().trim(),
    }
    console.log('Updating Case', caseId)
    const res = await supabase
      .from('Case')
      .update([
        {
          // status: 'new',
          ...updatedData,
        },
      ])
      .eq('id', caseId)
      .select()

    const activeElement = document.activeElement
    const action = activeElement?.getAttribute('value')
    const override = action === 'override'

    const { review, ready, data, error } = await postCaseForReview(
      { ...caseData, ...updatedData },
      override,
    )
    console.log('got review back!')
    console.log(review)
    console.log(ready)
    setReview(review)
    setLoading(false)
    console.log(data, error)
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Key Case Info
          </h3>
          {!caseData?.readyForInvitation && (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              We will use this to interview lawyers on your behalf.
            </p>
          )}
          {caseData?.readyForInvitation && (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              We're interviewing lawyers on your behalf now, but feel free to
              add any info or updates in the meantime.
            </p>
          )}
          {!!review && review != '0' && (
            <div className="mt-2 rounded-md bg-gray-100 p-4">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Review
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {review}
              </p>
            </div>
          )}
        </div>
        {/* <button
          type="button"
          className="h-fit rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button> */}
      </div>

      <form onSubmit={handleSave}>
        <div className="mt-6 border-t border-gray-100">
          <dl className="">
            <div className="col-span-full py-4">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                What should we nickname this case?
              </label>
              <div className="mt-2">
                <input
                  id="nickname"
                  name="nickname"
                  disabled={!caseData || loading}
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={caseData?.title}
                />
              </div>
              {/* <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p> */}
            </div>
            <div className="col-span-full py-4">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tell us what's going on in your own words.
              </label>
              <div className="mt-2">
                <textarea
                  id="whatsUp"
                  name="whatsUp"
                  rows={3}
                  disabled={!caseData || loading}
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={caseData?.whatsUp}
                />
              </div>
              {/* <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p> */}
            </div>

            <div className="col-span-full py-4">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                What are your goals?
              </label>
              <div className="mt-2">
                <textarea
                  id="goals"
                  name="goals"
                  rows={3}
                  disabled={!caseData || loading}
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={caseData?.goals}
                />
              </div>
              {/* <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p> */}
            </div>

            <div className="col-span-full py-4">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Any dates or deadlines we should know about?
              </label>
              <div className="mt-2">
                <textarea
                  id="dates"
                  name="dates"
                  rows={3}
                  disabled={!caseData || loading}
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={caseData?.dates}
                />
              </div>
              {/* <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p> */}
            </div>
            <Files files={files} setFiles={setFiles} fetchFiles={fetchFiles} />
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                name="action"
                value="save"
                className={`${loading ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-500'} rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="submit"
                name="action"
                value="review"
                className={`${loading ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-500'} rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {loading ? 'Reviewing...' : 'Submit'}
              </button>
              <button
                type="submit"
                name="action"
                value="override"
                className={`${loading ? 'bg-gray-300' : ' whitespace-nowrap bg-indigo-600 hover:bg-indigo-500'} rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {loading ? 'Submitting...' : 'Force Submit'}
              </button>
            </div>
          </dl>
        </div>
      </form>
    </>
  )
}

export default function DocumentsView() {
  return (
    <AppLayout>
      <CaseLayout viewName="Case Info">
        <InfoForm />
      </CaseLayout>
    </AppLayout>
  )
}
