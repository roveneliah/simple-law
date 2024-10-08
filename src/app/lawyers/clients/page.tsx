'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout/LawyerAppLayout'
import AutoFlipComponent from '@/components/AutoFlip'
import { useState } from 'react'
import { useLawyerUser } from '@/lib/useUser'
import Link from 'next/link'
import { Agreement, User } from '@prisma/client'

export const CLIENTS = [
  {
    caseId: '1234',
    name: 'John Doe',
    status: 'Weekly update due in 3 days',
    nickname: 'Raul v. Acme, $200000, San Diego, CA',
    note: 'Hey John, client seeking $200000 damages, based in San Diego.  Client ready to start immediately.',
    interviewBy: new Date(),
    action: 'Complete Weekly Update',
  },
  {
    name: 'Jane Doe',
    status: 'Weekly update due in 3 days',
    caseId: '1353424534',
    nickname: 'Mary L. — Divorce, Chula Vista, CA',
    note: 'Client looking for a divorce lawyer, based in Chula Vista.',
  },
]

export default function LawyersHome() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lawyer = useLawyerUser()

  // reduce agreements to unique clients, avoiding overlap
  const clients = lawyer.Agreement?.reduce((acc, agreement: Agreement) => {
    if (!acc.find((client: User) => client.id === agreement.Case.User.id)) {
      acc.push({
        id: agreement.Case.User.id,
        name: [agreement.Case.User.first, agreement.Case.User.last].join(' '),
        summary: agreement.Case.summary,
      })
    }
    return acc
  }, [])

  return (
    <LawyerAppLayout>
      {/* <LawyerViewLayout viewName="Clients" /> */}
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
      <div>
        <h1 className="text-5xl font-bold tracking-tighter">Clients</h1>
      </div>

      <AutoFlipComponent
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        className="mt-4 flex w-full flex-col items-center"
      >
        <div className="w-full px-0">
          {clients?.map((client, i) => (
            <Link href={`/lawyers/clients/${client.id}`} key={i} className="">
              <div className="group px-0 py-5">
                <h3 className="w-fit text-base font-semibold leading-6 text-gray-900 transition-all group-hover:bg-yellow-300">
                  {client.name}
                </h3>
                <div className="mt-1 max-w-xl text-sm text-gray-500 transition-all group-hover:text-gray-900">
                  <p>{client.summary}</p>
                </div>
                {/* {invitation.action && (
                  <div className="mt-3 text-sm leading-6">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      {invitation.action}
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                )} */}
              </div>
            </Link>
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
