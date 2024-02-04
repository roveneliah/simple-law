'use client'
import AppLayout from '@/components/Layout/AppLayout'
import Link from 'next/link'
import { CaseList } from './cases/page'

export default function App() {
  return (
    <AppLayout>
      <div className="mb-8">
        <div
          style={{
            overflow: 'hidden',
            paddingBottom: '56.25%',
            position: 'relative',
            height: 0,
          }}
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
        {/* <div className="flex w-full flex-row justify-end">
          <Link href="/app/cases/new">Get Started</Link>
        </div> */}
      </div>
      <CaseList />
    </AppLayout>
  )
}
