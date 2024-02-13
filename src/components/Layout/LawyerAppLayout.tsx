'use client'
// import { MenubarDemo } from '@/components/MenubarDemo'

import {
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CalendarIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { supabase, supabaseLawyers } from '@/lib/supabaseClient'
import { useLawyerUser, useSession } from '@/lib/useUser'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const useRedirectIfNotVerified = ({ override = false }) => {
  // use supabase session to check if user is verified
  if (override) return

  const session = useSession()
  const router = useRouter()

  const isVerified = session?.user?.user_metadata?.isVerified
  if (!isVerified) router.push('/lawyers/verification')
}

export default function LawyerAppLayout({
  children,
  overrideVerification = false,
}: any) {
  const user = useLawyerUser()
  useRedirectIfNotVerified({ override: true })

  if (!user?.email) {
    // direct to login
    return <div>Loading...</div>
  }

  const handleSignOut = async (e) => {
    e.preventDefault()
    supabaseLawyers.auth.signOut()
  }

  return (
    <div className="flex h-screen flex-row">
      {/* <Sidebar /> */}
      <div className="flex w-full flex-col items-center overflow-auto py-4">
        <div className="flex w-full max-w-xl flex-col px-8 lg:px-0">
          {/* <CaseProgress stageIndex={0} /> */}
          <div className="mb-4 mt-8 flex w-full flex-row items-center justify-between pb-4">
            <div className="w-1/3">
              <Link href="/lawyers">
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
                      {user.email}
                    </p>
                  </div>
                  <div className="py-1">
                    {/* <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/lawyers"
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
                    </Menu.Item> */}
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/lawyers/perks"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          💸 Perks
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/lawyers/profile"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          👩🏻‍💼 Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/lawyers/verification"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          ✅ Verification
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/lawyers/account"
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
                            onClick={handleSignOut}
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
