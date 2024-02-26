import CaseList from '@/components/CaseList'
import AppLayout from '@/components/Layout/AppLayout'
import Link from 'next/link'

export default function App() {
  return (
    <AppLayout>
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

      <div className="mt-0">
        <h3 className="text-4xl font-bold tracking-tighter text-gray-900">
          Your Team
        </h3>
        <div className="flex flex-col justify-start -space-y-1.5">
          <div className="flex flex-row items-center gap-1 text-gray-500 hover:text-gray-900">
            <p>{'-->'}</p>
            <Link
              href={`/app/cases`}
              className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
            >
              find an advisor
            </Link>
          </div>
          <div className="flex flex-row items-center gap-1 text-gray-500 hover:text-gray-900">
            <p>{'-->'}</p>
            <Link
              href={`/app/cases`}
              className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
            >
              find a lawyer
            </Link>
          </div>
          <div className="flex flex-row items-center gap-1 text-gray-500 hover:text-gray-900">
            <p>{'-->'}</p>
            <Link
              href={`/app/cases`}
              className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
            >
              services
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-4xl font-bold tracking-tighter text-gray-900">
          Documents
        </h3>

        <div className="flex flex-col justify-start -space-y-1.5">
          <div className="flex flex-row items-center gap-1 text-gray-500 hover:text-gray-900">
            <p>{'-->'}</p>
            <Link
              href={`/app/cases`}
              className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
            >
              what is an agreement?
            </Link>
          </div>
          <div className="flex flex-row items-center gap-1 text-gray-500 hover:text-gray-900">
            <p>{'-->'}</p>
            <Link
              href={`/app/cases`}
              className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
            >
              draft an agreement
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16"></div>
    </AppLayout>
  )
}
