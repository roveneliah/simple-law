import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCase } from '@/lib/useCase'
import CaseList from '../../CaseList'
import { usePathname } from 'next/navigation'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import CaseSwitcherDropdown from '../AppLayout/CaseSwitcherDropdown'
import { useUser } from '@/lib/useUser'
import clsx from 'clsx'
import AppMenu from '../AppLayout/AppMenu'

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
    name: 'Timeline',
    href: '/app/cases/case/' + caseId,
    icon: ClockIcon,
    current: view === 'Documents' ? true : false,
  },
  // {
  //   name: 'Services',
  //   href: '/app/cases/store/' + caseId,
  //   icon: ShoppingBagIcon,
  //   current: view === 'Services' ? true : false,
  // },
  // {
  //   name: 'Lawyers',
  //   href: '/app/cases/lawyers/' + caseId,
  //   icon: UsersIcon,
  //   current: view === 'Lawyer' ? true : false,
  // },
  // {
  //   name: 'Workspace',
  //   href: '/app/cases/workspace/' + caseId,
  //   icon: UsersIcon,
  //   current: view === 'Workspace' ? true : false,
  // },
  // {
  //   name: 'Questions',
  //   href: '#',
  //   icon: FolderIcon,
  //   count: '12',
  //   current: false,
  // },
  // { name: 'Notes', href: '#', icon: ChartPieIcon, current: false },
  // {
  //   name: 'Lawyers',
  //   href: '/app/lawyers/' + caseId,
  //   icon: UsersIcon,
  //   count: '20+',
  //   current: false,
  // },
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

const teams = [
  {
    id: 3,
    name: 'Find a Lawyer',
    href: '/app/store/v1/interview',
    initial: 'Ai',
    current: false,
  },
  {
    id: 1,
    name: 'Sanity Check',
    href: '/app/store/v1/sanity',
    initial: 'Sa',
    current: false,
  },
  {
    id: 2,
    name: 'Shotgun Strategy',
    href: '/app/store/v1/shotgun',
    initial: 'Sh',
    current: false,
  },
]

export default function Sidebar({ caseId }) {
  const caseData = useCase(caseId)
  const user = useUser()
  const caseList = user?.Case

  console.log(user, caseList)

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

  const [isOpen, setIsOpen] = useState(true)
  const handleToggleSidebar = () => {
    console.log('toggle sidebar')
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div
        className={`absolute ${isOpen ? 'left-56' : 'left-4'} top-1/2 z-40 pl-4 transition-all`}
      >
        <button onClick={handleToggleSidebar}>
          {!isOpen ? (
            <ChevronRightIcon className="h-5 w-4" />
          ) : (
            <ChevronLeftIcon className="h-5 w-4" />
          )}
        </button>
      </div>

      <div
        className={`min-w-56 max-w-xl ${isOpen ? 'flex' : 'hidden'}  flex-col gap-y-5 overflow-y-auto border-r border-purple-100 bg-gray-50`}
      >
        {/* <div className="mt-8 px-6">
              <Link href={'/app/cases'}>
                <p className="text-lg font-extrabold">
                  IMPOSSIBLE<span className="font-light text-gray-600">Law</span>
                </p>
              </Link>
            </div> */}

        <nav className="w-full flex-1 flex-col px-6">
          {/* {caseId && (
            <div className="mt-4 flex w-full flex-row gap-2">
              <div className="w-full">
                <CaseSwitcherDropdown caseId={caseId} />
              </div>
            </div>
          )} */}
          <div className="mt-8" />
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            {/* {caseId && (
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  My Case
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {navigation(caseId, '')?.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classNames(
                          team.current
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        )}
                      >
                        <span
                          className={classNames(
                            team.current
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                          )}
                        >
                          <team.icon
                            className={classNames(
                              team.current
                                ? 'text-indigo-600'
                                : 'text-gray-600 group-hover:text-indigo-600',
                              'h-4 w-4 shrink-0',
                            )}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="truncate">{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )} */}

            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Get Help
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {teams.map((team) => (
                  <li key={team.name}>
                    <a
                      href={team.href}
                      className={classNames(
                        team.current
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                      )}
                    >
                      <span
                        className={classNames(
                          team.current
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                        )}
                      >
                        {team.initial}
                      </span>
                      <span className="truncate">{team.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {/* {!caseId && ( */}
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                My Cases
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {caseList?.map((caseData, i) => (
                  <li key={i}>
                    <a
                      href={`/app/cases/case/${caseData.id}`}
                      className={clsx(
                        caseData.current
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                      )}
                    >
                      <span
                        className={classNames(
                          caseData.current
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                        )}
                      >
                        {caseData.title.slice(0, 1)}
                      </span>
                      <span className="truncate">{caseData.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {/* )} */}
          </ul>
        </nav>
      </div>
    </>
  )
}
