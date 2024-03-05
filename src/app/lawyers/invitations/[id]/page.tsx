'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { UUID } from 'crypto'
import Link from 'next/link'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { hoursLeft, hoursLeftStr } from '../page'
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

export default function InvitationsView({ params: { id } }) {
  const invitationId = id
  const [invitationIds, setInvitationIds] = useState([])
  const router = useRouter()
  const [view, setView] = useState('invitation')

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

  const declineInvitation = async (id: UUID) => {
    // mark invitation as declined
    const { data, error } = await supabase
      .from('Invitation')
      .update({ status: 'declined' })
      .eq('id', id)
      .single()

    console.log({ data, error })

    // router.push(nextIndexLink)
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

  return (
    <LawyerAppLayout>
      {/* {hoursLeft(invitation?.dueBy) > 0 ? (
        <p>{hoursLeftStr(invitation.dueBy)} to accept.</p>
      ) : (
        <p className="text-2xl font-bold tracking-tighter text-gray-900">
          EXPIRED
        </p>
      )} */}
      {/* <p>{invitation.status}</p> */}
      <div className="flex flex-row gap-1">
        <p className="text-xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-700">
          Litigation
        </p>
        <p className="font-bold">.</p>
        <p className="text-xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-700">
          $50,000 Dispute
        </p>
        <p className="font-bold">.</p>
        <p className="text-xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-700">
          $5,000 Estimate
        </p>
      </div>
      <h3 className="text-5xl font-bold tracking-tighter">
        {invitation.Case.title}
      </h3>

      {invitation.status === 'pending' && (
        <div className="flex flex-row gap-2 text-4xl">
          <Link
            href={`/lawyers/invitations/accept/${invitationId}`}
            className="font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-700"
          >
            Accept
          </Link>

          <p
            onClick={() => declineInvitation(invitationId)}
            className="font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-700"
          >
            Decline
          </p>

          <Link href={nextIndexLink}>
            <p className="font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-700">
              Skip
            </p>
          </Link>
        </div>
      )}

      <div className="mt-16 flex w-full flex-row justify-start gap-16">
        <div className="flex flex-col items-start text-left font-semibold">
          <button
            type="button"
            onClick={() => setView('invitation')}
            className={`mt-1 text-left text-sm leading-6 ${view === 'invitation' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
          >
            Invitation
          </button>
          <button
            type="button"
            onClick={() => setView('analysis')}
            className={`mt-1 text-left text-sm leading-6 ${view === 'analysis' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
          >
            Analysis
          </button>
          <button
            type="button"
            onClick={() => setView('review')}
            className={`mt-1 text-left text-sm leading-6 ${view === 'review' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
          >
            Review
          </button>
        </div>
        <div className="w-full">
          {view === 'invitation' && (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tighter text-gray-900">
                  Invitation
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  asdfasdfsa
                </p>
              </div>
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="text-md font-medium leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-3xl">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl">{children}</h2>
                  ),
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
          )}
          {view === 'analysis' && (
            <div className="w-full">
              <div className="mb-8 w-full">
                <h3 className="text-2xl font-bold tracking-tighter text-gray-900">
                  Analysis
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  asdfasdfsa
                </p>
              </div>
            </div>
          )}
          {view === 'review' && (
            <div className="w-full">
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tighter text-gray-900">
                  Review
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  asdfasdfsa
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* render created at as readable date */}
      {/* <div className="mt-8 flex w-full flex-row justify-center gap-4">
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
      </div> */}
    </LawyerAppLayout>
  )
}
