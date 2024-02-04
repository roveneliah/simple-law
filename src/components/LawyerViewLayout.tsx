import Link from 'next/link'
import { withCaseData } from './withCaseData'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const BASE_URL = '/lawyers/'
const tabs = [
  { name: 'Leads', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Profile', href: 'profile' },
]

function LawyerMenuBar(props) {
  return (
    <div className="border-b border-gray-200">
      <div className="sm:flex sm:flex-row sm:items-baseline sm:justify-between">
        <Link href={`/lawyers`}>
          <h3 className="mt-0 text-base font-semibold leading-6 text-gray-900">
            Hmmm
          </h3>
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
