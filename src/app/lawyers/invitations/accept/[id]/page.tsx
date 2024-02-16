'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import {
  InformationCircleIcon,
  PhotoIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { UUID } from 'crypto'
import Link from 'next/link'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { hoursLeftStr } from '../../page'
import { v4 as uuidv4 } from 'uuid'
import { openai } from '@/app/api/invitations/create/utils/createNoteForLawyer'
import {
  analyzeLawyerCaseFit,
  reviewStrategy,
} from '@/app/api/invitations/review/route'

const agreements = [
  {
    label: 'I agree to provide weekly updates.',
    description: 'No retainer quick consultation. Pay per session.',
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

export default function OffersView() {
  const invitationId = usePathname().split('/').pop()

  // get invitation from supabase db
  const [invitation, setInvitation] = useState()
  useEffect(() => {
    supabase
      .from('Invitation')
      .select('*, Case(*), Lawyer(*)')
      .eq('id', invitationId)
      .single()
      .then(({ data, error }) => {
        console.log('invitation', data)
        setInvitation(data)
      })
  }, [])

  if (!invitation) {
    return <p>Loading...</p>
  }

  // console.log(invitation)

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
    if (
      !selectedServices.reduce((any: boolean, service) => {
        return any || service.selected
      }, false)
    ) {
      alert('Please select at least one service to accept invitation.')
      return
    }

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

    const { data, error: supabaseError } = await supabase
      .from('Invitation')
      .update({
        status: 'offered',
        lawyerComment,
        strategyReview,
        // ourAnalysis,
      })
      .eq('id', invitationId)
      .single()

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
    // console.log('offered', insertedServices, insertError)

    // router.push(`/lawyers/invitations/${invitationId}`)
  }

  return (
    <LawyerAppLayout>
      <form onSubmit={handleSendOffer}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Due in {hoursLeftStr(invitation.dueBy)}.
            </p>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {invitation?.Case?.title || 'Missing Title'}
            </h2>
            <p>{invitation?.Case?.description}</p>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Services
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              What services would you like to offer this lead?
            </p>

            <div className="space-y-10">
              <fieldset>
                {/* <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend> */}
                <div className="mt-6 space-y-6">
                  {services.map((service, index) => (
                    <div key={index} className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id={`service-${index}`}
                          name={`service-${index}`}
                          type="checkbox"
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
                        <p className="text-gray-500">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              ImpossibleLaw Partner Agreements
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Please reaffirm your commitment to these agreements.
            </p>
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
                          href="www.google.com"
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
                rows={3}
                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={invitation?.lawyerComment}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              We will let the client know why you're a great fit, but you're
              welcome to leave a friendly note.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Save
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send Offer
          </button>
        </div>
      </form>
    </LawyerAppLayout>
  )
}
