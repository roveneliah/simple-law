import Link from 'next/link'
import { withCaseData } from './withCaseData'
import { useCase } from '@/app/app/cases/status/[id]/page'
import { usePathname } from 'next/navigation'

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
  const caseId = usePathname().split('/').pop()
  const caseData = useCase(caseId)
  return (
    <div className="border-b border-gray-200">
      <div className="sm:flex sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="mt-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-6 text-gray-900">
          <Link href={`/app/cases/status/${caseId}`}>{caseData?.title}</Link>
        </h3>
        <div className="mt-4 sm:mt-0">
          <nav className="-mb-px flex flex-row items-baseline justify-start space-x-8">
            {tabs(caseId).map((tab) => (
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

function CaseLayout({ children, viewName, caseData, caseId }: any) {
  return (
    <div className="mt-0">
      <CaseMenuBar viewName={viewName} caseData={caseData} caseId={caseId} />
      <div className="mt-8">{children}</div>
    </div>
  )
}

export default withCaseData(CaseLayout)
