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
        <CaseLayout viewName="Services" />
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
      <CaseLayout viewName="Services" id={caseId}>
        <div className="mt-4 space-y-0">
          <p className="text-base font-semibold text-black">Hi {user.first},</p>
          <p className="text-base text-gray-500">
            With the information you provided, we saught out lawyers with
            experience in personal injury cases who have...We look for lawyers
            who have a track record of winning cases similar to yours. Since
            you're new to this, we interviewed lawyers to make sure they were
            good...
          </p>
        </div>
        <LawyersTable caseId={caseId} />

        <div className="mb-4 mt-8 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Other Options
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              If you're not looking to pursue your case yet, here are some other
              options for you.
            </p>
            <div className="mt-6 flex flex-col gap-x-6 gap-y-10">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-row gap-4"
                >
                  <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
        <ul role="list" className="divide-y divide-gray-100"></ul>
      </CaseLayout>
    </AppLayout>
  )
}

export default ServiceView
