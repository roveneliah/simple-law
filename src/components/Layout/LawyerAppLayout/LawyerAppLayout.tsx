'use client'
// import { MenubarDemo } from '@/components/MenubarDemo'

import Link from 'next/link'
import { supabase, supabaseLawyers } from '@/lib/supabaseClient'
import { useLawyerUser, useSession } from '@/lib/useUser'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import DemoBar from './DemoBar'
import { getLawyerAvatarUrlById } from '../../ProfileForm'
import { useIsVerified } from '@/app/lawyers/verification/useIsVerified'

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

function LawyerDropdownMenu(props) {
  return (
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
                  href="/lawyers"
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
                  href="/lawyers/perks"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
  )
}

export default function LawyerAppLayout({
  children,
  overrideVerification = false,
}: any) {
  const user = useLawyerUser()
  useRedirectIfNotVerified({ override: true })

  const handleSignOut = async (e) => {
    e.preventDefault()
    supabaseLawyers.auth.signOut()
  }

  const loading = !user?.email

  const lawyerImageUrl = getLawyerAvatarUrlById(user?.id)

  if (loading) return <div>Loading...</div>

  return (
    <>
      {/* {!verified && <DemoBar />} */}
      <div className="flex h-screen flex-row">
        {/* <Sidebar /> */}
        <div className="flex w-full flex-col items-center overflow-auto py-4">
          <div className="flex w-full max-w-3xl flex-col px-8 lg:px-0">
            <div className="mb-4 mt-4 flex w-full flex-row items-center justify-between pb-4">
              {/* <div className="w-1/3">
              <Link href="/lawyers">
                <p className="text-xl font-extrabold">
                  IMPOSSIBLE
                  <span className="font-light text-gray-600">Law</span>
                </p>
              </Link>
            </div> */}
              <div className="mt-1 flex w-1/3 flex-row items-center gap-1">
                <Link href={'/lawyers'}>
                  <p className="text-xl font-bold tracking-tighter">
                    impossible.
                  </p>
                </Link>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center justify-end gap-4 tracking-tighter">
                  {/* <div>
                  <Link
                    href="/lawyers"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
                  >
                    feed
                  </Link>
                </div> */}

                  <div>
                    <Link
                      href="/lawyers/invitations"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
                    >
                      invitations
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/lawyers/clients"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
                    >
                      clients
                    </Link>
                  </div>
                  {/* <div>
                    <Link
                      href="/lawyers/questions"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
                    >
                      questions
                    </Link>
                  </div> */}
                  <div>
                    <Link
                      href="/lawyers/questions"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
                    >
                      tasks
                    </Link>
                  </div>

                  <div>
                    <Link
                      href="/lawyers/account"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
                    >
                      <img
                        src={lawyerImageUrl}
                        alt=""
                        width={40}
                        height={40}
                        className="mt-2 rounded-full bg-amber-300 p-0.5"
                      />
                    </Link>
                  </div>
                </div>
                {/* <LawyerDropdownMenu
                email={user.email}
                handleSignOut={handleSignOut}
              /> */}
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
