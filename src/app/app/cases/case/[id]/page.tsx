import { redirect } from 'next/navigation'

export default function CaseView({ params: { id } }) {
  return redirect(`/app/cases/case/${id}/settings`)
}
