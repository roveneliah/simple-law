'use client'

import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import { withCaseData } from '@/components/withCaseData'

function LearnView() {
  return (
    <AppLayout>
      <CaseLayout viewName="Help">
        <p>Help</p>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(LearnView)
