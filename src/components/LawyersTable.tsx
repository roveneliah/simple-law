import { useInvitation } from '@/app/app/cases/recommendations/[invitationId]/page'
import { FALLBACK_AVATAR, dummyLawyers } from '@/data/dummy'
import { supabase } from '@/lib/supabaseClient'
import { useCase } from '@/lib/useCase'
import { Dialog } from '@headlessui/react'
import {
  FaceSmileIcon,
  InformationCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import BookingDialog from './BookingDialog'

export default function LawyersTable({ caseId }) {
  const [loading, setLoading] = useState(true)
  const [realInvites, setRealInvites] = useState([])
  useEffect(() => {
    const loadInvitations = async () =>
      await supabase
        .from('Invitation')
        .select('*, Lawyer(*), Case(*)')
        .eq('caseId', caseId)
        .eq('status', 'accepted')

    caseId &&
      loadInvitations()
        .then(({ data, error }) => {
          setRealInvites(data)
        })
        .finally(() => setLoading(false))
  }, [caseId])

  const caseData = useCase(caseId)
  const invitations = caseData?.Invitation

  const [lawyerDialogOpen, setLawyerDialogOpen] = useState(false)

  // sort the lawyers based on tag
  const sortedInvitations = useMemo(() => {
    if (!invitations) return
    const sorted = invitations?.sort((a: any, b: any) => {
      // tag rank: 1. 'Top Choice', 2. '', 3. 'Declined'
      if (a.favorite === true) return -1
      if (b.favorite === true) return 1
      if (a.rejected === true) return 1
      if (b.rejected === true) return -1
    })
    return sorted
  }, [invitations])

  if (loading) {
    return (
      <div className="mt-8 flex flex-col items-center">
        <FaceSmileIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
        <h2 className="mt-6 text-2xl font-semibold leading-6 text-gray-900">
          Loading Offers...
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Our robots must be sleeping on the job.
        </p>
      </div>
    )
  }

  return (
    <div className="">
      <ul role="list" className="divide-y divide-gray-100">
        <div className="mb-4 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="flex flex-row items-center gap-2 text-3xl  font-bold leading-6 text-gray-900">
              Our Choices for You
            </h1>
            {invitations?.length > 1 ? (
              <p className="mt-2 text-lg text-gray-700">
                We interviewed {invitations.length} lawyers , and these are our
                top choices for you.
              </p>
            ) : (
              <p className="mt-2 text-lg text-gray-700">
                Here is our top choice for you.
              </p>
            )}
          </div>

          {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div> */}
        </div>
        {!invitations && (
          <div>
            <div className="h-24 w-full animate-pulse rounded-md bg-gray-300"></div>
          </div>
        )}
        {sortedInvitations?.map((invitation: any, i: number) => (
          // <Link key={i} href={`/app/cases/lawyers/book/${invitation.id}`}>
          <button
            key={i}
            onClick={() => setLawyerDialogOpen(true)}
            className="w-full"
          >
            <li
              key={invitation.id}
              className={`flex cursor-pointer gap-x-4 rounded-sm px-0 py-5 hover:bg-gray-50/10`}
            >
              <div>
                <span className="relative inline-block h-12 w-12">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={invitation.Lawyer?.imageUrl || FALLBACK_AVATAR}
                    alt=""
                  />
                </span>
              </div>
              <BookingDialog
                invitation={invitation}
                open={lawyerDialogOpen}
                setOpen={setLawyerDialogOpen}
              />
              <div className="flex-auto">
                <div className="flex items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {invitation.Lawyer?.first} {invitation.Lawyer?.last}
                  </p>
                  <p className="flex-none text-xs text-gray-600">
                    {invitation.rejected
                      ? 'Rejected'
                      : invitation.favorite
                        ? 'Top Choice'
                        : ''}
                  </p>
                </div>
                <p className="mt-1 line-clamp-4 text-sm leading-6 text-gray-600">
                  {invitation.lawyerComment}
                </p>
              </div>
            </li>
            {/* </Link> */}
          </button>
        ))}
        {/* {sortedInvitations.map((lawyer: any, i: number) => (
          <Link key={i} href={`/app/cases/recommendations/${lawyer.id}/`}>
            <li
              key={lawyer.id}
              className={`-mx-3 flex cursor-pointer gap-x-4 rounded-sm px-3 py-5 hover:bg-gray-50`}
            >
              <div>
                <span className="relative inline-block h-12 w-12">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={lawyer.imageUrl}
                    alt=""
                  />

                  {!lawyer.tag && (
                    <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
                  )}
                  {lawyer.tag === 'Shortlist' && (
                    <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-yellow-400 ring-2 ring-white" />
                  )}
                </span>
              </div>
              <div className="flex-auto">
                <div className="flex items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {lawyer.name}
                  </p>
                  <p className="flex-none text-xs text-gray-600">
                    {lawyer.tag}
                  </p>
                </div>
                <p className="mt-1 line-clamp-4 text-sm leading-6 text-gray-600">
                  {lawyer.content}
                </p>
              </div>
            </li>
          </Link>
        ))} */}
      </ul>
    </div>
  )
}
