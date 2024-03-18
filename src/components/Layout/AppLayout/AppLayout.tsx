'use client'
import { supabase } from '@/lib/supabaseClient'
import { useSession, useUser } from '@/lib/useUser'
import { getUserAvatarUrlById } from '@/app/app/account/page'
import { ChildViewHeader } from './ChildViewHeader'
import Image from 'next/image'
import abstractBackgroundImage from '@/images/resources/abstract-background.png'
import Sidebar from '../LawyerAppLayout/Sidebar'
import { useCase } from '@/lib/useCase'

export default function AppLayout({ children, caseId, loadingManual }: any) {
  const user = useSession()?.user
  const userImageUrl = getUserAvatarUrlById(user?.id)

  const handleSignOut = async (e) => {
    e.preventDefault()
    supabase.auth.signOut()
  }

  const caseData = useCase(caseId)

  const loading = !user || loadingManual

  if (loading) {
    return (
      <div className="no-scrollbar relative flex h-[100vh] flex-row overflow-y-auto">
        {/* Background Image Container */}

        <div
          className={`${loading ? 'visible' : 'hidden'} absolute inset-0 z-50 transition-all`}
        >
          {/* <Image
            src={abstractBackgroundImage}
            alt=""
            layout="fill"
            objectFit="cover"
            className="absolute z-0"
          /> */}
          <div className="absolute inset-0 flex flex-col items-center justify-start bg-white/20 backdrop-blur-md">
            <p className="mt-[40vh] text-4xl font-bold tracking-tighter">
              impossible<span className="font-light">law</span>
            </p>
          </div>
        </div>
        {/* Sidebar Placeholder - Uncomment or modify according to your setup */}
        {/* <Sidebar caseId={caseId} /> */}

        {/* Main Content Area */}
        <div className="no-scrollbar z-10 flex h-full w-full flex-col items-center py-4">
          <div className="no-scrollbar flex h-full w-full flex-col overflow-x-hidden rounded-md">
            <ChildViewHeader
              userImageUrl={userImageUrl}
              email={user?.email}
              caseId={caseId}
              handleSignOut={handleSignOut}
            />
            <div className="w-full max-w-3xl">{children}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-[100vh] w-full flex-row overflow-y-auto">
      {/* Background Image Container */}

      {/* Sidebar Placeholder - Uncomment or modify according to your setup */}
      <Sidebar caseId={caseId} />

      {/* Main Content Area */}
      <div className="z-10 flex w-full flex-col items-center overflow-y-auto px-8 pt-4">
        <div className="no-scrollbar flex w-full max-w-4xl flex-col overflow-x-hidden rounded-md">
          {/* <ChildViewHeader
            userImageUrl={userImageUrl}
            email={user?.email}
            caseId={caseId}
            handleSignOut={handleSignOut}
            caseTitle={caseData?.title}
          /> */}
          <div className="mt-8 w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}
