'use client'
import { supabase } from '@/lib/supabaseClient'
import { TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CaseList() {
  // get cases from supabase db
  // const user = useUser()
  const [cases, setCases] = useState([])
  useEffect(() => {
    supabase
      .from('Case')
      .select('*')
      .then(({ data, error }) => {
        setCases(data)
      })
  }, [])

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
      {cases?.map((c, i) => (
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
              {/* <p>{c.description}</p> */}
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
      ))}
      <Link href={'/app'}>
        <p className="mt-8 px-3 text-center text-sm text-gray-500">
          New Case +
        </p>
      </Link>
    </div>
  )
}
