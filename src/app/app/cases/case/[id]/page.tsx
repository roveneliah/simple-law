'use client'
import CaseLayout from '@/components/CaseLayout'
import { Files } from '@/components/CaseViews/Files'
import AppLayout from '@/components/Layout/AppLayout'
import { withCaseData } from '@/components/withCaseData'

function DocumentsView({ caseData }) {
  return (
    <AppLayout>
      <CaseLayout viewName="Case Info">
        <div>
          <p>Need (research what a lawyer would ask)</p>
          <p>THIS MUST BE BRUTALLY REDUCED DOWN, GET THEM TO SUBMIT REQUEST</p>
          <li>GOAL</li>
          <li>"In your own words"</li>
          <li>"Most recent update"</li>
          <li>Key Documents</li>
          <li>Key Dates</li>
          <li>Key People</li>
          <li>Key Facts</li>
        </div>
        <Files caseData={caseData} />
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(DocumentsView)
