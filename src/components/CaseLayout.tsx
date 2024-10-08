import Link from 'next/link'
import { withCaseData } from './withCaseData'
import { useCase } from '@/lib/useCase'
import { usePathname } from 'next/navigation'

const BASE_URL = '/app/cases/'
const tabs = (id: string | number) =>
  [
    // { name: 'Status', href: 'status' },
    { name: 'Case', href: 'case' },
    { name: 'Lawyers', href: 'lawyers' },
    { name: 'Services', href: 'services' },
    // { name: 'Documents', href: 'docs' },
    // { name: 'Recommendations', href: 'recommendations' },
    // { name: 'Chat', href: 'chat' },
    { name: 'Workspace', href: 'workspace' },
    // { name: 'Learn', href: 'learn' },
    // { name: 'Help', href: 'help' },
  ].map((tab) => {
    return {
      ...tab,
      href: BASE_URL + tab.href + '/' + id,
    }
  })

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function CaseMenuBar({ caseId, viewName }) {
  return (
    <div className="border-b border-gray-200">
      <div className="sm:flex sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        {/* <h3 className="mt-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-6 text-gray-900">
          <Link href={`/app/cases/status/${caseId}`}>{caseData?.title}</Link>
        </h3> */}
        <div className="mt-0 w-full sm:mt-0">
          <nav className="-mb-px flex w-full flex-row items-baseline justify-evenly space-x-0">
            {tabs(caseId).map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.name === viewName
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 transition-all hover:border-gray-300 hover:text-gray-700',
                  'w-full whitespace-nowrap border-b-2 py-2 text-center text-sm font-medium',
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

function CaseLayout({ children, viewName, caseId }: any) {
  return (
    <div className="mt-0">
      <CaseMenuBar viewName={viewName} caseId={caseId} />
      <div className="mt-0">{children}</div>
    </div>
  )
}

export default CaseLayout
