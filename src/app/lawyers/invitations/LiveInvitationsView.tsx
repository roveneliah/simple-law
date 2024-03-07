'use client'
import { FALLBACK_AVATAR } from '@/data/dummy'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { hoursLeftStr } from './hoursLeftStr'
import { useState } from 'react'

export function LiveInvitationsView2({ liveInvitations }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentInvitation = liveInvitations[currentIndex]

  function handleAccept() {
    // TODO: Implement accept logic
    setCurrentIndex(currentIndex + 1)
  }

  function handleReject() {
    // TODO: Implement reject logic
    setCurrentIndex(currentIndex + 1)
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      {currentInvitation ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={currentInvitation.Case.User.imageUrl || FALLBACK_AVATAR}
              alt=""
            />
            <div>
              <h2 className="text-xl font-semibold leading-6 text-gray-900">
                {currentInvitation.Case.title}
              </h2>
              <p className="text-sm text-gray-500">
                Client: {currentInvitation.Case.User.name}
              </p>
            </div>
          </div>
          <p className="text-gray-600">{currentInvitation.Case.summary}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <p>Due: {currentInvitation.dueBy}</p>
            <p>{hoursLeftStr(currentInvitation.dueBy)} left</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleReject}
              className="flex-1 rounded-lg bg-red-100 py-3 text-red-600 transition hover:bg-red-200"
            >
              <XMarkIcon className="mx-auto h-6 w-6" />
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 rounded-lg bg-green-100 py-3 text-green-600 transition hover:bg-green-200"
            >
              <CheckIcon className="mx-auto h-6 w-6" />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No new invitations</p>
      )}

      <div className="flex w-full justify-between">
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex === liveInvitations.length - 1}
          className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export function LiveInvitationsView({ liveInvitations }) {
  return (
    <ul
      role="list"
      className="flex max-w-2xl flex-col divide-y divide-gray-100"
    >
      {liveInvitations.map((invitation, i) => (
        <Link href={`/lawyers/invitations/${invitation.id}`} key={i}>
          <li className="relative flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={invitation.Case.User.imageUrl || FALLBACK_AVATAR}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  <a href={invitation.href}>
                    <span className="absolute  inset-x-0 -top-px bottom-0" />
                    <p className="relative truncate pr-2">
                      {invitation.comment}
                    </p>
                  </a>
                </div>
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
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">
                      {hoursLeftStr(invitation?.dueBy)}
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
  )
}
