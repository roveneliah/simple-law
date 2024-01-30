'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import MagicText from '@/components/vibes/MagicText'
import { withCaseData } from '@/components/withCaseData'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function CaseView({ caseData }) {
  const { id, name, description, clientFirst } = caseData || {
    id: null,
    name: null,
    description: null,
    clientFirst: null,
  }

  const [stateIndex, setStateIndex] = useState(0)

  // rotate stateIndex on left right arrow key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setStateIndex((stateIndex) => (stateIndex + 1) % 2)
      } else if (e.key === 'ArrowRight') {
        setStateIndex((stateIndex) => (stateIndex + 1) % 2)
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
        {/* <p className="transition-all hover:animate-pulse hover:cursor-pointer hover:text-orange-500">
          {description}
        </p> */}
        {/* <p className="transition-all hover:animate-pulse hover:cursor-pointer hover:text-orange-500">
          Hi Eli, tell us some more about your case so we can pair you with a
          trusted <MagicText>attorney</MagicText>.
        </p> */}
        {stateIndex}
        {stateIndex == 0 && (
          <div className="col-span-full mb-16">
            <p className="text-xl font-medium text-gray-900/75">
              Hey {clientFirst},
            </p>
            <p className="mt-4 w-2/3">
              Let's get some info about your case so we can pair you with a
              trusted lawyer.
            </p>

            <p className="mt-4 w-2/3">
              Will you please share the basic info and documents in{' '}
              <Link
                href={`/app/cases/case/${id}`}
                className="text-purple-400 transition-all hover:font-medium hover:text-purple-500"
              >
                Case Info
              </Link>
              , we'll interview our trusted lawyers and send you our top
              recommendations.
            </p>
            <p className="mt-4 w-2/3">
              Remember, you can always jump to{' '}
              <Link
                href={`/app/cases/help/${id}`}
                className="text-purple-400 transition-all hover:font-medium hover:text-purple-500"
              >
                Help
              </Link>{' '}
              if you have any questions.
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
            <p className="mt-4 w-2/3">
              We're interviewing lawyers for you right now. You'll receive an
              email in under 48 hours with our top picks, and an{' '}
              <MagicText>explanation</MagicText> why.
            </p>
            {/* <p className="mt-4 w-2/3">
            We're working to get you paired with a lawyer. You'll receive an
            email in under 48 hours with our top picks, and an explanation why.
          </p> */}
            <li className="mt-4 w-2/3">
              If there's any addition information or documents to share, do so{' '}
              <Link
                href={`/app/cases/case/${id}`}
                className="text-purple-400 transition-all hover:font-medium hover:text-purple-500"
              >
                here
              </Link>
              .
            </li>
            <li className="mt-4 w-2/3">
              Remember, you can always reach out for{' '}
              <Link
                href={`/app/cases/help/${id}`}
                className="text-purple-400 transition-all hover:font-medium hover:text-purple-500"
              >
                help
              </Link>
              .
            </li>
            <p className="mt-4 text-lg font-medium">Cheers,</p>
            <p className="text-lg font-extrabold">
              IMPOSSIBLE<span className="font-light">Law</span>
            </p>
          </div>
        )}
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(CaseView)
