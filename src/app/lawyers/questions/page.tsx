'use client'
import LawyerViewLayout from '@/components/LawyerViewLayout'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { Listbox } from '@headlessui/react'
import {
  FaceSmileIcon,
  InformationCircleIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const dummyInquiries = [
  {
    title: 'What is your experience in personal injury law?',
    subtitle: 'Why would clients be a great fit?',
  },
  {
    title: 'What should clients expect in working with you?',
    subtitle: '',
  },
  {
    title: 'How do you communicate with clients?',
    subtitle: '',
  },
]

export default function QuestionsPage() {
  const [inquiry, setInquiry] = useState<any>({})
  useEffect(() => {
    const inq = dummyInquiries[0]
    setInquiry(inq)
  }, [])

  return (
    <LawyerAppLayout>
      <LawyerViewLayout viewName="Questions">
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                Your responses will not be shared with clients. We use these
                answers to match you with clients.
              </p>
              {/* <p className="mt-3 text-sm md:ml-6 md:mt-0">
                <a
                  href="#"
                  className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                >
                  Details
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p> */}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col space-y-4">
          <div className="flex items-start space-x-4">
            <div className="min-w-0 flex-1">
              <form action="#" className="relative">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {inquiry.title}
                </label>
                <p className="block text-sm font-medium leading-6 text-gray-600">
                  {inquiry.subtitle}
                </p>
                <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label htmlFor="comment" className="sr-only">
                    Add your comment
                  </label>
                  <textarea
                    rows={3}
                    name="comment"
                    id="comment"
                    className="block w-full resize-none border-0 bg-transparent px-3 py-2 text-gray-900 outline-none outline-none ring-0 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Add your comment..."
                    defaultValue={''}
                  />

                  {/* Spacer element to match the height of the toolbar */}
                  <div className="py-2" aria-hidden="true">
                    {/* Matches height of button in toolbar (1px border + 36px content height) */}
                    <div className="py-px">
                      <div className="h-9" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                  {/* <div className="flex items-center space-x-5">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                      >
                        <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Attach a file</span>
                      </button>
                    </div>
                  </div> */}
                  <div></div>
                  <div className="flex-shrink-0">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </LawyerViewLayout>
    </LawyerAppLayout>
  )
}
