'use client'
import CaseTeamTable from '@/components/CaseTeam'
import { Files, useFiles } from '@/components/CaseViews/Files'
import AppLayout from '@/components/Layout/AppLayout'
import { useCase } from '@/lib/useCase'
import { useUser } from '@/lib/useUser'
import Link from 'next/link'
import { useEffect } from 'react'
import { CaseSummary } from '../case/[caseId]/[view]/page'

const DEMO_CASE = {
  id: '1',
  title: 'Case 1',
  summary: 'This is a summary of the case',
  Agreement: [
    {
      Lawyer: {
        id: '1',
        first: 'John',
        last: 'Doe',
      },
    },
    {
      Lawyer: {
        id: '2',
        first: 'Jane',
        last: 'Doe',
      },
    },
  ],
}

// TODO: should be server component...
export default function CaseView() {
  // trigger new questions if none already
  const caseId = -1
  const caseData = DEMO_CASE

  // useEffect(() => {
  //   const questions = caseData?.Question
  //   if (caseData?.id && (!questions || questions.length === 0)) {
  //     console.log('No questions found, triggering new questions...')
  //     fetch(`/api/cases/review/parse`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ caseId }),
  //     })
  //     // router.push(`/app/cases/lawyers/${caseId}`)
  //   } else if (caseData?.id && questions.length > 0) {
  //     console.log('Questions found, not triggering new questions...')
  //     // router.push(`/app/cases/lawyers/${caseId}`)
  //   }
  // }, [caseData?.Question])

  // const { files } = useFiles(user.id, caseId)

  return (
    <AppLayout caseId={caseId}>
      <div className="">
        {/* <button className="text-md font-bold tracking-tighter text-gray-500 transition-colors hover:text-gray-600">
          Back to Cases
        </button> */}

        <h1 className="text-5xl font-bold tracking-tighter text-gray-900">
          {caseData?.title}
        </h1>
        {/* <button className="text-left">
          <p className="line-clamp-3 text-xl font-semibold tracking-tighter text-gray-600 transition-all">
            {caseData?.summary}
          </p>
        </button> */}
      </div>
      <div className="flex w-full flex-row gap-1">
        <Link
          href={`/app/cases/lawyers/${caseId}`}
          className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-600"
        >
          Find a Lawyer
        </Link>
      </div>
      <CaseSummary caseData={caseData} />
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
        <CaseTeamTable agreements={caseData?.Agreement} />
      </div>
      {/* <div className="mb-32 mt-16">
        <h3 className="text-4xl font-bold tracking-tighter text-gray-900">
          Documents
        </h3>
        <Files caseId={caseId} />
      </div> */}
      {/* <div className="mt-2 flex flex-row gap-2">
          {files.map((file) => (
            <div className="relative h-64 w-52 flex-shrink-0 border-spacing-7 rounded-md border border-dashed border-gray-900">
              <div className="overlay-box absolute bottom-0 left-0 flex h-1/3 w-full flex-col justify-center bg-black/70 p-2 text-center text-white">
                <p className="text-xl font-bold tracking-tighter text-gray-300 transition-all hover:text-gray-900">
                  {file.name}
                </p>
              </div>
            </div>
          ))}
          <div className="h-64 w-52 border-spacing-7 rounded-md border border-dashed border-gray-900"></div>
          <div className="h-64 w-52 border-spacing-7 rounded-md border border-dashed border-gray-900"></div>
        </div> */}
      {/* <div className="flex flex-col justify-start -space-y-1.5">
          <div className="flex flex-row items-center gap-1 text-gray-500 hover:text-gray-900">
            <p>{'-->'}</p>
            <Link
              href={`/app/cases/lawyers/${caseId}`}
              className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
            >
              what is an agreement?
            </Link>
          </div>
          <div className="flex flex-row items-center gap-1 text-gray-500 hover:text-gray-900">
            <p>{'-->'}</p>
            <Link
              href={`/app/cases/lawyers/${caseId}`}
              className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
            >
              draft an agreement
            </Link>
          </div>
        </div> */}
    </AppLayout>
  )
}
