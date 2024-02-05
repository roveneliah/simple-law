'use client'
import LawyerViewLayout from '@/components/LawyerViewLayout'
import AppLayout from '@/components/Layout/AppLayout'
import { INVITATIONS } from './invitations/page'
import Link from 'next/link'

export default function Example() {
  return (
    <AppLayout>
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
      <div className="flex w-full flex-col items-center">
        <div className="w-2/3">
          <p>Hey Jerri,</p>
          <p className="mt-4">You've got 2 weekly updates due soon.</p>
          <p className="mt-4">
            We also have {INVITATIONS.length} invitation{' '}
            {INVITATIONS.length > 1 && 's'} for you to check out. You've been
            great about responding to these well, so we've started sending your
            top tier cases.
          </p>
          <p className="mt-4">Keep it up!</p>
        </div>
        <div className="mt-8 flex w-2/3 flex-row justify-start gap-4">
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
        </div>
      </div>
    </AppLayout>
  )
}
