'use client'
import LawyersTable from '@/components/LawyersTable'
import AppLayout from '@/components/Layout/AppLayout'
import { useEffect, useState } from 'react'
import { useCase } from '@/lib/useCase'
import { FaceSmileIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import CaseProgress from '@/components/CaseProgress'
import { hoursLeft, hoursLeftStr } from '@/app/lawyers/invitations/page'
import CaseProgressVertical from '@/components/CaseProgressVertical'
import ProductList from '@/components/ProductList'

export const useRecommendations = (caseId: string) => {
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

function ReviewInterviewsView({ caseId, caseData }: any) {
  console.log(caseData)

  return (
    <div className="no-scrollbar mb-32 mt-16 w-full">
      <div className="no-scrollbar max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
        <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Here's what we found.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
            We built a custom interview given your case, and narrowed down a few
            top candidates. We'll walk you through our picks and what you might
            like about each.
          </p>
          {/* <div className="mt-10 flex items-center gap-x-6">
               <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
               Get started
               </button>
               <a
               href="#"
               className="text-sm font-semibold leading-6 text-gray-900"
               >
               How it works <span aria-hidden="true">→</span>
               </a>
              </div> */}
        </div>
      </div>
      <ProductList caseId={caseId} />
      <LawyersTable caseId={caseId} />

      {/* <div className="mt-8">
        <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
          <span className="font-bold">If you're looking for free options.</span>{' '}
          {caseData.CaseAnalysis[0].freeOptions}
        </p>
      </div>
      <div className="mt-8">
        <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
          <span className="font-bold">
            If you're looking for advice on your situation...
          </span>{' '}
          We built a custom interview given your case, and narrowed down a few
          top candidates. We'll walk you through our picks and what you might
          like about each.
        </p>
      </div>
      <div className="mt-8">
        <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
          <span className="font-bold">If you know you want a lawyer.</span> We
          built a custom interview given your case, and narrowed down a few top
          candidates. We'll walk you through our picks and what you might like
          about each.
        </p>
      </div> */}

      {/* <div className="flex w-full flex-row justify-between gap-16">
        <div className="mt-10 flex items-center gap-x-6">
          <button
            onClick={() => {}}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View Our Picks
          </button>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            How it works <span aria-hidden="true">→</span>
          </a>
        </div>
      </div> */}
    </div>
  )
}

function ServiceView({ params: { caseId } }: any) {
  // const user = useUser()
  const caseData = useCase(caseId)

  console.log(caseData)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    caseData && setLoading(false)
  }, [caseData])

  const [stageIndex, setStageIndex] = useState<null | number>(null)

  const hrsLeft = hoursLeft(new Date(caseData?.interviewDueBy))
  const timeLeftStr =
    hrsLeft > 36 ? '2 days' : hrsLeft > 24 ? '1 day' : `${hrsLeft} hours`
  useEffect(() => {
    setStageIndex(
      !caseData?.readyForInvitation
        ? 0
        : !caseData?.Invitation?.length
          ? 1
          : hrsLeft < 0
            ? 3
            : 2,
    )
  }, [caseData?.readyForInvitation, caseData?.Invitation?.length])

  // flip on left right key press
  const N_STAGES = 4
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setStageIndex((stageIndex) => (stageIndex + N_STAGES - 1) % N_STAGES)
      } else if (e.key === 'ArrowRight') {
        setStageIndex((stageIndex) => (stageIndex + 1) % N_STAGES)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [stageIndex, setStageIndex])

  const handleCreateInvitations = async (e) => {
    e.preventDefault()
    setStageIndex(2)
    console.log('creating invitations...')
    // trigger create invitations
    const res = await fetch(`/api/invitations/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ caseId }),
    })

    const { data, error } = await res.json()
    if (error) {
      console.error(error)
    }

    console.log(data)
  }

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

  return (
    <AppLayout caseId={caseId}>
      <CaseProgress stageIndex={stageIndex} />

      {/* <CaseLayout viewName="Lawyers" caseId={caseId}/> */}
      {stageIndex === 0 && (
        <div className="mt-16 gap-x-14 pb-32 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Tell us what's going on.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                We're going to interview lawyers for you, and send you our top
                picks with an explanation why. First, we need some info from you
                to help us find the best match.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href={caseId + '/info'}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </Link>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  How it works <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {stageIndex === 1 && (
        <div className="mt-16 gap-x-14 pb-32 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                We'll take it from here.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                We have what we need to interview lawyers on your behalf. Click
                the button below whenever you're ready.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <button
                  onClick={handleCreateInvitations}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Invitations
                </button>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  How it works <span aria-hidden="true">→</span>
                </a>
              </div>
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
      {stageIndex === 2 && (
        <div className="mt-16 flex w-full flex-row gap-x-14 overflow-x-hidden pb-32 lg:mx-1 lg:flex">
          <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Interviewing lawyers now.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
              <span className="font-bold">
                Expect an email within {timeLeftStr}.
              </span>{' '}
              We'll send you our top picks for your case and budget with an
              explanation why.
            </p>
            {/* <div>
              <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                Remember, booking with ImpossibleLaw means:
              </p>
              <div>
                <p></p>
              </div>
            </div> */}
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="flex flex-row items-center text-sm font-semibold leading-6 text-gray-900"
              >
                How it works{' '}
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
      {stageIndex === 3 && (
        <ReviewInterviewsView caseId={caseId} caseData={caseData} />
      )}
    </AppLayout>
  )
}

export default ServiceView
