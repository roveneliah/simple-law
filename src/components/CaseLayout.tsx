'use client'

import Link from 'next/link'
import { withCaseData } from './withCaseData'

const BASE_URL = '/app/cases/'
const tabs = (id) =>
  [
    { name: 'Case', href: 'case' },
    { name: 'Documents', href: 'docs' },
    { name: 'Chat', href: 'chat' },
    { name: 'Learn', href: 'learn' },
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
    <div className="mx-4 mt-8">
      <div className="border-b border-gray-200">
        <div className="sm:flex sm:items-baseline">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {caseData?.name}
          </h3>
          <div className="mt-4 sm:ml-10 sm:mt-0">
            <nav className="-mb-px flex space-x-8">
              {tabs(caseData.id).map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.name === viewName
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default withCaseData(CaseLayout)
