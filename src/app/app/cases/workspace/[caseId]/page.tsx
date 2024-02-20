import { redirect } from 'next/navigation'

export default function CaseView({ params: { caseId } }) {
  return redirect(`${caseId}/updates`)
}
