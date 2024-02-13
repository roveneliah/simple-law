'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import {
  InformationCircleIcon,
  PhotoIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
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

export default function OffersView() {
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

  console.log(invitation)

  const handleSubmit = (e: Event) => {
    console.log('accepting offer')
  }

  return (
    <LawyerAppLayout>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Due in{' '}
              {Math.floor((invitation.dueBy - Date.now()) / (1000 * 60 * 60))}{' '}
              hours.
            </p>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {invitation.title || 'Missing Title'}
            </h2>
            <p>
              Client hit by car, looking for representation to pursue damages.
              No previous legal experience, prioritizes good communication and
              trust with attorney.
            </p>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Services
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              What services would you like to offer this lead?
            </p>

            <div className="space-y-10">
              <fieldset>
                {/* <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend> */}
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Quick Consult
                      </label>
                      <p className="text-gray-500">
                        No retainer quick consultation. Pay per session.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        1 Month Strategic Advisory
                      </label>
                      <p className="text-gray-500">
                        Retained advisory services.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        1 Month Strategic Advisory
                      </label>
                      <p className="text-gray-500">
                        Retained advisory services.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Attorney
                      </label>
                      <p className="text-gray-500">
                        Formal attorney relationship for ongoing matter.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Agreements
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Select any guarantees you offer.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Free Weekly Updates
                      </label>
                      <p className="text-gray-500">
                        Weekly update on case and answers to any questions that
                        emerge.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Guarantee 2
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Guarantee 3
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Introduction
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              We will let the client know why you're a great fit. Feel free to
              leave a friendly note.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send Offer
          </button>
        </div>
      </form>
    </LawyerAppLayout>
  )
}
