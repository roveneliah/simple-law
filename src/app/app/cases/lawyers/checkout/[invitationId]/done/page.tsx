import { useInvitation } from '@/app/app/cases/recommendations/[invitationId]/page'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'
import { supabase } from '@/lib/supabaseClient'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default async function Page({ params: { invitationId } }) {
  const { data: invitation, error } = await supabase
    .from('Invitation')
    .select('*')
    .eq('id', invitationId)
    .single()

  return (
    <AppLayout caseId={invitation?.caseId}>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ShieldCheckIcon
              className="mx-auto h-12 w-12 text-green-500"
              aria-hidden="true"
            />
            <h2 className="mt-2 text-3xl font-extrabold tracking-tighter text-gray-900">
              Thank you for accepting the invitation!
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              You will receive an email with the details of the case and the
              client's contact information.
            </p>
          </div>
          <Link
            href={`/app/cases/case/${invitation?.caseId}`}
            className="flex w-full flex-row justify-center"
          >
            <p className="mt-8 block flex w-fit items-center justify-center rounded-md border border-transparent bg-gray-600 px-3 py-1.5 text-base font-medium text-white transition-all hover:bg-gray-700">
              View Case
            </p>
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}
