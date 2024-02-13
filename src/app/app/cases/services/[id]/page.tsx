'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import MagicText from '@/components/vibes/MagicText'
import { withCaseData } from '@/components/withCaseData'
import { useCase } from '@/lib/useCase'
import { useUser } from '@/lib/useUser'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useRecommendations = (caseId) => {
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

function CaseView() {
  const caseId = usePathname().split('/').pop()
  const recommendations = useRecommendations(caseId)

  return (
    <AppLayout>
      <CaseLayout viewName="Services" id={caseId}>
        <div className="">
          <p>Recommend and explain services GIVEN the case details.</p>
          <li>Second Opinion</li>
          <li>Quick Consult</li>
          <li>Sanity Check</li>
          <li>Attorney Match</li>
          <li>Advisory</li>
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
        </ul>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(CaseView)
