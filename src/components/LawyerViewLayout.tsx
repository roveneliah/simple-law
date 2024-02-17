import Link from 'next/link'

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const BASE_URL = '/lawyers/'
const tabs = [
  { name: 'Feed', href: '#' },
  { name: 'Invitations', href: 'invitations' },
  { name: 'Clients', href: 'clients' },
  { name: 'Questions', href: 'questions' },
]

function LawyerMenuBar({ viewName }) {
  return (
    <div className="border-b border-gray-200">
      <div className=" sm:flex sm:flex-row sm:items-baseline sm:justify-between">
        <div className="mt-4 w-full sm:mt-0">
          <nav className="-mb-px flex w-full flex-row items-baseline justify-evenly space-x-8">
            {tabs.map((tab, i) => (
              <Link
                key={i}
                href={BASE_URL + '/' + tab.href}
                className={classNames(
                  tab.name === viewName
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
      <div className="px-4">{children}</div>
    </div>
  )
}
