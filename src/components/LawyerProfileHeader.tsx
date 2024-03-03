import Link from 'next/link'

export function LawyerProfileHeader({ lawyer, status, view }: any) {
  return (
    <div className="flex flex-row justify-between">
      <div className="w-fit">
        <h1 className="text-5xl font-bold tracking-tighter">
          Impossible{' '}
          <span className="underline decoration-amber-300">Gold</span>
        </h1>

        <div className="flex flex-row flex-wrap gap-2 gap-y-0 text-4xl font-bold tracking-tighter text-gray-400">
          <Link href={'/lawyers/perks'}>
            <p
              className={`transition-all hover:text-gray-500 ${view === 'perks' && 'text-gray-600'} `}
            >
              perks
            </p>
          </Link>
          <Link href={'/lawyers/account'}>
            <p
              className={`transition-all hover:text-gray-500 ${view === 'account' && 'text-gray-600'} `}
            >
              account settings
            </p>
          </Link>
          {/* <Link href={'/lawyers/verification'}>
              <p
                className={`transition-all hover:text-gray-500 ${view === 'verification' && 'text-gray-600'} `}
              >
                verification
              </p>
            </Link> */}

          <Link href={'/lawyers/membership'}>
            <p
              className={`transition-all hover:text-gray-500 ${view === 'membership' && 'text-gray-600'} `}
            >
              membership
            </p>
          </Link>
          <Link href={'/lawyers/account/billing'}>
            <p
              className={`transition-all hover:text-gray-500 ${view === 'billing' && 'text-gray-600'} `}
            >
              billing
            </p>
          </Link>
          <Link href={'/lawyers/profile/' + lawyer.id}>
            <p
              className={`transition-all hover:text-gray-500 ${view === 'billing' && 'text-gray-600'} `}
            >
              profile
            </p>
          </Link>
        </div>
      </div>
      <div className=" h-48 w-96 rounded-md border border-slate-900 bg-slate-600 shadow-sm shadow-black/50">
        <div className="px-4 py-4">
          <div className="flex w-full flex-row justify-between gap-2">
            <p className="font-bold tracking-tighter text-gray-100">
              {lawyer.first} {lawyer.last}
            </p>
            {lawyer.verified ? (
              <p className="w-fit bg-amber-400 px-1 text-sm font-bold capitalize tracking-tighter text-black">
                {status}
              </p>
            ) : (
              <Link
                href="/lawyers/verification"
                className="w-fit bg-slate-900 px-1 text-sm font-bold capitalize tracking-tighter text-black text-white"
              >
                Unverified
              </Link>
            )}
          </div>
          <p className="text-sm font-bold tracking-tighter text-gray-400">
            Member Since '24
          </p>
          <p className="text-sm font-bold tracking-tighter text-gray-400">
            4 Cases
          </p>
          <p className="text-sm font-bold tracking-tighter text-gray-400">
            12 Clients
          </p>
          <p className="text-sm font-bold tracking-tighter text-gray-400">
            $50000 Earned
          </p>
        </div>
      </div>
    </div>
  )
}
