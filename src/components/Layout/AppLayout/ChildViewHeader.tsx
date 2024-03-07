'use client'
import Link from 'next/link'
import CaseSwitcherDropdown from './CaseSwitcherDropdown'

export function ChildViewHeader({
  email,
  handleSignOut,
  userImageUrl,
  caseId,
}: any) {
  return (
    <div className="mb-4 mt-4 flex w-full flex-row items-center justify-between pb-4">
      {/* <div className="w-1/3">
              <Link href={caseId ? `/app/cases/case/${caseId}` : '/app'}>
                <p className="text-xl font-extrabold">
                  IMPOSSIBLE
                  <span className="font-light text-gray-600">Law</span>
                </p>
              </Link>
            </div> */}
      <div className="mt-1 w-1/3">
        <Link href={caseId ? `/app/cases/case/${caseId}` : '/app'}>
          <p className="text-xl font-bold tracking-tighter">impossible.</p>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-end gap-4 tracking-tighter">
        {/* <div>
              <Link
                href="/app/cases"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
              >
                cases
              </Link>
            </div> */}
        {/* <div>
              <Link
                href="/app/advisors"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
              >
                advisors
              </Link>
            </div> */}
        <CaseSwitcherDropdown caseId={caseId} />
        {/* <AppMenu /> */}
        <div>
          <Link
            href="/app/account"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
          >
            <img
              src={userImageUrl}
              alt=""
              className="mt-2 h-10 w-10 rounded-full bg-blue-100 p-0.5"
            />
          </Link>
        </div>
        {/* <div>
              <AccountMenu
                userImageUrl={userImageUrl}
                email={email}
                handleSignOut={handleSignOut}
              />
            </div> */}
      </div>
    </div>
  )
}
