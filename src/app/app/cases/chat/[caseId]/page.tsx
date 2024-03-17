'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'
import { withCaseData } from '@/components/withCaseData'

function ChatView() {
  return (
    <AppLayout>
      <CaseLayout viewName="Chat">
        <p>Chat</p>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(ChatView)
