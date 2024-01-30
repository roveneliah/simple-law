'use client'
import CaseLayout from '@/components/CaseLayout'
import { Files } from '@/components/CaseViews/Files'
import AppLayout from '@/components/Layout/AppLayout'
import { withCaseData } from '@/components/withCaseData'

function DocumentsView({ caseData }) {
  return (
    <AppLayout>
      <CaseLayout viewName="Case Info">
        <Files caseData={caseData} />
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(DocumentsView)
