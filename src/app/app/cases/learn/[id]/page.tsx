'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'
import { withCaseData } from '@/components/withCaseData'

function LearnView() {
  return (
    <AppLayout>
      <CaseLayout viewName="Learn">
        <p>Learn</p>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(LearnView)
