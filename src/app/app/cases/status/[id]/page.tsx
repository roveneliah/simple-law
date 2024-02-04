'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import MagicText from '@/components/vibes/MagicText'
import { withCaseData } from '@/components/withCaseData'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/lib/useUser'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useCase = (id) => {
  const [caseData, setCaseData] = useState(null)
  useEffect(() => {
    supabase
      .from('Case')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        setCaseData(data)
      })
  }, [id])
  return caseData
}

function CaseView() {
  const caseId = usePathname().split('/').pop()
  const caseData = useCase(caseId)
  const [stateIndex, setStateIndex] = useState(caseData?.stateIndex || 0)

  const user = useUser()

  // rotate stateIndex on left right arrow key press
  useEffect(() => {
    const slides = 4
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setStateIndex((stateIndex) => (stateIndex + slides - 1) % slides)
      } else if (e.key === 'ArrowRight') {
        setStateIndex((stateIndex) => (stateIndex + 1) % slides)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [stateIndex, setStateIndex])

  return (
    <AppLayout>
      <CaseLayout viewName="Status" id={caseId}>
        <div className="flex flex-row">
          {caseData?.status == 'new' && (
            <div className="col-span-full mb-16">
              <p className="text-xl font-medium text-gray-900/75">
                Hey {user?.first},
              </p>
              <p className="mt-4 ">
                We're going to interview lawyers for you, and send you our top
                picks with an explanation why.
              </p>
              <p className="mt-4">
                <MagicText>
                  <Link href={`/app/cases/case/${caseId}`}>
                    So we can get going, please head to Case Info and give us
                    the basic details.
                  </Link>
                </MagicText>
              </p>

              <p className="mt-4">Remember, booking with us you get:</p>
              <li className="ml-2 mt-2">
                <MagicText>First 2 hours free.</MagicText>
              </li>
              <li className="ml-2 mt-2">
                <MagicText>
                  Weekly updates from your attorney on your case's status.
                </MagicText>
              </li>
              <li className="ml-2 mt-2">
                <MagicText>
                  The ability to switch lawyers at any time.
                </MagicText>
              </li>
              <div className="mt-8 flex flex-row">
                <Link
                  href={`/app/cases/case/${caseId}`}
                  className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  👍 Fill out Case Info
                </Link>
              </div>
              {/* <p className="mt-4 text-lg font-medium">Cheers,</p>
              <p className="text-lg font-extrabold">
                IMPOSSIBLE<span className="font-light">Law</span>
              </p> */}
            </div>
          )}
          {stateIndex == 1 && (
            <div className="col-span-full">
              <p className="text-xl font-medium text-gray-900/75">
                Hey {user.first},
              </p>
              <p className="mt-4 ">
                We're interviewing lawyers for you right now. You'll receive an
                email in under 48 hours with our top picks, and an{' '}
                <MagicText>explanation</MagicText> why.
              </p>
              {/* <p className="mt-4 ">
            We're working to get you paired with a lawyer. You'll receive an
            email in under 48 hours with our top picks, and an explanation why.
          </p> */}
              <p className="mt-4 ">
                If there's any addition information or documents to share, do so{' '}
                <Link
                  href={`/app/cases/case/${id}`}
                  className="text-purple-400 transition-all hover:font-medium hover:text-purple-500"
                >
                  here
                </Link>
                .
              </p>

              <p className="mt-4 text-lg font-medium">Cheers,</p>
              <p className="text-lg font-extrabold">
                IMPOSSIBLE<span className="font-light">Law</span>
              </p>
            </div>
          )}
          {stateIndex == 2 && (
            <div className="col-span-full w-full">
              <p className="text-xl font-medium text-gray-900/75">
                Hey {clientFirst},
              </p>
              <p className="mt-4 ">
                We conducted 5 interviews for you. Go to the{' '}
                <Link
                  href={`/app/cases/lawyers/${id}`}
                  className="text-purple-400 transition-all hover:font-medium hover:text-purple-500"
                >
                  Lawyers
                </Link>{' '}
                tab to see our top picks and an explanation why.
              </p>
              <p className="mt-4 ">
                From there, decide who you'd like to work with, and get started.
              </p>
              <p className="mt-4 text-lg font-medium">Cheers,</p>
              <p className="text-lg font-extrabold">
                IMPOSSIBLE<span className="font-light">Law</span>
              </p>
            </div>
          )}
          {stateIndex == 3 && (
            <div className="col-span-full w-full">
              <p className="text-xl font-medium text-gray-900/75">
                Hey {clientFirst},
              </p>
              <p className="mt-4 ">
                We're so happy you found a lawyer, and hope it was easy for you.
                Remember, because you booked with us you can take advantage of:
              </p>
              <li className="mt-4 ">
                <MagicText>First 2 hours free.</MagicText>
              </li>
              <li className="mt-2">
                <MagicText>
                  Weekly updates from your attorney on your case's status.
                </MagicText>
              </li>
              <li className="mt-2">
                <MagicText>
                  The ability to switch lawyers at any time.
                </MagicText>
              </li>
              {/* <p className="mt-4 text-lg font-medium">Cheers,</p>
              <p className="text-lg font-extrabold">
                IMPOSSIBLE<span className="font-light">Law</span>
              </p> */}
            </div>
          )}
        </div>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(CaseView)
