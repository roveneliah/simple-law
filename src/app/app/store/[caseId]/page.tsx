'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'
import Image from 'next/image'
import Link from 'next/link'
import lawyer1 from '@/images/resources/lawyers1.png'
import lawyer2 from '@/images/resources/lawyers2.png'
import { useCase } from '@/lib/useCase'
import SanityProduct from '../v1/sanity/page'

export default function HelpStore({ params: { caseId } }) {
  const caseData = useCase(caseId)

  return (
    <AppLayout caseId={caseId}>
      <div className="mt-0 flex h-full flex-col">
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
        <h1 className="h1">Shop Impossible</h1>
        <h3 className="h3"></h3>

        <div className="mt-8 flex h-[50vh] w-full flex-row gap-4">
          <div className="group relative h-full  w-full overflow-hidden rounded-lg bg-gray-700 text-white ">
            <div className="mx-6 mt-8">
              <Link href={`${caseId}/sanity`}>
                <div className="flex w-full flex-row items-center justify-between">
                  <h3 className="h3">Sanity Check</h3>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                </div>
              </Link>

              <p className="text-md mt-8">
                Two strategy reviews of a current legal strategy.
              </p>
            </div>
            <div className="absolute bottom-0 h-1/2 w-full rounded-lg bg-black/70 p-2 text-white transition-all group-hover:h-2/3">
              <Image src={lawyer1} alt="" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="group relative h-full w-full overflow-hidden rounded-lg bg-gray-700 text-white">
            <div className="mx-6 mt-8">
              <Link href={`${caseId}/shotgun`}>
                <div className="flex w-full flex-row items-center justify-between">
                  <h3 className="h3">Shotgun Strategy</h3>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
              <p className="text-md mt-8">
                Our signature product. Get 3 opinions on your situation.
              </p>
            </div>
            <div className="absolute bottom-0 h-1/2 w-full rounded-lg bg-black/70 p-2 text-white transition-all group-hover:h-2/3">
              <Image src={lawyer2} alt="" layout="fill" objectFit="cover" />
            </div>{' '}
          </div>
          <div className="group relative h-full w-full overflow-hidden rounded-lg bg-gray-700 text-white">
            <div className="mx-6 mt-8">
              <Link href="/app/shop/lawyer-finder">
                <div className="flex w-full flex-row items-center justify-between">
                  <h3 className="h3">Lawyer Finder</h3>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
              <p className="text-md mt-8">
                Just want a lawyer? No problem, we’ll conduct custom interviews
                based on your case.
              </p>
            </div>
            <div className="absolute bottom-0 h-1/2 w-full rounded-lg bg-black/70 p-2 text-white transition-all group-hover:h-2/3"></div>
          </div>
        </div>
      </div>
      <CaseLayout viewName="Help">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <p className="text-2xl font-medium">Help</p>
          </div>
          <button
            type="button"
            className="whitespace-nowrap rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            The Panic Button 🚨
          </button>
        </div>
        <p className="mt-4">
          We're can find you a lawyer fast and for free, but if you need
          immediate help, the panic button will get you a lawyer on the phone
          right now for a flat fee.
        </p>
        <div className="mt-4">
          <p className="text-lg font-medium">Common Questions</p>
          <div>
            <p>Do I have a solid case?</p>
            <p></p>
          </div>
          <div>
            <p>Do I really need to hire a lawyer?</p>
            <p></p>
          </div>
          <div>
            <p>What should I look for in a lawyer?</p>
            <p></p>
          </div>
          <div>
            <p>What should I look out for?</p>
            <p></p>
          </div>
          <div>
            <p>How much will this end up costing?</p>
            <p></p>
          </div>
        </div>
      </CaseLayout>
    </AppLayout>
  )
}

// export default withCaseData(HelpStore)
