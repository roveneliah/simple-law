'use client'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { classNames } from '../LawyerAppLayout/Sidebar'
import { Bars4Icon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useUser } from '@/lib/useUser'
import { getUserAvatarUrlById } from '@/app/app/account/page'

const menuItems = (caseId) => [
  {
    name: 'Cases',
    href: '/app/cases',
  },
  // {
  //   name: 'Find Lawyer',
  //   href: '/',
  // },
  // {
  //   name: 'Workspace',
  //   href: `/app/cases/workspace/${caseId}`,
  // },

  {
    name: 'My Team',
    href: `/app/team/${caseId}`,
  },
  // {
  //   name: 'Shop',
  //   href: '/',
  // },
  // {
  //   name: 'For Business Owners',
  //   href: '/app/account',
  // },
  {
    name: 'Account',
    href: '/app/account',
  },
]

export default function AppMenu({ caseId }) {
  const user = useUser()
  const userImageUrl = getUserAvatarUrlById(user?.id)
  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <div className="flex flex-col justify-center">
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-900 ring-0 ring-inset ring-gray-300">
          {/* Account */}
          {/* <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          /> */}
          <div className="inline-flex h-10 w-10 justify-center gap-x-1.5 whitespace-nowrap rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900">
            {/* <Link
              href="/app/account"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
            > */}
            <img
              src={userImageUrl}
              alt=""
              className="h-10 w-10 rounded-full bg-blue-100 p-0.5"
            />
            {/* </Link> */}
          </div>
          {/* <img
            src={userImageUrl}
            alt=""
            width={40}
            height={40}
            className="mt-2 rounded-full bg-blue-100 p-0.5"
          /> */}
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
        <Menu.Items className="absolute right-1 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="overflow-hidden">
            {menuItems(caseId).map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'flex flex-row items-center gap-2 px-4 py-2 text-sm font-semibold tracking-tighter',
                    )}
                  >
                    {/* <div className="h-5 w-5 rounded-sm bg-black" /> */}
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
