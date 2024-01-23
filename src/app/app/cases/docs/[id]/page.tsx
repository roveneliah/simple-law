'use client'
import CaseLayout from '@/components/CaseLayout'
import { Files } from '@/components/CaseViews/Files'
import AppLayout from '@/components/Layout/AppLayout'
import { withCaseData } from '@/components/withCaseData'

function DocumentsView() {
  return (
    <AppLayout>
      <CaseLayout viewName="Documents">
        <Files />
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(DocumentsView)
