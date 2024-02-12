import { dummyLawyers } from '@/data/dummy'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const useRecommendations = (caseId) => {
  // /api/cases/service/recommend?caseId=caseId
  const [recommendations, setRecommendations] = useState([])
  useEffect(() => {
    const fetchRecommendationIds = async () => {
      const res = await fetch(`/api/cases/services/recommend?caseId=${caseId}`)
      const { data, error } = await res.json()
      return data
    }

    fetchRecommendationIds().then((data) => {
      setRecommendations(data)
    })
  }, [caseId])

  return recommendations
}

export default function LawyersTable() {
  const caseId = usePathname().split('/').pop()
  const recommendations = useRecommendations(caseId)

  // sort the lawyers based on tag
  const sortedResponses = useMemo(() => {
    const lawyers = dummyLawyers(caseId)
    const sorted = lawyers.sort((a, b) => {
      // tag rank: 1. 'Top Choice', 2. '', 3. 'Declined'
      if (a.tag === 'Top Choice') return -1
      if (b.tag === 'Top Choice') return 1
      if (a.tag === 'Declined') return 1
      if (b.tag === 'Declined') return -1
    })
    return sorted
  }, [caseId])

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
        {recommendations.map((service, i) => (
          <div
            key={i}
            // href={`/app/cases/lawyers/${lawyer.id}/${lawyer.caseId}`}
          >
            <li
              key={service.id}
              className={`-mx-3 flex cursor-pointer gap-x-4 rounded-sm px-3 py-5 hover:bg-gray-50`}
            >
              <div>
                <span className="relative inline-block h-12 w-12">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={service.imageUrl}
                    alt=""
                  />

                  {!service.tag && (
                    <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
                  )}
                  {service.tag === 'Shortlist' && (
                    <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-yellow-400 ring-2 ring-white" />
                  )}
                </span>
              </div>
              <div className="flex-auto">
                <div className="flex items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {service.name}
                  </p>
                  <p className="flex-none text-xs text-gray-600">
                    {service.tag}
                  </p>
                </div>
                <p className="mt-1 line-clamp-4 text-sm leading-6 text-gray-600">
                  {/* {service.content} */}
                  {JSON.stringify(service)}
                </p>
              </div>
            </li>
          </div>
        ))}
        {sortedResponses.map((lawyer, i) => (
          <Link
            key={i}
            href={`/app/cases/lawyers/${lawyer.id}/${lawyer.caseId}`}
          >
            <li
              key={lawyer.id}
              className={`-mx-3 flex cursor-pointer gap-x-4 rounded-sm px-3 py-5 hover:bg-gray-50`}
            >
              <div>
                <span className="relative inline-block h-12 w-12">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={lawyer.imageUrl}
                    alt=""
                  />

                  {!lawyer.tag && (
                    <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
                  )}
                  {lawyer.tag === 'Shortlist' && (
                    <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-yellow-400 ring-2 ring-white" />
                  )}
                </span>
              </div>
              <div className="flex-auto">
                <div className="flex items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {lawyer.name}
                  </p>
                  <p className="flex-none text-xs text-gray-600">
                    {lawyer.tag}
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
