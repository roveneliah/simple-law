import AppLayout from '@/components/Layout/AppLayout'
import { CASES } from '@/data/dummy'
import Link from 'next/link'

export function CaseList() {
  return (
    <div className="flex flex-col space-y-2">
      {CASES.map((c, i) => (
        <Link
          key={i}
          href={c.href}
          className="-m-4 border-b p-4 hover:bg-gray-50"
        >
          <p className="font-medium">{c.name}</p>
          <p>{c.description}</p>
          <p className="text-zinc-500">{c.access}</p>
        </Link>
      ))}
      <Link href={'cases/new'}>New Case +</Link>
    </div>
  )
}

export default function Cases() {
  return (
    <AppLayout>
      <CaseList />
    </AppLayout>
  )
}
