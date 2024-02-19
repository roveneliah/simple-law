'use client'
import CaseLayout from '@/components/CaseLayout'
import LawyersTable from '@/components/LawyersTable'
import AppLayout from '@/components/Layout/AppLayout'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCase } from '@/lib/useCase'
import { useUser } from '@/lib/useUser'
import { FaceSmileIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import CaseProgress from '@/components/CaseProgress'

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

function ServiceView({ params: { caseId } }) {
  const user = useUser()
  const caseData = useCase(caseId)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    caseData && setLoading(false)
  }, [caseData])

  if (loading) {
    return (
      <AppLayout caseId={caseId}>
        {/* <CaseLayout viewName="Lawyers" caseId={caseId} /> */}
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

  const stageIndex = !caseData?.readyForInvitation
    ? 0
    : !caseData?.Invitation?.length
      ? 1
      : 2
  return (
    <AppLayout caseId={caseId}>
      <div className="mt-8"></div>
      <CaseProgress stageIndex={stageIndex} />

      {/* <CaseLayout viewName="Lawyers" caseId={caseId}/> */}
      {!caseData?.readyForInvitation && (
        <div className="mt-4 space-y-0 rounded-lg border px-6 py-4 text-base">
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
                  So we can get going, please head to Case Info and give us the
                  basic details.
                </Link>
              </p>
            </p>

            <div className="mt-8 flex flex-row">
              <Link
                href={`/app/cases/case/${caseId}`}
                className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              >
                👍 Fill out Case Info
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* {caseData?.readyForInvitation && (
        <div>
          <p className="text-base text-gray-500">
            {'[[caseData?.ourSearchStrategy]]'}
          </p>
        </div>
      )} */}
      {caseData?.readyForInvitation && (
        <div className="mt-8">
          <LawyersTable caseId={caseId} />
          <div className="mt-8 rounded-lg border px-6 py-4">
            <ul role="list" className="divide-y divide-gray-100">
              <div className="mb-4 sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="flex flex-row items-center gap-2 text-base font-semibold leading-6 text-gray-900">
                    Other Options
                    <div className="flex items-center">
                      <SparklesIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Before jumping into it with a lawyer, consider these
                    lighter-touch options.
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
            </ul>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

export default ServiceView
