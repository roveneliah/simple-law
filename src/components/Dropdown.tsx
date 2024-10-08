import { CASES } from '@/data/dummy'
import Link from 'next/link'

export function Dropdown({ setOpenDropdown }) {
  return (
    <div className={`mt-8  w-full bg-gray-50 transition-all`}>
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
        <button>New Case +</button>
      </div>
    </div>
  )
}
