'use client'
// import { MenubarDemo } from '@/components/MenubarDemo'

import {
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShoppingBagIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/lib/useUser'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useCase } from '@/lib/useCase'
import CaseList from '../CaseList'
import { usePathname } from 'next/navigation'

const navigation = (caseId, view) => [
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
    icon: UserIcon,
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

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function ChildViewHeader(props) {
  return (
    <div className="mb-4 mt-8 flex w-full flex-row items-center justify-between pb-4">
      <div className="w-1/3">
        <Link href="/app">
          <p className="text-xl font-extrabold">
            IMPOSSIBLE
            <span className="font-light text-gray-600">Law</span>
          </p>
        </Link>
      </div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Account
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-4 py-3">
              <p className="text-sm">Signed in as</p>
              <p className="truncate text-sm font-medium text-gray-900">
                {props.email}
              </p>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/app"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    )}
                  >
                    🚀 Cases
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/app/account"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    )}
                  >
                    🧟 Account settings
                  </Link>
                )}
              </Menu.Item>
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={props.handleSignOut}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm',
                      )}
                    >
                      ✈️ Sign out
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default function AppLayout({ children, caseId }: any) {
  const user = useUser()
  const caseData = useCase(caseId)

  if (!user) {
    return <div>Loading...</div>
  }

  const handleSignOut = async (e) => {
    e.preventDefault()
    supabase.auth.signOut()
  }

  return (
    <div className="flex h-screen flex-row overflow-y-auto">
      <Sidebar caseId={caseId} />
      <div className="flex w-full flex-col items-center overflow-y-hidden py-4">
        <div className="flex w-full max-w-2xl flex-col overflow-y-auto px-8 lg:px-0">
          {/* <ChildViewHeader email={user.email} handleSignOut={handleSignOut} /> */}
          {children}
        </div>
      </div>
    </div>
  )
}

function Sidebar({ caseId }) {
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
