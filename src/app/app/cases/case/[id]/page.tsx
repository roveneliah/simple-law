'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import { withCaseData } from '@/components/withCaseData'
import { CASES } from '@/data/dummy'
import { NextPageContext } from 'next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function CaseView({ caseData }) {
  const { id, name, description } = caseData || {
    id: null,
    name: null,
    description: null,
  }
  return (
    <AppLayout>
      <CaseLayout viewName="Case" id={id}>
        <p>{id}</p>
        <p>{name}</p>
        <p>{description}</p>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(CaseView)
