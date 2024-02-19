'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import { useCase } from '@/lib/useCase'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function WorkspacePage({ params: { caseId } }) {
  const caseData = useCase(caseId)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (caseData) {
      setLoading(false)
    }
  }, [caseData])

  if (loading) {
    return (
      <AppLayout>
        <CaseLayout viewName="Workspace" caseData={caseData} caseId={caseId}>
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
        </CaseLayout>
      </AppLayout>
    )
  }

  console.log(caseData)

  return (
    <AppLayout>
      <CaseLayout viewName="Workspace" caseData={caseData} caseId={caseId}>
        <div className="mt-8 flex flex-col items-center">{caseId}</div>
      </CaseLayout>
    </AppLayout>
  )
}
