// 'use client'
import CaseList from '@/components/CaseList'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'

export default function Cases() {
  return (
    <AppLayout>
      <div className="h-[80vh]">
        <CaseList />
      </div>
    </AppLayout>
  )
}
