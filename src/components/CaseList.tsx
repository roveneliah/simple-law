'use client'
import { supabase } from '@/lib/supabaseClient'
import { useSession } from '@/lib/useUser'
import { TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CaseList() {
  // get cases from supabase db
  // const user = useUser()
  const [cases, setCases] = useState([])
  const session = useSession()
  useEffect(() => {
    const userId = session?.user?.id
    if (!userId) return
    supabase
      .from('Case')
      .select('*')
      .eq('userId', userId)
      .then(({ data, error }) => {
        setCases(data)
      })
  }, [session?.user?.id])

  const handleDeleteCase = async (id) => {
    const { data, error } = await supabase.from('Case').delete().eq('id', id)
    if (error) {
      console.error('Error deleting case:', error)
      return
    }
    console.log('Deleted case:', data)
    setCases(cases.filter((c) => c.id !== id))
  }

  return (
    <div className="flex w-full flex-col space-y-0">
      {/* {cases?.map((c, i) => (
        <div
          key={i}
          className="group flex h-full flex-row justify-between gap-8 rounded-md px-0 py-2 transition-all hover:bg-gray-50"
        >
          <Link
            key={i}
            href={'/app/cases/case/' + c.id}
            className="-m-4 w-full p-4"
          >
            <div className="w-full">
              <p className="w-full text-base text-sm font-normal">{c.title}</p>
            </div>
          </Link>
          <div className="flex h-full flex-col justify-center group-hover:flex">
            <button onClick={() => handleDeleteCase(c.id)}>
              <TrashIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      ))} */}
      <h3 className="text-6xl font-bold tracking-tighter text-gray-900">
        Cases
      </h3>
      {cases?.map((c, i) => (
        <div
          key={i}
          className="flex w-full flex-row items-center gap-1 text-gray-500 hover:text-gray-900"
        >
          <p>{'-->'}</p>
          <Link
            href={`/app/cases/case/${c.id}`}
            className="text-2xl font-bold tracking-tighter text-gray-500 transition-all hover:text-gray-900"
          >
            {c?.title}
          </Link>
        </div>
      ))}
      <div className="flex w-fit  flex-row items-center gap-1 text-gray-500/30 hover:text-gray-900">
        <p>{'-->'}</p>
        <Link
          href={`/app/cases/new`}
          className="text-2xl font-bold tracking-tighter  transition-all hover:text-gray-900"
        >
          New Case
        </Link>
      </div>
    </div>
  )
}
