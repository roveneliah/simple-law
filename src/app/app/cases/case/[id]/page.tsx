'use client'
import CaseLayout from '@/components/CaseLayout'
import { Files } from '@/components/CaseViews/Files'
import AppLayout from '@/components/Layout/AppLayout'
import { useState } from 'react'
import { useCase } from '../../status/[id]/page'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

function InfoForm() {
  const caseId = usePathname().split('/').pop()
  const caseData = useCase(caseId)
  const [files, setFiles] = useState([])

  // make sure there is userid??
  const [loading, setLoading] = useState(false)

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

    setLoading(false)
    console.log(res)

    // then upload docs
    // router.push('/app/cases')
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Key Case Info
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
            <Files files={files} setFiles={setFiles} />
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${loading ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-500'} rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {loading ? 'Saving...' : 'Save'}
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
