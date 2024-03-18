'use client'
import CaseTeamTable from '@/components/CaseTeam'
import { Files, useFiles } from '@/components/CaseViews/Files'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'
import { useCase } from '@/lib/useCase'
import { useUser } from '@/lib/useUser'
import Link from 'next/link'
import { useEffect } from 'react'
import { CaseSummary } from './[view]/CaseSummary'
import { CaseHeader } from './[view]/CaseHeader'
import { redirect } from 'next/navigation'
import { NewCaseForm } from '../../new/[id]/page'
import ReviewDialogue from '@/components/ReviewDialogue'

// TODO: should be server component...
export default function CaseView({ params: { caseId } }) {
  // return redirect(`/app/cases/lawyers/${caseId}`)

  // trigger new questions if none already
  const caseData = useCase(caseId)
  const user = useUser()

  console.log(caseData)

  useEffect(() => {
    const questions = caseData?.Question
    if (caseData?.id && (!questions || questions.length === 0)) {
      console.log('No questions found, triggering new questions...')
      fetch(`/api/cases/review/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caseId }),
      })
      // router.push(`/app/cases/lawyers/${caseId}`)
    } else if (caseData?.id && questions.length > 0) {
      console.log('Questions found, not triggering new questions...')
      // router.push(`/app/cases/lawyers/${caseId}`)
    }
  }, [caseData?.Question])

  // const { files } = useFiles(user.id, caseId)

  return (
    <AppLayout caseId={caseId}>
      <CaseHeader caseId={caseId} view={'details'} title={caseData?.title} />
      {caseData && <NewCaseForm caseData={caseData} />}
      {/* <div className="mt-16">
        <h3 className="text-4xl font-bold tracking-tighter text-gray-900">
          Your Team
        </h3>
        <div className="mt-2 flex flex-row gap-2 overflow-x-auto">
          {caseData?.Agreement.map((agreement, i) => (
            <Link href={`/app/lawyers/${agreement.Lawyer.id}`}>
              <div className="relative h-64 w-52 flex-shrink-0 border-spacing-7 rounded-md border border-dashed border-gray-900">
                <div className="overlay-box absolute bottom-0 left-0 flex h-1/3 w-full flex-col justify-center bg-black/70 p-2 text-center text-white">
                  <p className="text-xl font-bold tracking-tighter text-gray-300 transition-all hover:text-gray-900">
                    {agreement.Lawyer.first} {agreement.Lawyer.last}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          <div className="relative h-64 w-52 flex-shrink-0 border-spacing-7 rounded-md border border-dashed border-gray-900"></div>
          <div className="relative h-64 w-52 flex-shrink-0 border-spacing-7 rounded-md border border-dashed border-gray-900"></div>
        </div>

        <div className="flex flex-col justify-start -space-y-1.5">
          <div className="flex flex-row items-center gap-1 text-gray-500 hover:text-gray-900">
            <p>{'-->'}</p>
            <Link
              href={`/app/cases/lawyers/${caseId}`}
              className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
            >
              find an advisor
            </Link>
          </div>
          <div className="flex flex-row items-center gap-1 text-gray-500 hover:text-gray-900">
            <p>{'-->'}</p>
            <Link
              href={`/app/cases/lawyers/${caseId}`}
              className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
            >
              find a lawyer
            </Link>
          </div>
          <div className="flex flex-row items-center gap-1 text-gray-500 hover:text-gray-900">
            <p>{'-->'}</p>
            <Link
              href={`/app/cases/lawyers/${caseId}`}
              className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
            >
              services
            </Link>
          </div>
        </div>
      </div> */}

      <div className="mb-32 mt-16">
        <h3 className="text-4xl font-bold tracking-tighter text-gray-900">
          Documents
        </h3>
        <Files caseId={caseId} />
      </div>
    </AppLayout>
  )
}
