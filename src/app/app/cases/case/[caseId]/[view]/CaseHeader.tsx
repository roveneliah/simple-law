'use client'
import Link from 'next/link'
import clsx from 'clsx'

export function CaseHeader({ title, caseId, view }) {
  return (
    <div className="">
      <div className="">
        {/* <button className="text-md font-bold tracking-tighter text-gray-500 transition-colors hover:text-gray-600">
           Back to Cases
          </button> */}
        <h1 className="text-5xl font-bold tracking-tighter text-gray-900">
          {title}
        </h1>
      </div>
      <div className="flex w-full flex-row gap-2">
        {/* <Link
              href={`/app/cases/assessment/${caseId}`}
              className={clsx(
                view === 'assessment' ? 'text-gray-900' : 'text-gray-500',
                `text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-600 `,
              )}
            >
              Assessment
            </Link> */}
        <Link
          href={`/app/cases/${caseId}`}
          className={clsx(
            view === 'home' ? 'text-gray-900' : 'text-gray-500',
            `text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-600 `,
          )}
        >
          Home
        </Link>

        <Link
          href={`/app/cases/case/${caseId}`}
          className={clsx(
            view === 'details' ? 'text-gray-900' : 'text-gray-500',
            `text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-600 `,
          )}
        >
          Case Details
        </Link>

        <Link
          href={`/app/cases/team/${caseId}`}
          className={clsx(
            view === 'team' ? 'text-gray-900' : 'text-gray-500',
            `text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-600 `,
          )}
        >
          My Team
        </Link>
        {/* <Link
          href={`/app/store/${caseId}`}
          className={clsx(
            view === 'find-lawyer' ? 'text-gray-900' : 'text-gray-500',
            `text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-600 `,
          )}
        >
          Find a Lawyer
        </Link> */}
      </div>
    </div>
  )
}
