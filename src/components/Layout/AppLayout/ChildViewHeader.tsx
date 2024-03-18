'use client'
import Link from 'next/link'
import CaseSwitcherDropdown from './CaseSwitcherDropdown'
import AppMenu from './AppMenu'
import AccountMenu from '../LawyerAppLayout/AccountMenu'

export function ChildViewHeader({
  email,
  handleSignOut,
  userImageUrl,
  caseId,
  caseTitle,
}: any) {
  return (
    <div className="mb-8 flex w-full flex-row items-center justify-between">
      {/* <div className="w-1/3">
              <Link href={caseId ? `/app/cases/case/${caseId}` : '/app'}>
                <p className="text-xl font-extrabold">
                  IMPOSSIBLE
                  <span className="font-light text-gray-600">Law</span>
                </p>
              </Link>
            </div> */}
      {/* <div className="mt-1 w-1/3">
        <Link href={caseId ? `/app/cases/case/${caseId}` : '/app'}>
          <p className="text-xl font-bold tracking-tighter">impossible.</p>
        </Link>
      </div> */}
      <div className="flex h-min w-1/3 flex-row items-center justify-start">
        <p className="text-md text-center font-medium tracking-tighter text-gray-500">
          {caseTitle}
        </p>
      </div>
      {/* <div className="flex w-1/3 flex-row items-center justify-end gap-4 tracking-tighter">
        <div>
          <Link
            href="/app/cases"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
          >
            cases
          </Link>
        </div>
        <div>
          <Link
            href="/app/team"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
          >
            team
          </Link>
        </div>
      </div> */}
      {/* <div className="flex w-1/3 flex-row items-center justify-end gap-4">
        <AppMenu caseId={caseId} />
      </div> */}
      <div className="flex w-1/3 flex-row items-center justify-end gap-4">
        <Link href="/app/account">
          <img src={userImageUrl} className="h-10 w-10 rounded-full" />
        </Link>
      </div>
    </div>
  )
}
