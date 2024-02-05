import { StarIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const BASE_URL = '/lawyers/'
const tabs = [
  { name: 'Invitations', href: 'invitations' },
  { name: 'Clients', href: '#' },
  { name: 'Profile', href: 'profile' },
]

function LawyerMenuBar(props) {
  return (
    <div className="border-b border-gray-200">
      <div className="sm:flex sm:flex-row sm:items-baseline sm:justify-between">
        <Link href={`/lawyers`} className="flex flex-row items-center gap-2 ">
          <h3 className="mt-0 text-base font-semibold leading-6 text-gray-900">
            Jerri Kelman, Esq.
          </h3>
          <StarIcon className="h-5 w-5 text-gray-600" />
        </Link>
        <div className="mt-4 sm:mt-0">
          <nav className="-mb-px flex flex-row items-baseline justify-start space-x-8">
            {tabs.map((tab, i) => (
              <Link
                key={i}
                href={BASE_URL + '/' + tab.href}
                className={classNames(
                  tab.name === props.viewName
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 transition-all hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
                )}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default function LawyerViewLayout({ children, viewName }: any) {
  return (
    <div className="mt-0">
      <LawyerMenuBar viewName={viewName} />
      <div className="mt-8">{children}</div>
    </div>
  )
}
