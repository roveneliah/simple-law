import AppLayout from '@/components/Layout/AppLayout'
import Link from 'next/link'

export default function App() {
  return (
    <AppLayout>
      <div className="mt-0 flex flex-col">
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

        <div className="mt-0 flex flex-row items-center gap-4 self-center">
          <Link
            href="/app/cases/new"
            className="w-32 rounded-lg bg-gray-900 px-4 py-3 text-center font-medium text-white"
          >
            Get Started
          </Link>
          <Link
            href="/app/demo"
            className="w-32 rounded-lg border border-gray-900 px-4 py-3 text-center"
          >
            Try Demo
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}
