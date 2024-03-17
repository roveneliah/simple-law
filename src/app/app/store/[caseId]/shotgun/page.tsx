'use client'
import LawyersTable from '@/components/LawyersTable'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

function ShotgunStrategyPage({ params: { caseId } }) {
  return (
    <AppLayout caseId={caseId}>
      <div className="container mx-auto">
        <div className="relative">
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
        <div className="mt-8">
          <p className="h3 w-fit bg-yellow-300">
            2 Written Legal Opinions, 48 hours, $100
          </p>
          <h1 className="h1 mb-4 ">Shotgun Strategy</h1>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="h2 mb-4">How it works</h2>
            <ol className="p mb-8 flex list-inside list-decimal flex-col gap-2">
              <div className="flex flex-row items-start gap-2">
                <div>
                  <ShieldCheckIcon className="mt-1 h-5 w-5" />
                </div>
                Pick your lawyers.
              </div>
              <div className="flex flex-row items-start gap-2">
                <div>
                  <ShieldCheckIcon className="mt-1 h-5 w-5" />
                </div>
                Our system matches you with 2 verified attorneys specializing in
                your area of need
              </div>
              <div className="flex flex-row items-start gap-2">
                <div>
                  <ShieldCheckIcon className="mt-1 h-5 w-5" />
                </div>
                Receive written legal opinions from both attorneys within 48
                hours.
              </div>
              <div className="flex flex-row items-start gap-2">
                <div>
                  <ShieldCheckIcon className="mt-1 h-5 w-5" />
                </div>
                Get clarification or ask follow-up questions
              </div>
            </ol>
          </div>
          {/* <div>
            <img
              src="/sanity-check.jpg"
              alt="Sanity Check"
              className="w-full rounded shadow-lg"
            />
          </div> */}
          <div className="mt-0">
            <h2 className="h2 mb-4">What's Included</h2>
            <ul className="p mb-8 list-inside list-disc">
              <li>Submission of one legal situation or question</li>
              <li>2 written legal opinions from verified attorneys</li>
              <li>48 hour turnaround time</li>
              <li>Ability to ask clarifying questions</li>
              <li>100% satisfaction guarantee</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="h2">Build Your Team</h2>
          <h4 className="h4 mb-4">Choose from our top picks</h4>
          <LawyersTable caseId={caseId} />
        </div>

        <div className="rounded bg-gray-100 p-8">
          <h5 className="h5 mb-4">Sanity Check</h5>
          <p className="p-sm mb-4">$199</p>
          <Link
            href={process.env.NEXT_PUBLIC_STRIPE_SHOTGUN2}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Add to Cart
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}

export default ShotgunStrategyPage
