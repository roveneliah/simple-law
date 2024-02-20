import AppLayout from '@/components/Layout/AppLayout'
import Link from 'next/link'

const navigation = [
  {
    title: 'Updates',
    href: 'updates',
  },
  {
    title: 'Documents',
    href: 'docs',
  },
  {
    title: 'Questions',
    href: 'questions',
  },
  {
    title: 'Invite',
    href: 'invite',
  },
]

export default function Layout({ children, params: { caseId, view } }) {
  return (
    <AppLayout caseId={caseId}>
      <div className="mt-16 flex w-full flex-row justify-between">
        <h3 className="text-4xl font-medium leading-6 text-gray-900">
          Workspace
        </h3>
        <div className="flex flex-row items-end justify-end gap-6">
          {navigation.map(({ title, href }) => (
            <Link
              href={href}
              className={
                href === view
                  ? 'text-sm font-semibold leading-6 text-gray-900'
                  : 'text-sm font-semibold leading-6 text-gray-400 transition-all hover:text-gray-900'
              }
            >
              <p>{title}</p>
            </Link>
          ))}
        </div>
      </div>
      {children}
    </AppLayout>
  )
}
