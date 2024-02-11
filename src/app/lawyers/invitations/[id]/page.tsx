'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  const [invitation, setInvitation] = useState()
  useEffect(() => {
    invitationId &&
      supabase
        .from('Invitation')
        .select('*, Case(*), Lawyer(*)')
        .eq('id', invitationId)
        .single()
        .then(({ data, error }) => {
          console.log('invitation', data)
          setInvitation(data)
        })
  }, [invitationId])

  console.log('invitation', invitation)
  console.log(invitationId)

  if (!invitation) {
    return <p>Loading...</p>
  }

  return (
    <LawyerAppLayout>
      <p>{invitation.Case.title || 'TITLE'}</p>
      <p>{invitation.interviewBy || 'Interview by 2/14/24 @ 3pm'}</p>
      {/* <p>{invitation.status}</p> */}
      <div className="mt-4">
        <p>{invitation.comment}</p>
      </div>
      {/* render created at as readable date */}
      <div className="mt-8 flex w-full flex-row justify-center gap-4">
        <button
          type="button"
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Decline
        </button>
        <button
          type="button"
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Next
        </button>
        <Link
          href={`/lawyers/invitations/interview/${invitationId}`}
          className="h-fit text-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
        >
          Get Started
        </Link>
      </div>
    </LawyerAppLayout>
  )
}
