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
        <CaseLayout viewName="Services" caseId={caseId} />
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

  return (
    <AppLayout>
      <CaseLayout viewName="Services" caseId={caseId}>
        <div className="flex flex-row items-center justify-between">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Shop ImpossibleLaw Services
            </h3>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              We're interviewing lawyers on your behalf now, but feel free to
              add any info or updates in the meantime.
            </p>
          </div>

          {/* <button
            type="button"
            className="h-fit rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button> */}
        </div>
        <div className="mt-8">
          <Link href={`/cases/services/${caseId}/recommendations`}>
            <div className="text-base">
              <p>Sanity Check</p>
            </div>
          </Link>
          <Link href={`/cases/services/${caseId}/recommendations`}>
            <div className="text-base">
              <p>Strategy Pack</p>
            </div>
          </Link>
        </div>
      </CaseLayout>
    </AppLayout>
  )
}

export default ServiceView
