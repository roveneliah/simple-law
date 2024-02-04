import { dummyLawyers } from '@/data/dummy'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LawyersTable() {
  const caseId = usePathname().split('/').pop()
  return (
    <div>
      <div className="mb-4 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Our Choices for You
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            We interviewed 8 lawyers, and these are our top choices for you.
          </p>
        </div>
        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
      <button
        type="button"
        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add user
      </button>
    </div> */}
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {dummyLawyers(caseId).map((lawyer, i) => (
          <Link
            key={i}
            href={`/app/cases/lawyers/${lawyer.id}/${lawyer.caseId}`}
          >
            <li
              key={lawyer.id}
              className="-mx-3 flex cursor-pointer gap-x-4 rounded-sm px-3 py-5 hover:bg-gray-50"
            >
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={lawyer.imageUrl}
                alt=""
              />
              <div className="flex-auto">
                <div className="flex items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {lawyer.name}
                  </p>
                  <p className="flex-none text-xs text-gray-600">
                    {lawyer.rank}
                  </p>
                </div>
                <p className="mt-1 line-clamp-4 text-sm leading-6 text-gray-600">
                  {lawyer.content}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
