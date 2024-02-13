'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const invitation = {
  title: 'Personal Injury, $200000, San Diego, CA',
  dueBy: new Date(Date.now() + 24 * 60 * 60 * 1000),
  Case: {
    title: 'Personal Injury, $200000, San Diego, CA',
  },
}

const dummyInterview = [
  {
    question: 'What is your experience with personal injury cases?',
    answer:
      'I have been practicing personal injury law for 10 years.  I have handled over 100 cases and have won 90% of them.',
  },
  {
    question: 'What kind of clients?',
  },
]

function formatDateToMMDDYY(inputDate) {
  // Create a Date object from the input
  const date = new Date(inputDate)

  // Extract and format the month, day, and year
  const month = (date.getMonth() + 1).toString()
  const day = date.getDate().toString()
  const year = date.getFullYear().toString().substr(-2) // Get the last 2 digits of the year

  // Compile the formatted date string
  return `${month}/${day}/${year}`
}

export default function InvitationsView() {
  const invitationId = usePathname().split('/').pop()

  // get invitation from supabase db
  // const user = useUser()
  // const [invitation, setInvitation] = useState()
  // useEffect(() => {
  //   supabase
  //     .from('Invitation')
  //     .select('*, Case(*), Lawyer(*)')
  //     .eq('id', invitationId)
  //     .single()
  //     .then(({ data, error }) => {
  //       console.log('invitation', data)
  //       setInvitation(data)
  //     })
  // }, [])

  if (!invitation) {
    return <p>Loading...</p>
  }

  return (
    <LawyerAppLayout>
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
              Your interview responses will not be shared with clients. We
              create space for you to be honest and transparent, such that we
              can match clients and attorneys with the best fit.
            </p>
            <p className="mt-3 text-sm md:ml-6 md:mt-0">
              <a
                href="#"
                className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
              >
                Details
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </div>
      <p>{invitation.title || 'TITLE'}</p>
      <p>
        Due in {Math.floor((invitation.dueBy - Date.now()) / (1000 * 60 * 60))}{' '}
        hours.
      </p>
      <div className="mt-8 flex flex-col space-y-4">
        {dummyInterview.map((interview, i) => (
          <div key={i}>
            <label
              htmlFor="comment"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {interview.question}
            </label>
            <div className="mt-2">
              <textarea
                rows={4}
                name="comment"
                id="comment"
                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex w-full flex-row justify-center gap-4">
        {/* <button
          type="button"
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Next
        </button> */}
        <button
          type="button"
          onClick={() => {
            console.log('open offer page')
          }}
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Send Offer
        </button>
      </div>
    </LawyerAppLayout>
  )
}
