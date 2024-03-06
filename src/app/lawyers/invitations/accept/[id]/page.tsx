'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { hoursLeftStr } from '../../page'

const agreements = [
  {
    label: 'I agree to provide weekly updates.',
    description:
      'I will provide weekly updates on the case through ImpossibleLaw, and answer questions submitted through ImpossibleLaw.',
  },
  {
    label: 'I agree to not charge clients for any expenses.',
    description: 'Formal attorney relationship for ongoing matter.',
  },
]

const services = [
  {
    type: 'quick',
    label: 'Quick Consult',
    price: 50,
    description: 'No retainer quick consultation. Pay per session.',
  },
  {
    type: 'advisory',
    label: '1 Month Strategic Advisory',
    price: 250,
    description: 'Retained advisory services.  Up to 4 strategy calls.',
  },
  {
    type: 'attorney',
    label: 'Attorney',
    price: 500,
    description: 'Formal attorney relationship for ongoing matter.',
  },
]

export default function AcceptOfferPage({ params: { id } }) {
  return (
    <LawyerAppLayout>
      <AcceptOfferForm invitationId={id} />
    </LawyerAppLayout>
  )
}

export function AcceptOfferForm({ invitationId }) {
  // get invitation from supabase db
  const [invitation, setInvitation] = useState()
  useEffect(() => {
    supabase
      .from('Invitation')
      .select('*, Case(*, User(*)), Lawyer(*)')
      .eq('id', invitationId)
      .single()
      .then(({ data, error }) => {
        console.log('invitation', data)
        setInvitation(data)
      })
  }, [])

  const router = useRouter()

  const handleSendOffer = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const lawyerComment = formData.get('intro')?.toString().trim()
    const selectedServices = services.map((service, i) => {
      const isOn: boolean = formData.get(`service-${i}`) == 'on'
      return { selected: isOn, ...service }
    })

    console.log(selectedServices)

    // if no services selected
    console.log(
      selectedServices.reduce((any: boolean, service) => {
        return any || service.selected
      }, false),
    )
    // if (
    //   !selectedServices.reduce((any: boolean, service) => {
    //     return any || service.selected
    //   }, false)
    // ) {
    //   alert('Please select at least one service to accept invitation.')
    //   return
    // }

    if (formData.getAll('agreements').length !== agreements.length + 1) {
      alert('Please agree to all the agreements.')
      return
    }

    // model Service {
    //   id        String      @id @default(uuid())
    //   invitationId String?
    //   invitation Invitation? @relation(fields: [invitationId], references: [id])
    //   type      ServiceType
    //   lawyer    Lawyer      @relation(fields: [lawyerId], references: [id])
    //   lawyerId  String
    //   price     Int
    //   createdAt DateTime    @default(now())
    //   updatedAt DateTime    @updatedAt
    // }

    // update invitation with our review
    // TODO:
    // const strategyReview = await reviewStrategy(invitation)
    // const ourAnalysis = await analyzeLawyerCaseFit(invitation)

    const { data: strategyReview, error } = await fetch(
      '/api/invitations/review',
      {
        method: 'POST',
        body: JSON.stringify({ ...invitation, lawyerComment }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((res) => res.json())

    console.log(strategyReview, error)

    console.log('trying to charge on stripe...')
    const res = await fetch('/api/stripe/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: invitation.Lawyer.stripeCustomerId,
        product: 'match',
        description: `Match for Case: ${invitation.Case.id}`,
      }),
    })

    console.log('charged on stripe:', res)

    const { data, error: supabaseError } = await supabase
      .from('Invitation')
      .update({
        status: 'accepted',
        lawyerComment,
        strategyReview,
        // ourAnalysis,
      })
      .eq('id', invitationId)
      .single()

    console.log('updated invitation on supabase', data, supabaseError)

    // const { data: insertedServices, error: insertError } = await supabase
    //   .from('Service')
    //   .upsert(
    //     selectedServices.map((service, i) => ({
    //       id: uuidv4(),
    //       lawyerId: invitation.Lawyer.id,
    //       price: service.price,
    //       invitationId,
    //       type: service.type,
    //       updatedAt: new Date(),
    //     })),
    //   )
    //   .select()

    router.push(`/lawyers/invitations/${invitationId}`)
  }

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    invitation && setLoading(false)
  }, [invitation])

  if (loading) {
    return (
      <div className="mt-8 flex flex-col items-center">
        <FaceSmileIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
        <h2 className="mt-6 text-2xl font-semibold leading-6 text-gray-900">
          Loading...
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Our robots must be sleeping on the job.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-32">
        {invitation?.status !== 'accepted' ? (
          <form onSubmit={handleSendOffer}>
            <div className="">
              <div className="mt-0 border-gray-900/10">
                <h2 className="text-3xl font-bold leading-7 tracking-tighter text-gray-900">
                  Services
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  What services would you like to offer this lead?
                </p>

                <div className="space-y-10">
                  <fieldset>
                    <div className="mt-6 space-y-6">
                      {services.map((service, index) => (
                        <div key={index} className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id={`service-${index}`}
                              name={`service-${index}`}
                              type="checkbox"
                              defaultChecked={true}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor={`service-${index}`}
                              className="font-medium text-gray-900"
                            >
                              {service.label}
                            </label>
                            <p className="text-gray-500">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-2xl font-bold leading-7 tracking-tighter text-gray-900">
                  ImpossibleLaw Partner Agreements
                </h2>
                <p className="mt-2 max-w-xl text-lg font-semibold leading-6 tracking-tight text-gray-600">
                  Great service means great leads. Help build your inbound
                  funnel by committing to our service agreements.
                </p>
                <div className="mt-4 space-y-10">
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
                            <p className="text-gray-500">
                              {agreement.description}
                            </p>
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
                              Service Agreement
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="intro"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Introduction
                </label>
                <div className="mt-2">
                  <textarea
                    id="intro"
                    name="intro"
                    rows={10}
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={invitation?.lawyerComment}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  We will let the client know why you're a great fit, but you're
                  welcome to leave a friendly note. You will only be charged if
                  the client accepts your offer.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              {/* <button
            type="submit"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Save
          </button> */}
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Offer
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4">
            <p>Awaiting client response...</p>
          </div>
        )}
      </div>
    </div>
  )
}
