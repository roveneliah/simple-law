'use client'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { classNames } from './Sidebar'
import { Bars4Icon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function AppMenu({}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex flex-col justify-center">
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-900 ring-0 ring-inset ring-gray-300">
          {/* Account */}
          {/* <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          /> */}
          <Bars4Icon className={'h-5 w-5 shrink-0 text-black'} />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="overflow-hidden">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'flex flex-row items-center gap-2 px-4 py-2 text-sm font-semibold tracking-tighter',
                  )}
                >
                  <div className="h-5 w-5 rounded-sm bg-black" />
                  Personal
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/app/account"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'flex flex-row items-center gap-2 px-4 py-2 text-sm font-semibold tracking-tighter',
                  )}
                >
                  <div className="h-5 w-5 rounded-sm bg-black" />
                  Business Edition
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/app/account"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'flex flex-row items-center gap-2 px-4 py-2 text-sm font-semibold tracking-tighter',
                  )}
                >
                  <div className="h-5 w-5 rounded-sm bg-black" />
                  Lawyers Portal
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
