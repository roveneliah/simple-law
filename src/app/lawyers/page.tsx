'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import LawyerViewLayout from '@/components/LawyerViewLayout'
import Link from 'next/link'
import AutoFlipComponent from '@/components/AutoFlip'
import { useState } from 'react'
import { INVITATIONS } from './invitations/page'
import { useRouter } from 'next/navigation'

export default function LawyersHome() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <LawyerAppLayout>
      <LawyerViewLayout />
      <div className="mb-8">
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
      </div>

      <AutoFlipComponent
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        className="flex w-full flex-col items-center"
      >
        <div className="w-full px-4">
          <div className="flex w-full flex-row justify-between">
            <p>Hey Jerri,</p>
            <p>{currentIndex}</p>
          </div>
          <p className="mt-4">We're glad to have you!</p>
          <p className="mt-4">
            Once you give us some basic details about your practice and goals,
            we'll start sending you cases that match your preferences.
          </p>
          <p className="mt-4">
            Our job is to make sure we can provide you the best client flow, and
            speed up the process, such that we can offer our clients the highest
            quality lawyers.{' '}
          </p>
          <div className="mt-8 flex w-full flex-row justify-center gap-4">
            <Link
              href="/lawyers/verification"
              className="h-fit text-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="w-full px-4">
          <p>Hey Jerri,</p>
          <p className="mt-4">You have 2 weekly updates due soon.</p>
          <p className="mt-4">
            We also have {INVITATIONS.length} invitation
            {INVITATIONS.length > 1 && 's'} for you to check out. You've been
            great about responding to these in detail, so we've started sending
            your top tier cases.
          </p>
          <p className="mt-4">Keep it up!</p>
          <div className="mt-8 flex w-full flex-row justify-center gap-4">
            <Link
              href="/lawyers/clients"
              className="h-fit text-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            >
              Complete Weekly Updates
            </Link>
            <Link
              href="/lawyers/invitations"
              className="h-fit text-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            >
              View Invitations
            </Link>
          </div>
        </div>
        {/* <div className="mt-8 flex flex-row justify-start gap-4">
          <Link
            href="/lawyers/invitations"
            className="h-fit whitespace-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >
            View My Invitations
          </Link>
          <Link
            href="/lawyers/clients"
            className="h-fit whitespace-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >
            Complete Weekly Updates
          </Link>
        </div> */}
      </AutoFlipComponent>
    </LawyerAppLayout>
  )
}
