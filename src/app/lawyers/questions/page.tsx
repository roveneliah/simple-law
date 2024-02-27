'use client'
import LawyerViewLayout from '@/components/LawyerViewLayout'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import { useLawyerUser } from '@/lib/useUser'
import { cn } from '@/lib/utils'
import { Listbox } from '@headlessui/react'
import {
  FaceSmileIcon,
  InformationCircleIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline'
import { Inquiry } from '@prisma/client'
import { FormEvent, useEffect, useState } from 'react'

export default function QuestionsPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const lawyer = useLawyerUser()
  useEffect(() => {
    const fetchInquiries = async () => {
      // get inquiries that do not have answers
      const { data, error } = await supabase
        .from('Inquiry')
        .select('*')
        .eq('lawyerId', lawyer.id)

      return data
    }

    lawyer.id &&
      fetchInquiries()
        .then(setInquiries)
        .then(() => setLoading(false))
  }, [lawyer.id])

  console.log(inquiries)
  console.log(lawyer)

  if (loading) {
    return (
      <LawyerAppLayout>
        <LawyerViewLayout viewName="Questions" />
        <div className="mt-8 flex flex-col items-center">
          <FaceSmileIcon
            className="h-12 w-12 text-gray-400"
            aria-hidden="true"
          />
          <h2 className="mt-6 text-2xl font-semibold leading-6 text-gray-900">
            Loading Inquiries..
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Our robots must be sleeping on the job.
          </p>
        </div>
      </LawyerAppLayout>
    )
  }

  if (!loading && !inquiries.length) {
    return (
      <LawyerAppLayout>
        <LawyerViewLayout viewName="Questions" />
        <div className="mt-8 flex flex-col items-center">
          <FaceSmileIcon
            className="h-12 w-12 text-gray-400"
            aria-hidden="true"
          />
          <h2 className="mt-6 text-2xl font-semibold leading-6 text-gray-900">
            No questions to answer
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            You have no questions to answer at this time.
          </p>
        </div>
      </LawyerAppLayout>
    )
  }

  const handleAnswer = (inquiryId: number) => async (e: Event) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const answer = data.get('comment')
    console.log('comment', comment)

    // update supabase answer
    supabase
      .from('Inquiry')
      .update({ answer })
      .eq('id', inquiryId)
      .select()
      .then(({ data, error }) => {
        console.log('data', data)
        console.log('error', error)
      })

    // reload page
    window.location.reload()
  }

  const unansweredInquiries = inquiries.filter((inquiry) => !inquiry.answer)

  const answeredInquiries = inquiries.filter((inquiry) => inquiry.answer)

  return (
    <LawyerAppLayout>
      {/* <LawyerViewLayout viewName="Questions" /> */}
      <div>
        <h1 className="text-5xl font-bold tracking-tighter">Questions</h1>
      </div>
      <div className="mt-4 rounded-md bg-blue-50 p-4">
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
        <div className="flex flex-col space-y-4">
          {unansweredInquiries?.map((inquiry, i) => (
            <div className="min-w-0 flex-1" key={i}>
              <form
                onSubmit={(e) => handleAnswer(inquiry.id)(e)}
                className="relative"
              >
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {inquiry.question}
                </label>
                {/* <p className="block text-sm font-medium leading-6 text-gray-600">
                  {inquiry.answer}
                </p> */}
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
                  <div className="flex-shrink-0 space-x-4">
                    {/* <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Review
                  </button> */}
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
              <div>
                <p>Tell us more...</p>
                {/* <p>Any wins you can tell us about?</p> */}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-4">
          {answeredInquiries?.map((inquiry, i) => (
            <div className="min-w-0 flex-1" key={i}>
              <form
                onSubmit={(e) => handleAnswer(inquiry.id)(e)}
                className="relative"
              >
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {inquiry.question}
                </label>
                <p className="block text-sm font-medium leading-6 text-gray-600">
                  {inquiry.answer}
                </p>
                <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label htmlFor="comment" className="sr-only">
                    Add your comment
                  </label>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
      {/* </LawyerViewLayout> */}
    </LawyerAppLayout>
  )
}
