'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { UUID } from 'crypto'
import Link from 'next/link'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { hoursLeftStr } from '../page'
import remarkGfm from 'remark-gfm'
import rehypeReact from 'rehype-react'
import SyntaxHighlighter from 'react-syntax-highlighter'

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

async function fetchInvitationIds() {
  const { data, error } = await supabase
    .from('Invitation')
    .select('id')
    .order('dueBy', { ascending: true }) // Optionally, order by creation date or other criteria

  return { data: data?.map((invitation) => invitation.id), error }
}

function AcceptedView() {
  return (
    <LawyerAppLayout>
      <div className="mt-8 flex flex-col items-center">
        <FaceSmileIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
        <h2 className="mt-6 text-2xl font-semibold leading-6 text-gray-900">
          Invitation Accepted
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          We'll notify the case owner and get back to you soon.
        </p>
      </div>
    </LawyerAppLayout>
  )
}

export default function InvitationsView() {
  const invitationId = usePathname().split('/').pop()
  const [invitationIds, setInvitationIds] = useState([])
  const router = useRouter()

  useEffect(() => {
    const loadInvitations = async () => {
      const { data: ids, error } = await fetchInvitationIds() // Assume this function fetches IDs
      console.log(ids, error)
      setInvitationIds(ids)
    }

    loadInvitations()
  }, [])

  const currentIndex = invitationIds?.indexOf(invitationId)
  const nextIndex = currentIndex + 1
  const nextId = invitationIds?.[nextIndex]
  const nextIndexLink = nextId
    ? `/lawyers/invitations/${nextId}`
    : '/lawyers/invitations'

  const declineInvitation = async (id: UUID, response = null) => {
    // mark invitation as declined
    const { data, error } = await supabase
      .from('Invitation')
      .update({ status: 'declined', response })
      .eq('id', id)
      .single()

    router.push(nextIndexLink)
  }

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

  if (!invitation) {
    return <p>Loading...</p>
  }

  // if (invitation.status === 'accepted') {
  //   return <AcceptedView />
  // }

  console.log(invitation.comment)

  return (
    <LawyerAppLayout>
      <p>{hoursLeftStr(invitation.dueBy)} to accept.</p>
      {/* <p>{invitation.status}</p> */}
      <div className="mt-4">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="mt-4">{children}</p>,
            h3: ({ children }) => <h3 className="text-xl">{children}</h3>,
            li: ({ children }) => <li className="">{children}</li>,
            ul: ({ children }) => (
              <ul className="list-disc pl-7">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-8">{children}</ol>
            ),
          }}
          children={invitation.comment}
        />
      </div>
      {/* render created at as readable date */}
      <div className="mt-8 flex w-full flex-row justify-center gap-4">
        <button
          type="button"
          onClick={() => declineInvitation(invitationId)}
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Decline
        </button>
        <Link
          href={nextIndexLink}
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Skip
        </Link>
        <Link
          href={`/lawyers/invitations/accept/${invitationId}`}
          className="h-fit text-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
        >
          Accept Lead
        </Link>
      </div>
    </LawyerAppLayout>
  )
}
