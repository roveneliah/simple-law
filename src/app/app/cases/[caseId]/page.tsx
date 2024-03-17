'use client'
import CaseList from '@/components/CaseList'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'
import { CaseHeader } from '../case/[caseId]/[view]/CaseHeader'
import { useCase } from '@/lib/useCase'

export default function Cases({ params: { caseId } }) {
  const caseData = useCase(caseId)
  console.log(caseData)

  const openInvites = caseData?.Invitation.filter(
    (invite) => invite.status === 'open',
  )

  console.log(openInvites)

  return (
    <AppLayout>
      <CaseHeader title={caseData?.title} caseId={caseId} view={'home'} />
      {openInvites?.map((invite, i) => (
        <div key={i} className="rounded-md bg-gray-50 p-4">
          <p>
            You have an open invite from {invite.Lawyer.first}{' '}
            {invite.Lawyer.last}
          </p>
        </div>
      ))}
    </AppLayout>
  )
}
