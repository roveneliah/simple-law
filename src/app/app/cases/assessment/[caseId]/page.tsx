'use client'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'
import { CaseSummary } from '../../case/[caseId]/[view]/CaseSummary'
import { CaseHeader } from '../../case/[caseId]/[view]/CaseHeader'
import { useCase } from '@/lib/useCase'

export default function Page({ params: { caseId } }) {
  const caseData = useCase(caseId)

  const loading = !caseData

  return (
    <AppLayout caseId={caseId} loading={loading}>
      <CaseHeader caseId={caseId} view={'assessment'} title={caseData?.title} />

      {!loading && <CaseSummary caseData={caseData} />}
    </AppLayout>
  )
}
