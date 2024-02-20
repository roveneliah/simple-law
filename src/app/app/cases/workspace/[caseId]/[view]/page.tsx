'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import WeeklyUpdates from '@/components/WeeklyUpdates'
import { useCase } from '@/lib/useCase'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function WorkspacePage({ params: { caseId, view } }) {
  const caseData = useCase(caseId)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (caseData) {
      setLoading(false)
    }
  }, [caseData])

  if (loading) {
    return (
      <div className="mt-8 flex flex-col items-center">
        <FaceSmileIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
        <h2 className="mt-6 text-2xl font-semibold leading-6 text-gray-900">
          Loading...
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Our robots must be sleeping on the job.
        </p>
      </div>
    )
  }

  console.log(caseData)

  return (
    <>
      {/* <CaseLayout viewName="Workspace" caseData={caseData} caseId={caseId}/> */}

      {/* <div className="mb-4 mt-8 px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Updates
        </h3>
      </div> */}
      <div className="mt-8"></div>
      {view === 'updates' && <WeeklyUpdates />}
      {view === 'questions' && (
        <div className="mt-8 border-t px-4 pt-8 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Questions?
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Drop any questions you have here, and your attorney will get back to
            you by the next weekly update.
          </p>
        </div>
      )}
    </>
  )
}
