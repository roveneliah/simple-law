import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCase } from '@/lib/useCase'
import CaseList from '../CaseList'
import { usePathname } from 'next/navigation'
import {
  DocumentDuplicateIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

export const navigation = (caseId, view) => [
  // {
  //   name: 'Home',
  //   href: '/app/feed',
  //   icon: HomeIcon,
  //   count: '5',
  //   current: false,
  // },
  {
    name: 'Case',
    href: '/app/cases/case/' + caseId,
    icon: InformationCircleIcon,
    current: view === 'Case' ? true : false,
  },
  {
    name: 'Documents',
    href: '/app/cases/case/' + caseId + '/documents',
    icon: DocumentDuplicateIcon,
    current: view === 'Documents' ? true : false,
  },
  {
    name: 'Services',
    href: '/app/cases/services/' + caseId,
    icon: ShoppingBagIcon,
    current: view === 'Services' ? true : false,
  },
  {
    name: 'Lawyer',
    href: '/app/cases/lawyers/' + caseId,
    icon: UsersIcon,
    current: view === 'Lawyer' ? true : false,
  },
  {
    name: 'Workspace',
    href: '/app/cases/workspace/' + caseId,
    icon: UsersIcon,
    current: view === 'Workspace' ? true : false,
  },
  // {
  //   name: 'Questions',
  //   href: '#',
  //   icon: FolderIcon,
  //   count: '12',
  //   current: false,
  // },
  // { name: 'Notes', href: '#', icon: ChartPieIcon, current: false },
  {
    name: 'Lawyers',
    href: '/app/lawyers',
    icon: UsersIcon,
    count: '20+',
    current: false,
  },
  // {
  //   name: 'Help',
  //   href: '#',
  //   icon: ChatBubbleOvalLeftEllipsisIcon,
  //   current: false,
  // },
]

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ caseId }) {
  const caseData = useCase(caseId)
  const [showCases, setShowCases] = useState(true)

  useEffect(() => {
    if (!caseId) setShowCases(true)
    else if (caseData) setShowCases(false)
  }, [caseId, caseData])

  const pathname = usePathname().split('/')
  const view = pathname.includes('services')
    ? 'Services'
    : pathname.includes('documents')
      ? 'Documents'
      : pathname.includes('lawyers')
        ? 'Lawyer'
        : pathname.includes('workspace')
          ? 'Workspace'
          : pathname.includes('case')
            ? 'Case'
            : ''

  if (showCases)
    return (
      <div className="flex min-w-64 max-w-xl flex-col gap-y-5 overflow-y-auto border-r border-purple-100 bg-gray-50 px-6">
        <div className="mt-8">
          <p className="text-lg font-extrabold">
            IMPOSSIBLE<span className="font-light text-gray-600">Law</span>
          </p>
        </div>
        <CaseList />
      </div>
    )

  return (
    <div className="flex min-w-64 max-w-xl flex-col gap-y-5 overflow-y-auto border-r border-purple-100 bg-gray-50">
      {/* <div className="mt-8 px-6">
              <Link href={'/app/cases'}>
                <p className="text-lg font-extrabold">
                  IMPOSSIBLE<span className="font-light text-gray-600">Law</span>
                </p>
              </Link>
            </div> */}

      <nav className="flex flex-1 flex-col px-6">
        <div className="-mx-2 mt-8 flex w-full flex-row items-center justify-between rounded-lg border px-4 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-black">
          <h3 className="mb-0 w-full text-center text-sm font-medium">
            {caseData?.title}
          </h3>
          {/* <Link
              href={`/app/cases/case/${caseId}/settings`}
              className="rounded-lg p-1.5 hover:bg-gray-200"
            >
              <Cog6ToothIcon
                className={classNames(' ', 'h-4 w-4 shrink-0')}
                aria-hidden="true"
              />
            </Link> */}
        </div>
        <div className="mt-8" />
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation(caseId, view).map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-100 font-semibold text-black'
                        : 'font-medium text-gray-600 hover:bg-gray-100 hover:text-black',
                      'group flex items-center justify-start gap-x-3 rounded-md p-2 text-sm leading-6',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-black' : 'text-gray-600',
                        'h-4 w-4 shrink-0',
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                    {/* {item.count ? (
                  <span
                    className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                    aria-hidden="true"
                  >
                    {item.count}
                  </span>
                ) : null} */}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
