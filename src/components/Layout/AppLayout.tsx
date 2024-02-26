'use client'
// import { MenubarDemo } from '@/components/MenubarDemo'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { useSession, useUser } from '@/lib/useUser'
import abstractBackgroundImage from '@/images/resources/abstract-background.png'
import castleBackgroundImage from '@/images/resources/castle.png'
import Image from 'next/image'
import { FALLBACK_AVATAR } from '@/data/dummy'
import AccountMenu from './AccountMenu'

function ChildViewHeader({ email, handleSignOut, caseId, userImageUrl }) {
  return (
    <div className="mb-4 mt-8 flex w-full flex-row items-center justify-between pb-4">
      {/* <div className="w-1/3">
        <Link href={caseId ? `/app/cases/case/${caseId}` : '/app'}>
          <p className="text-xl font-extrabold">
            IMPOSSIBLE
            <span className="font-light text-gray-600">Law</span>
          </p>
        </Link>
      </div> */}
      <div className="mt-1 w-1/3">
        <Link href={caseId ? `/app/cases/case/${caseId}` : '/app'}>
          <p className="text-xl font-bold tracking-tighter">impossible.</p>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-end gap-4 tracking-tighter">
        <div>
          <Link
            href="/app/cases"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
          >
            cases
          </Link>
        </div>
        <div>
          <Link
            href="/app/advisors"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
          >
            advisors
          </Link>
        </div>
        {/* <div>
          <Link
            href="/app/account"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-lg font-bold text-gray-500 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900"
          >
            <img
              src={userImageUrl}
              alt=""
              width={40}
              height={40}
              className="mt-2 rounded-full bg-blue-100 p-0.5"
            />
          </Link>
        </div> */}
        <div>
          <AccountMenu
            userImageUrl={userImageUrl}
            email={email}
            handleSignOut={handleSignOut}
          />
        </div>
      </div>
    </div>
  )
}

export default function AppLayout({ children, caseId }: any) {
  const user = useSession()?.user
  // const caseData = useCase(caseId)
  console.log(user)

  if (!user) {
    return <div>Loading...</div>
  }

  const handleSignOut = async (e) => {
    e.preventDefault()
    supabase.auth.signOut()
  }

  return (
    <div className="relative flex min-h-[100vh] flex-row">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={abstractBackgroundImage}
          alt=""
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
      </div>

      {/* Sidebar Placeholder - Uncomment or modify according to your setup */}
      {/* <Sidebar caseId={caseId} /> */}

      {/* Main Content Area */}
      <div className="z-10 flex w-full flex-col items-center py-4">
        <div className="flex w-full max-w-2xl flex-col overflow-y-auto overflow-x-hidden rounded-md">
          <ChildViewHeader
            userImageUrl={FALLBACK_AVATAR}
            email={user.email}
            caseId={caseId}
            handleSignOut={handleSignOut}
          />
          {children}
        </div>
      </div>
    </div>
  )
}
