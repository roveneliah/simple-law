// import { MenubarDemo } from '@/components/MenubarDemo'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/lib/useUser'
import abstractBackgroundImage from '@/images/resources/abstract-background.png'
import castleBackgroundImage from '@/images/resources/castle.png'
import Image from 'next/image'

function ChildViewHeader({ email, handleSignOut, caseId }) {
  return (
    <div className="mb-4 mt-8 flex w-full flex-row items-center justify-between pb-4">
      <div className="w-1/3">
        <Link href={caseId ? `/app/cases/case/${caseId}` : '/app'}>
          <p className="text-xl font-extrabold">
            IMPOSSIBLE
            <span className="font-light text-gray-600">Law</span>
          </p>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-end gap-4">
        <Link
          href="/app/cases"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-600 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900/50"
        >
          Cases
        </Link>
        <Link
          href="/app/account"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-600 ring-0 ring-inset ring-gray-300 transition-colors hover:text-gray-900/50"
        >
          Account
        </Link>
      </div>
      {/* <AccountMenu email={email} handleSignOut={handleSignOut} /> */}
    </div>
  )
}

export default function AppLayout({ children, caseId }: any) {
  const user = useUser()
  // const caseData = useCase(caseId)

  if (!user) {
    return <div>Loading...</div>
  }

  const handleSignOut = async (e) => {
    e.preventDefault()
    supabase.auth.signOut()
  }

  console.log(caseId)

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
        <div className="flex w-full max-w-2xl flex-col overflow-y-auto rounded-md">
          <ChildViewHeader
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
