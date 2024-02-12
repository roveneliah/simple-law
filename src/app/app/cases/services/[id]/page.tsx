'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import MagicText from '@/components/vibes/MagicText'
import { withCaseData } from '@/components/withCaseData'
import { useCase } from '@/lib/useCase'
import { useUser } from '@/lib/useUser'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function CaseView() {
  const caseId = usePathname().split('/').pop()

  return (
    <AppLayout>
      <CaseLayout viewName="Services" id={caseId}>
        <div className="">
          <p>Recommend and explain services GIVEN the case details.</p>
          <li>Second Opinion</li>
          <li>Quick Consult</li>
          <li>Sanity Check</li>
          <li>Attorney Match</li>
          <li>Advisory</li>
        </div>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(CaseView)
