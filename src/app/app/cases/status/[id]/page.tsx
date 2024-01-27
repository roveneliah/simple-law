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
      <CaseLayout viewName="Status" id={id}>
        <p>{name}</p>
        <p className="transition-all hover:animate-pulse hover:cursor-pointer hover:text-orange-500">
          {description}
        </p>
        <p className="transition-all hover:animate-pulse hover:cursor-pointer hover:text-orange-500">
          Hi Eli, tell us some more about your case so we can pair you with a
          trusted{' '}
          <span className="cursor-pointer transition-all hover:font-medium hover:text-purple-400">
            attorney
          </span>
          .
        </p>
        <p className="transition-all hover:animate-pulse hover:cursor-pointer hover:text-orange-500">
          Hi Eli, we're in the process of finding you a lawyer. First, please{' '}
        </p>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(CaseView)
