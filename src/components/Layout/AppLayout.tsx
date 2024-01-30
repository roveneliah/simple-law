'use client'

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
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  GiftTopIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { CaseSwitcherDropdown } from './CaseSwitcherDropdown'

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
      <div className="flex w-full flex-col items-center overflow-auto py-4">
        <div className="flex w-full max-w-2xl flex-col">
          <div className="mb-4 flex w-full flex-row items-baseline justify-between">
            <div className="w-1/3 pt-7">
              <p className="text-xl font-extrabold">
                IMPOSSIBLE
                <span className="font-light text-gray-600">Law</span>
              </p>
            </div>
            <CaseSwitcherDropdown />

            <button className="flex flex-row items-center gap-x-4 whitespace-nowrap py-3 text-sm font-semibold leading-6 text-gray-600 hover:bg-gray-50">
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
