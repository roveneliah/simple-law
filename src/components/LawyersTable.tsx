import { FALLBACK_AVATAR, dummyLawyers } from '@/data/dummy'
import { supabase } from '@/lib/supabaseClient'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

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

  console.log(realInvites)

  // sort the lawyers based on tag
  const sortedInvitations = useMemo(() => {
    const invitations: any = dummyLawyers(caseId)
    const sorted = invitations.sort((a: any, b: any) => {
      // tag rank: 1. 'Top Choice', 2. '', 3. 'Declined'
      if (a.tag === 'Top Choice') return -1
      if (b.tag === 'Top Choice') return 1
      if (a.tag === 'Declined') return 1
      if (b.tag === 'Declined') return -1
    })
    return sorted
  }, [caseId])

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
    <div>
      <div className="mb-4 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Our Choices for You
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            We interviewed 8 lawyers, and these are our top choices for you.
          </p>
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
      <ul role="list" className="divide-y divide-gray-100">
        {realInvites.map((invite: any, i: number) => (
          <Link
            key={i}
            href={`/app/cases/recommendations/${invite.Lawyer.id}/${invite.Lawyer.caseId}`}
          >
            <li
              key={invite.id}
              className={`-mx-3 flex cursor-pointer gap-x-4 rounded-sm px-3 py-5 hover:bg-gray-50`}
            >
              <div>
                <span className="relative inline-block h-12 w-12">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={invite.Lawyer.imageUrl || FALLBACK_AVATAR}
                    alt=""
                  />

                  {!invite.tag && (
                    <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
                  )}
                  {invite.tag === 'Shortlist' && (
                    <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-yellow-400 ring-2 ring-white" />
                  )}
                </span>
              </div>
              <div className="flex-auto">
                <div className="flex items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {invite.Lawyer.first} {invite.Lawyer.last}
                  </p>
                  <p className="flex-none text-xs text-gray-600">
                    {'[[invite.tag]]'}
                  </p>
                </div>
                <p className="mt-1 line-clamp-4 text-sm leading-6 text-gray-600">
                  {'[[invite.analysis]]'}
                </p>
              </div>
            </li>
          </Link>
        ))}
        <div className="mb-4  pt-8 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Our Choices for You
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              We interviewed 8 lawyers, and these are our top choices for you.
            </p>
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

        {sortedInvitations.map((lawyer: any, i: number) => (
          <Link
            key={i}
            href={`/app/cases/lawyers/${lawyer.id}/${lawyer.caseId}`}
          >
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
        ))}
      </ul>
    </div>
  )
}
