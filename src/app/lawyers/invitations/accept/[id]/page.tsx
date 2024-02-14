'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import {
  InformationCircleIcon,
  PhotoIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { UUID } from 'crypto'
import Link from 'next/link'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const invitation = {
  title: 'Personal Injury, $200000, San Diego, CA',
  dueBy: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000),
  Case: {
    title: 'Personal Injury, $200000, San Diego, CA',
  },
  summary:
    'Client hit by car, looking for representation to pursue damages.  No previous legal experience, prioritizes good communication and trust with attorney.',
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

  const router = useRouter()
  const acceptLead = async (id: UUID) => {
    console.log('accepting offer')
    const { data, error } = await supabase
      .from('Invitation')
      .update({ status: 'accepted' })
      .eq('id', id)
      .single()

    router.push(`/lawyers/invitations/${invitationId}`)
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
            <p>{invitation.summary}</p>
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
              ImpossibleLaw Partner Agreements
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Please reaffirm your commitment to these agreements.
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
                        I agree to provide weekly updates.
                      </label>
                      <p className="text-gray-500">
                        No retainer quick consultation. Pay per session.
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
                        I agree to not charge clients for any expenses.
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
            onClick={() => acceptLead(invitationId)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send Offer
          </button>
        </div>
      </form>
    </LawyerAppLayout>
  )
}
