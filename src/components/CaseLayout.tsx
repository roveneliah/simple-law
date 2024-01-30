'use client'

import Link from 'next/link'
import { withCaseData } from './withCaseData'
import { CaseSwitcherDropdown } from './Layout/CaseSwitcherDropdown'

const BASE_URL = '/app/cases/'
const tabs = (id: string | number) =>
  [
    { name: 'Status', href: 'status' },
    { name: 'Case Info', href: 'case' },
    { name: 'Lawyers', href: 'lawyers' },
    // { name: 'Chat', href: 'chat' },
    // { name: 'Learn', href: 'learn' },
    { name: 'Help', href: 'help' },
  ].map((tab) => {
    return {
      ...tab,
      href: BASE_URL + tab.href + '/' + id,
    }
  })

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function CaseLayout({ children, viewName, caseData }: any) {
  return (
    <div className="mt-0">
      <div className="border-b border-gray-200">
        <div className="sm:flex sm:items-baseline">
          {/* <h3 className="text-base font-semibold leading-6 text-gray-900">
            {caseData?.name}
          </h3> */}
          <div className="mt-4 sm:mt-0">
            <nav className="-mb-px flex flex-row items-baseline justify-start space-x-8">
              {tabs(caseData.id).map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.name === viewName
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 transition-all hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
                  )}
                  // aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </Link>
              ))}
              <CaseSwitcherDropdown />
            </nav>
          </div>
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  )
}

export default withCaseData(CaseLayout)
