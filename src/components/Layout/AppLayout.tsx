// import { MenubarDemo } from '@/components/MenubarDemo'
import CaseLayout from '@/components/CaseLayout'
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'

const navigation = [
  {
    name: 'Feed',
    href: '/app/feed',
    icon: HomeIcon,
    count: '5',
    current: false,
  },
  {
    name: 'Cases',
    href: '/app/cases',
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: 'Apps',
    href: '#',
    icon: DocumentDuplicateIcon,
    current: false,
  },
  { name: 'Lawyers', href: '#', icon: UsersIcon, current: false },
  {
    name: 'Questions',
    href: '#',
    icon: FolderIcon,
    count: '12',
    current: false,
  },
  // { name: 'Notes', href: '#', icon: ChartPieIcon, current: false },
  // {
  //   name: 'Bookmarks',
  //   href: '#',
  //   icon: CalendarIcon,
  //   count: '20+',
  //   current: false,
  // },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function AppLayout({ children, pageProps }: any) {
  return (
    <div className="flex h-screen flex-row">
      {/* <MenubarDemo /> */}
      <div className="flex w-96 min-w-80 grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item, i) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                        'group flex justify-between gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                      )}
                    >
                      {item.name}
                      {item.count ? (
                        <span
                          className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                          aria-hidden="true"
                        >
                          {item.count}
                        </span>
                      ) : null}
                      {/* <TrashIcon
                        className="hidden h-5 w-5 shrink-0 group-hover:flex"
                        aria-hidden="true"
                      /> */}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="-mx-6 mt-auto">
              <a
                href="#"
                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
              >
                <img
                  className="h-8 w-8 rounded-full bg-gray-800"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-8 flex w-full flex-col overflow-auto pt-8">
        {children}
      </div>
    </div>
  )
}
