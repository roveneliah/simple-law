import AppLayout from '@/components/Layout/AppLayout'
import { CASES } from '@/data/dummy'
import Link from 'next/link'

export default function App() {
  return (
    <AppLayout>
      <p className="text-3xl font-semibold">Cases</p>
      <div>
        {CASES.map((c) => (
          <Link key={c.handle} href={c.href}>
            <p className="font-medium">{c.name}</p>
            <p>{c.description}</p>
            <p className="text-zinc-500">{c.access}</p>
          </Link>
        ))}
      </div>
    </AppLayout>
  )
}
