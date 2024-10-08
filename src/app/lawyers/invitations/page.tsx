'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout/LawyerAppLayout'
import { FALLBACK_AVATAR } from '@/data/dummy'
import { useLawyerUser } from '@/lib/useUser'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Invitation } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { partition } from 'ramda'
import {
  LiveInvitationsView,
  LiveInvitationsView2,
} from './LiveInvitationsView'
import Prototype from '@/components/Design/Prototype'
import { hoursLeft } from './hoursLeft'

function InvitationsList({}) {
  const lawyer = useLawyerUser()

  const [invitations, setInvitations] = useState<Invitation[]>([])
  useEffect(() => {
    setInvitations(lawyer?.Invitation || [])
  }, [lawyer?.Invitation])

  const acceptedInvitations = useMemo(() => {
    return invitations.filter((invitation) => invitation.status === 'accepted')
  }, [invitations])
  const [liveInvitations, expired] = partition(
    (invitation: any) => hoursLeft(invitation?.dueBy) > 0,
  )(invitations.filter((invitation) => invitation.status !== 'accepted'))

  const createDummyInvitation = () => {
    fetch('/api/invitations/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caseId: 'b2d09d4f-175a-49ef-85a8-413608318e16',
      }),
    })
  }

  const [subview, setSubview] = useState('live')
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex flex-row items-start gap-2 text-2xl font-bold">
          <button
            onClick={() => setSubview('live')}
            className={`tracking-tighter ${subview === 'live' ? 'text-gray-900' : 'text-gray-500'}`}
          >
            New
          </button>
          <button
            onClick={() => setSubview('accepted')}
            className={`tracking-tighter ${subview === 'accepted' ? 'text-gray-900' : 'text-gray-500'}`}
          >
            Accepted
          </button>
          {/* <button
            onClick={() => setSubview('expired')}
            className={`tracking-tighter ${subview === 'expired' ? 'text-gray-900' : 'text-gray-500'}`}
          >
            Expired
          </button> */}
          {/* <button
            onClick={() => setSubview('matched')}
            className={`tracking-tighter ${subview === 'matched' ? 'text-gray-900' : 'text-gray-500'}`}
          >
            Matched
          </button> */}
        </div>
        <h1 className="h1">Invitations</h1>
        {/* <button
          onClick={() => createDummyInvitation()}
          className="text-lg font-semibold text-gray-600"
        >
          Create Dummy Invitation
        </button> */}
      </div>
      <div className="mt-8 flex flex-row justify-between gap-4">
        <div className="w-full">
          {subview === 'live' && (
            <Prototype>
              <LiveInvitationsView liveInvitations={liveInvitations} />
              <LiveInvitationsView2 liveInvitations={liveInvitations} />
            </Prototype>
          )}
          {subview === 'expired' && (
            <ul role="list" className="flex flex-col divide-y divide-gray-100">
              {expired.map((invitation, i) => (
                <Link href={`/lawyers/invitations/${invitation.id}`} key={i}>
                  <li className="flex justify-between gap-x-6 py-5 ">
                    <div className="flex gap-x-4">
                      <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        src={invitation.Case.User.imageUrl || FALLBACK_AVATAR}
                        alt=""
                      />
                      <div className="flex min-w-0 flex-auto flex-col">
                        <div className="text-sm font-semibold leading-6 text-gray-900">
                          <a href={invitation.href}>
                            {/* <span className="absolute inset-x-0 -top-px bottom-0" /> */}
                            <p className="line-clamp-1 pr-2">
                              {invitation.Case.goals}
                            </p>
                          </a>
                        </div>
                        <p className="mt-1 flex text-xs leading-5 text-gray-500">
                          <p className="line-clamp-2">{invitation.comment}</p>
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {invitation.role}
                        </p>
                        {invitation.status === 'declined' && (
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Declined{' '}
                            <time dateTime={invitation.lastSeenDateTime}>
                              {invitation.lastSeen}
                            </time>
                          </p>
                        )}
                        {invitation.status === 'accepted' && (
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Accepted{' '}
                            <time dateTime={invitation.lastSeenDateTime}>
                              {invitation.lastSeen}
                            </time>
                          </p>
                        )}
                        {invitation.dueBy && (
                          <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-orange-500/20 p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">
                              Expired
                            </p>
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
          )}
          {subview === 'accepted' && (
            <ul role="list" className="flex flex-col divide-y divide-gray-100">
              {acceptedInvitations.map((invitation, i) => (
                <Link href={`/lawyers/invitations/${invitation.id}`} key={i}>
                  <li className="flex justify-between gap-x-6 py-5 ">
                    <div className="flex gap-x-4">
                      <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        src={invitation.Case.User.imageUrl || FALLBACK_AVATAR}
                        alt=""
                      />
                      <div className="flex min-w-0 flex-auto flex-col">
                        <div className="text-sm font-semibold leading-6 text-gray-900">
                          <a href={invitation.href}>
                            {/* <span className="absolute inset-x-0 -top-px bottom-0" /> */}
                            <p className="line-clamp-1 pr-2">
                              {invitation.Case.goals}
                            </p>
                          </a>
                        </div>
                        <p className="mt-1 flex text-xs leading-5 text-gray-500">
                          <p className="line-clamp-2">{invitation.comment}</p>
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {invitation.role}
                        </p>
                        {invitation.status === 'declined' && (
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Declined{' '}
                            <time dateTime={invitation.lastSeenDateTime}>
                              {invitation.lastSeen}
                            </time>
                          </p>
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
          )}
        </div>
        {/* <div className="flex w-1/3 flex-col items-start text-lg font-semibold text-gray-600">
          <button className={``}>{'-->'} Accept</button>
          <button className={``}>{'-->'} Reject</button>
          <button className={``}>{'-->'} Skip</button>
        </div> */}
      </div>
    </div>
  )
}

export default function InvitationsView() {
  return (
    <LawyerAppLayout>
      <div className="mt-8"></div>
      <InvitationsList />
    </LawyerAppLayout>
  )
}
