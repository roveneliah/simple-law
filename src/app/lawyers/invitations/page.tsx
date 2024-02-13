'use client'
import LawyerViewLayout from '@/components/LawyerViewLayout'
import AppLayout from '@/components/Layout/AppLayout'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { FALLBACK_AVATAR } from '@/data/dummy'
import { useLawyerUser } from '@/lib/useUser'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Invitation } from '@prisma/client'
import { UUID } from 'crypto'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function InvitationsList({}) {
  const lawyer = useLawyerUser()

  const [invitations, setInvitations] = useState<Invitation[]>([])
  useEffect(() => {
    setInvitations(lawyer?.Invitation || [])
  }, [lawyer?.Invitation])

  console.log('invitations', invitations)

  console.log(invitations)
  return (
    <div className="flex flex-col gap-4">
      <ul role="list" className="divide-y divide-gray-100">
        {invitations.map((invitation, i) => (
          <Link href={`/lawyers/invitations/${invitation.id}`} key={i}>
            <li
              key={invitation.id}
              className="relative flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={invitation.Case.User.imageUrl || FALLBACK_AVATAR}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={invitation.href}>
                      <span className="absolute  inset-x-0 -top-px bottom-0" />
                      <p className="relative truncate pr-2">
                        {invitation.comment}
                      </p>
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <p className="relative truncate">{invitation.comment}</p>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {invitation.role}
                  </p>
                  {invitation.lastSeen ? (
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Last seen{' '}
                      <time dateTime={invitation.lastSeenDateTime}>
                        {invitation.lastSeen}
                      </time>
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">8 hrs.</p>
                    </div>
                  )}
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default function InvitationsView() {
  return (
    <LawyerAppLayout>
      <LawyerViewLayout viewName="Invitations">
        <form>
          <div className="mt-8 space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Invitations
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                We've screened out the best cases for you. Check them out and
                let us know if you're interested.
              </p>
            </div>
          </div>
        </form>
        <div className="mt-8">
          <InvitationsList />
        </div>
      </LawyerViewLayout>
    </LawyerAppLayout>
  )
}
