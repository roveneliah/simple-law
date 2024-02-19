'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import { useInvitation } from '../../../recommendations/[invitationId]/page'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'

const agreements = [
  // {
  //   label: 'I agree to provide weekly updates.',
  //   description:
  //     'I will provide weekly updates on the case through ImpossibleLaw, and answer questions submitted through ImpossibleLaw.',
  // },
  // {
  //   label: 'I agree to not charge clients for any expenses.',
  //   description: 'Formal attorney relationship for ongoing matter.',
  // },
]

export default function Page({ params: { invitationId } }) {
  console.log(invitationId)
  const invitation = useInvitation(invitationId)
  console.log(invitation)

  const handleCreateAgreement = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    // create agreement
    if (formData.getAll('agreements').length !== agreements.length + 1) {
      alert('Please agree to all the agreements.')
      return
    }
    console.log('creating agreement for invitationId', invitationId)
    if (!invitation || !invitationId) return
    const { data, error } = await supabase
      .from('Agreement')
      .insert({
        id: uuidv4(),
        invitationId,
        caseId: invitation.caseId,
        lawyerId: invitation.lawyerId,
        contractUrl: 'https://www.google.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .single()

    console.log('creating charge for invitationId', invitationId)
  }

  return (
    <AppLayout caseId={invitation?.caseId}>
      <CaseLayout viewName="Lawyers" caseId={invitation?.caseId}>
        <form onSubmit={handleCreateAgreement}>
          <div className="border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-gray-900">
              Match with {invitation?.Lawyer?.first}
            </h2>
            <p className="text-base text-sm leading-6">
              We're glad you found a match. Once you match,{' '}
              {invitation?.Lawyer?.first} will reach out.
            </p>
          </div>
          <div className=" border-gray-900/10 pb-12">
            <h3 className="text-base font-semibold text-gray-900">
              Remember, booking with ImpossibleLaw gives you:
            </h3>
            <li className="text-base text-sm leading-6">
              Free weekly updates.
            </li>
            <li className="text-base text-sm leading-6">Free lawyer swap.</li>
          </div>
          <div className="mt-8 border-gray-900/10 pb-4">
            {/* <h2 className="text-base font-semibold leading-7 text-gray-900">
              ImpossibleLaw Client Agreements
            </h2> */}
            {/* <p className="mt-1 text-sm leading-6 text-gray-600"></p> */}
            <div className="space-y-10">
              <fieldset>
                {/* <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend> */}
                <div className="mt-6 space-y-6">
                  {agreements.map((agreement, index) => (
                    <div key={index} className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id={`agreement-${index}`}
                          name="agreements"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor={`agreement-${index}`}
                          className="font-medium text-gray-900"
                        >
                          {agreement.label}
                        </label>
                        <p className="text-gray-500">{agreement.description}</p>
                      </div>
                    </div>
                  ))}
                  <div
                    key={agreements.length}
                    className="relative flex gap-x-3"
                  >
                    <div className="flex h-6 items-center">
                      <input
                        id={`agreement-${agreements.length}`}
                        name="agreements"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor={`agreement-${agreements.length}`}
                        className="font-medium text-gray-900"
                      >
                        Impossible Agreement
                      </label>
                      <p className="text-gray-500">
                        I have read and agree to ImpossibleLaw's{' '}
                        <a
                          target="_blank"
                          href="https://www.google.com"
                          className="font-bold text-indigo-600"
                        >
                          Client Agreement
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="mt-4 flex w-full flex-row gap-4">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              <ShieldCheckIcon
                className="mr-2 h-6 w-6 flex-shrink-0 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Book
            </button>
          </div>
        </form>
      </CaseLayout>
    </AppLayout>
  )
}
