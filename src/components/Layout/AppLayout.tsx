'use client'

// import { MenubarDemo } from '@/components/MenubarDemo'
import CaseLayout from '@/components/CaseLayout'
import {
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const navigation = [
  {
    name: 'Home',
    href: '/app/feed',
    icon: HomeIcon,
    count: '5',
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
  {
    name: 'Help',
    href: '#',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    current: false,
  },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function AppLayout({ children, pageProps }: any) {
  return (
    <div className="flex h-screen flex-row">
      {/* <Sidebar /> */}
      <div className=" flex w-full flex-col items-center overflow-auto py-4">
        <div className="flex w-full max-w-xl flex-col px-8 lg:px-0">
          {/* <SequencePanels /> */}
          <div className="mb-4 mt-8 flex w-full flex-row items-center justify-between pb-4">
            <div className="w-1/3">
              <p className="text-xl font-extrabold">
                IMPOSSIBLE
                <span className="font-light text-gray-600">Law</span>
              </p>
            </div>
            {/* <CaseSwitcherDropdown /> */}
            {/* <div className="yarn devflex-row flex w-full items-baseline justify-end gap-x-4">
              <button className="flex flex-row items-center gap-x-4 whitespace-nowrap rounded-md border py-3 text-sm font-semibold leading-6 text-gray-600 hover:bg-gray-50">
                <div className="-mr-6 flex w-full flex-row items-center justify-center space-x-4 px-8">
                  <span className="" aria-hidden="true">
                    Tom Cook
                  </span>
                  <img
                    className="h-8 w-8 rounded-full bg-gray-800"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="sr-only">Your profile</span>
                </div>
              </button>
            </div> */}

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Menu
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
                      tom@example.com
                    </p>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/app/cases"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
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
                          href="/app/cases"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          🔎 Search Lawyers
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          👕 Free T-Shirt!
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/app/account"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
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
                            type="submit"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
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
          {children}
        </div>
      </div>
    </div>
  )
}
function Sidebar() {
  return (
    <div className="flex min-w-80 max-w-xl flex-col gap-y-5 overflow-y-auto border-r border-purple-100 bg-gray-50 px-6">
      <div className="pt-7">
        <p className="text-3xl font-extrabold">
          IMPOSSIBLE<span className="font-light text-gray-600">Law</span>
        </p>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-black',
                      'group flex justify-start gap-x-3 rounded-md p-2 text-sm font-medium leading-6',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-black' : 'text-gray-600',
                        'h-6 w-6 shrink-0',
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
