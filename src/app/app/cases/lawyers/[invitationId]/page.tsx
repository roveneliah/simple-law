'use client'
import CaseLayout from '@/components/CaseLayout'
import LawyersTable from '@/components/LawyersTable'
import AppLayout from '@/components/Layout/AppLayout'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useInvitation } from '../../recommendations/[invitationId]/page'
import { FALLBACK_AVATAR } from '@/data/dummy'
import { useCase } from '@/lib/useCase'
import { useUser } from '@/lib/useUser'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

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

const products = [
  {
    id: 1,
    name: 'QuickConsult',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Email-based consultation on a specific topic.',
  },
  {
    id: 1,
    name: 'Sanity Check',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$50',
    color:
      '48 hour review of a situation, document, contract, or other legal matter.',
  },
  // More products...
]

function ServiceView() {
  const caseId = usePathname().split('/').pop()
  const user = useUser()
  const caseData = useCase(caseId)
  console.log(caseData)
  const invitation = useInvitation(caseData?.Invitation?.[0].id)
  const services = invitation?.Service
  // const recommendations = useRecommendations(caseId)

  console.log('invitation', invitation)
  console.log(services)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    invitation && setLoading(false)
  }, [invitation])

  if (loading) {
    return (
      <AppLayout>
        <CaseLayout viewName="Lawyers" caseId={caseId} />
        <div className="mt-8 flex flex-col items-center">
          <FaceSmileIcon
            className="h-12 w-12 text-gray-400"
            aria-hidden="true"
          />
          <h2 className="mt-6 text-2xl font-semibold leading-6 text-gray-900">
            Loading...
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Our robots must be sleeping on the job.
          </p>
        </div>
      </AppLayout>
    )
  }

  console.log(caseId)

  return (
    <AppLayout>
      <CaseLayout viewName="Lawyers" caseId={caseId}>
        <div className="mt-4 space-y-0">
          {!caseData?.readyForInvitation && (
            <div>
              <p className="text-xl font-medium text-gray-900/75">
                Hey {user?.first.trim()},
              </p>
              <p className="mt-4 ">
                We're going to interview lawyers for you, and send you our top
                picks with an explanation why.
              </p>
              <p className="mt-4">
                <p>
                  <Link href={`/app/cases/case/${caseId}`}>
                    So we can get going, please head to Case Info and give us
                    the basic details.
                  </Link>
                </p>
              </p>

              <p className="mt-4">Remember, booking with us you get:</p>
              <li className="ml-2 mt-2">
                <p>First 2 hours free.</p>
              </li>
              <li className="ml-2 mt-2">
                <p>Weekly updates from your attorney on your case's status.</p>
              </li>
              <li className="ml-2 mt-2">
                <p>The ability to switch lawyers at any time.</p>
              </li>
              <div className="mt-8 flex flex-row">
                <Link
                  href={`/app/cases/case/${caseId}`}
                  className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  👍 Fill out Case Info
                </Link>
              </div>
            </div>
          )}
          {caseData?.readyForInvitation && (
            <div>
              <p className="text-base text-gray-500">
                {'[[caseData?.ourSearchStrategy]]'}
              </p>
            </div>
          )}
        </div>
        <LawyersTable caseId={caseId} />
      </CaseLayout>
    </AppLayout>
  )
}

export default ServiceView
