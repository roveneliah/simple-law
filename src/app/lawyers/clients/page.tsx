'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import LawyerViewLayout from '@/components/LawyerViewLayout'
import Link from 'next/link'
import AutoFlipComponent from '@/components/AutoFlip'
import { useState } from 'react'

export const CLIENTS = [
  {
    caseId: '1234',
    nickname: 'Raul v. Acme, $200000, San Diego, CA',
    note: 'Hey John, client seeking $200000 damages, based in San Diego.  Client ready to start immediately.',
    interviewBy: new Date(),
    action: 'Complete Weekly Update',
  },
  {
    caseId: '1353424534',
    nickname: 'Mary L. — Divorce, Chula Vista, CA',
    note: 'Client looking for a divorce lawyer, based in Chula Vista.',
  },
]

export default function LawyersHome() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <LawyerAppLayout>
      <LawyerViewLayout viewName="Clients" />
      {/* <div className="mb-8">
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
      </div> */}

      <AutoFlipComponent
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        className="flex w-full flex-col items-center"
      >
        <div className="w-full px-0">
          <div className="shadow bg-white">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                From ImpossibleLaw
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Hey Jerri,</p>
                <p className="mt-4">You have 2 weekly updates due soon.</p>
                <p className="mt-4">
                  We also have {CLIENTS.length} invitation
                  {CLIENTS.length > 1 && 's'} for you to check out. You've been
                  great about responding to these in detail, so we've started
                  sending your top tier cases.
                </p>
                <p className="mt-4">Keep it up!</p>
              </div>
              {/* <div className="mt-3 text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Complete Weekly Updates
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
              <div className="mt-3 text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  View CLIENTS
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div> */}
            </div>
          </div>
          {CLIENTS.map((invitation, i) => (
            <div key={i} className="shadow border-t bg-white">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {invitation.nickname}
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>{invitation.note}</p>
                </div>
                {invitation.action && (
                  <div className="mt-3 text-sm leading-6">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      {invitation.action}
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* <div className="mt-8 flex flex-row justify-start gap-4">
          <Link
            href="/lawyers/CLIENTS"
            className="h-fit whitespace-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >
            View My CLIENTS
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
