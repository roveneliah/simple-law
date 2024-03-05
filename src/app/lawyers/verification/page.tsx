'use client'
import AutoFlipComponent from '@/components/AutoFlip'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import { useLawyerUser } from '@/lib/useUser'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'
import VerificationForm from './form/page'
import InvitationsView from '../invitations/[id]/page'
import LawyerViewLayout from '@/components/LawyerViewLayout'
import { Lawyer } from '@prisma/client'
import Image from 'next/image'
import charlie from '@/images/resources/charlie.png'

const LAWYER_DEMO_URL = '/lawyers/demo'

function VerificationSidebar({ view, setView }) {
  return (
    <div className="w-81 border-r bg-slate-100 px-8 pt-8">
      <div className="items-left flex flex-col">
        <h2 className="mt-6 text-2xl font-semibold leading-6 text-gray-900">
          Verification
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Get verified to start receiving free inbound.
        </p>
      </div>
      <div>
        <button onClick={() => setView('start')}>
          <div className="mt-4 flex flex-row gap-2">
            <div className="flex flex-row items-center justify-center rounded-full border bg-white">
              <p className="px-2">1</p>
            </div>

            <p className="text-sm font-medium">Who we are.</p>
          </div>
        </button>
      </div>
      {/* <div>
        <a href={LAWYER_DEMO_URL} target="_blank">
          <div className="mt-4 flex flex-row gap-2">
            <div className="flex flex-row items-center justify-center rounded-full border bg-white">
              <p className="px-2">1</p>
            </div>

            <p className="text-sm font-medium">Demo</p>
          </div>
        </a>
      </div> */}
      <div>
        <button onClick={() => setView('verification')}>
          <div className="mt-4 flex flex-row gap-2">
            <div className="flex flex-row items-center justify-center rounded-full border bg-white">
              <p className="px-2">2</p>
            </div>

            <p className="text-sm font-medium">Verification</p>
          </div>
        </button>
      </div>
      <div>
        <button onClick={() => setView('bar')}>
          <div className="mt-4 flex flex-row gap-2">
            <div className="flex flex-row items-center justify-center rounded-full border bg-white">
              <p className="px-2">2</p>
            </div>

            <p className="text-sm font-medium">Bar Membership</p>
          </div>
        </button>
      </div>
    </div>
  )
}

function VerificationLayout({}) {
  const [view, setView] = useState('start')
  return (
    <div className="flex h-[100vh] w-full flex-row">
      <VerificationSidebar view={view} setView={setView} />
      <div className="flex w-full flex-row justify-center">
        {view === 'start' && <StartView setView={setView} />}
        {view === 'verification' && <VerificationForm />}
      </div>
    </div>
  )
}
export default function VerificationPage2() {
  return <VerificationLayout view="start" />
}

function StartView({ setView }) {
  return (
    <div className="no-scrollbar flex w-full flex-row justify-center overflow-y-auto pb-32">
      <div className="mt-16 max-w-3xl">
        <h3 className="w-fit bg-yellow-300 text-4xl font-bold tracking-tighter text-gray-900">
          Your incentive-aligned leads partner.
        </h3>
        {/* <p className="w-fit bg-yellow-300">
          Would be great to have some flow that's both a sell AND onboarding...
        </p> */}

        <div className="relative mb-0 mt-8 bg-slate-50 p-4">
          <div
            style={{
              overflow: 'hidden',
              paddingBottom: '56.25%',
              position: 'relative',
              height: 0,
            }}
            className="rounded-lg"
          >
            <iframe
              style={{
                left: 0,
                top: 0,
                height: '100%',
                width: '100%',
                position: 'absolute',
              }}
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {/* <div className="absolute bottom-4 left-4">
            <div className="flex w-full flex-row justify-center gap-4">
              <a
                href={LAWYER_DEMO_URL}
                target="_blank"
                className="h-fit text-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              >
                Try the Demo
              </a>
            </div>
          </div> */}
        </div>
        <div className="-mt-4 flex w-full flex-row bg-slate-50 px-6 pt-8">
          <div className="flex w-full flex-col justify-between bg-slate-50">
            <div>
              <p className="text-2xl font-bold tracking-tighter">
                ImpossibleLaw
              </p>
              {/* <p className="mt-2">
              We're picky, so we're happy to pass on big value to the lawyers
              that make this possible.
            </p> */}
              {/* <p className="mt-4">Free leads. Match for $250.</p> */}
              <div className="mt-4 flex flex-row items-start gap-2">
                <div className="mt-0.5 h-fit">
                  <CheckBadgeIcon className="h-5 w-5" />
                </div>
                <p className="">
                  <span className="font-bold text-gray-900">FREE.</span> Access
                  leads for free, and only pay when you match with a client.
                </p>
              </div>
              <div className="mt-4 flex flex-row items-start gap-2">
                <div className="mt-0.5 h-fit">
                  <CheckBadgeIcon className="h-5 w-5" />
                </div>
                <p className="">
                  <span className="font-bold text-gray-900">
                    Flat rate $250 per match.
                  </span>{' '}
                  No hidden fees. No monthly fees. No matter the size of the
                  case.
                </p>
              </div>
            </div>

            <div className="mt-8 flex w-full flex-row justify-center gap-4">
              <a
                href={LAWYER_DEMO_URL}
                target="_blank"
                className="h-fit text-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              >
                Try the Demo
              </a>
            </div>
          </div>
          <div className="flex w-full flex-col justify-between bg-slate-50">
            <div>
              <p className="text-2xl font-bold tracking-tighter">Pro</p>
              {/* <p className="mt-2">Pays off in 1 match.</p> */}
              {/* <p className="mt-4">Free leads. Match for $250.</p> */}
              <div className="mt-4 flex flex-row items-start gap-2">
                <div className="mt-0.5 h-fit">
                  <CheckBadgeIcon className="h-5 w-5" />
                </div>
                <p className="">
                  <span className="font-bold text-gray-900">
                    Flat rate $99 per match.
                  </span>{' '}
                  No hidden fees. No monthly fees. No matter the size of the
                  case.
                </p>
              </div>
              <div className="mt-4 flex flex-row items-start gap-2">
                <div className="mt-0.5 h-fit">
                  <CheckBadgeIcon className="h-5 w-5" />
                </div>
                <p className="">
                  <span className="font-bold text-gray-900">$50 month.</span>{' '}
                  Pays off in 1 match!
                </p>
              </div>
            </div>

            <div className="mt-8 flex w-full flex-row justify-center gap-4">
              <a
                href={LAWYER_DEMO_URL}
                target="_blank"
                className="h-fit text-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              >
                Try the Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function VerificationPage() {
  const user = useLawyerUser()

  const [loading, setLoading] = useState(false)
  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    setLoading(true)

    // Gather data from the form
    const formData = new FormData(event.target)
    const updatedData = {
      id: user?.id,
      first: formData.get('first-name')?.toString().trim(),
      last: formData.get('last-name')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      // street_address: formData.get('street-address'),
      // city: formData.get('city'),
      // region: formData.get('region'),
      // postal_code: formData.get('postal-code'),
      // Add more fields as necessary
    }

    const { data, error } = await fetch('/api/lawyers/verification', {
      method: 'POST',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())

    console.log(updatedData)

    setLoading(false)

    if (error) {
      alert('Failed to update profile: ' + error.message)
    } else {
      alert('Profile updated successfully!')
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  return <LawyerAppLayout></LawyerAppLayout>
}
