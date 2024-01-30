import Link from 'next/link'
import { withCaseData } from './withCaseData'

const BASE_URL = '/app/cases/'
const tabs = (id: string | number) =>
  [
    { name: 'Status', href: 'status' },
    { name: 'Case Info', href: 'case' },
    { name: 'Lawyers', href: 'lawyers' },
    // { name: 'Chat', href: 'chat' },
    // { name: 'Learn', href: 'learn' },
    { name: 'Help', href: 'help' },
  ].map((tab) => {
    return {
      ...tab,
      href: BASE_URL + tab.href + '/' + id,
    }
  })

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function CaseMenuBar(props) {
  return (
    <div className="border-b border-gray-200">
      <div className="sm:flex sm:flex-row sm:items-baseline sm:justify-between">
        <Link href={`/app/cases/status/${props.caseData.id}`}>
          <h3 className="mt-0 text-base font-semibold leading-6 text-gray-900">
            {props.caseData?.name}
          </h3>
        </Link>
        <div className="mt-4 sm:mt-0">
          <nav className="-mb-px flex flex-row items-baseline justify-start space-x-8">
            {tabs(props.caseData.id).map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
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

function CaseLayout({ children, viewName, caseData }: any) {
  return (
    <div className="mt-0">
      <CaseMenuBar viewName={viewName} caseData={caseData} />
      <div className="mt-8">{children}</div>
    </div>
  )
}

export default withCaseData(CaseLayout)
