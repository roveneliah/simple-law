'use client'
import CaseLayout from '@/components/CaseLayout'
import { Files } from '@/components/CaseViews/Files'
import AppLayout from '@/components/Layout/AppLayout'
import { withCaseData } from '@/components/withCaseData'
import { PaperClipIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

function InfoForm({ caseData }) {
  const [files, setFiles] = useState(caseData.files)

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

      <div className="mt-6 border-t border-gray-100">
        <dl className="">
          <div className="col-span-full py-4">
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
                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={caseData?.whatsUp}
              />
            </div>
            {/* <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p> */}
          </div>

          <div className="col-span-full py-8">
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
                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={caseData?.goals}
              />
            </div>
            {/* <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p> */}
          </div>

          <div className="col-span-full py-8">
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
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </dl>
      </div>
    </>
  )
}

function DocumentsView({ caseData }) {
  return (
    <AppLayout>
      <CaseLayout viewName="Case Info">
        <InfoForm caseData={caseData} />
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(DocumentsView)
