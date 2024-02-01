'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import MagicText from '@/components/vibes/MagicText'
import { withCaseData } from '@/components/withCaseData'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function CaseView({ caseData, state }) {
  const [stateIndex, setStateIndex] = useState(state)
  const { id, name, description, clientFirst } = caseData || {
    id: null,
    name: null,
    description: null,
    clientFirst: null,
  }

  // rotate stateIndex on left right arrow key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setStateIndex((stateIndex) => (stateIndex + 1) % 3)
      } else if (e.key === 'ArrowRight') {
        setStateIndex((stateIndex) => (stateIndex + 1) % 3)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [stateIndex, setStateIndex])

  return (
    <AppLayout>
      <CaseLayout viewName="Status" id={id}>
        <div className="flex flex-row">
          {stateIndex == 0 && (
            <div className="col-span-full mb-16">
              <p className="text-xl font-medium text-gray-900/75">
                Hey {clientFirst},
              </p>
              <p className="mt-4 ">
                Let's get some info about your case so we can pair you with a
                trusted lawyer. Head to{' '}
                <Link
                  href={`/app/cases/case/${id}`}
                  className="text-purple-400 transition-all hover:font-medium hover:text-purple-500"
                >
                  Case Info
                </Link>{' '}
                and let us know what's going on.
              </p>

              <p className="mt-4 ">
                From there, we'll interview our trusted lawyers and send you our
                top recommendations.
              </p>

              <p className="mt-4 text-lg font-medium">Cheers,</p>
              <p className="text-lg font-extrabold">
                IMPOSSIBLE<span className="font-light">Law</span>
              </p>
            </div>
          )}
          {stateIndex == 1 && (
            <div className="col-span-full">
              <p className="text-xl font-medium text-gray-900/75">
                Hey {clientFirst},
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
        </div>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(({ caseData }) => CaseView({ caseData, state: 1 }))
