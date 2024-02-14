'use client'
import CaseLayout from '@/components/CaseLayout'
import LawyersTable from '@/components/LawyersTable'
import AppLayout from '@/components/Layout/AppLayout'
import QuickConsult from '@/components/QuickConsult'
import MagicText from '@/components/vibes/MagicText'
import { withCaseData } from '@/components/withCaseData'
import { supabase } from '@/lib/supabaseClient'
import { useCase } from '@/lib/useCase'
import { useUser } from '@/lib/useUser'
import { UUID } from 'crypto'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useInvitation } from '../../recommendations/[invitationId]/page'

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

function ServiceView() {
  const invitationId = usePathname().split('/').pop()
  const invitation = useInvitation(invitationId)
  const caseId = invitation?.Case?.id

  const recommendations = useRecommendations(caseId)

  return (
    <AppLayout>
      <CaseLayout viewName="Services" id={caseId}>
        <LawyersTable caseId={caseId} />
        <div className="mb-4 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Other Options
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              If you're not looking to pursue your case yet, here are some other
              options for you.
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
        </ul>
      </CaseLayout>
    </AppLayout>
  )
}

export default ServiceView
