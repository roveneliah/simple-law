'use client'
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useSession } from '@/lib/useUser'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function CaseSwitcherDropdown({ caseId }: any) {
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

  const [selected, setSelected] = useState(null)
  useEffect(() => {
    // set selected to the entry in cases with matching id
    if (!caseId || !cases.length) return
    const selectedCase = cases.find(({ id }) => id === caseId)
    setSelected(selectedCase)
  }, [caseId, cases.length])

  if (!cases)
    return (
      <Link href={'/app/cases/new'} className="text-xl font-bold text-gray-500">
        New Case
      </Link>
    )

  return (
    <div className="z-50 whitespace-nowrap tracking-tighter">
      <Listbox value={selected} onChange={setSelected}>
        <div className="mt-0 ">
          {/* <Listbox.Button className="relative w-full cursor-default rounded-lg border bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500  focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selected?.title || 'Select Case'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button> */}
          <Listbox.Button className="w-full cursor-default rounded-lg border py-2 text-left hover:bg-gray-100 focus:outline-none focus-visible:border-indigo-500  focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <p className="text-md text-center font-medium tracking-tighter text-gray-500">
              {selected?.title || 'Select Case'}
            </p>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-64 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {cases.map((caseData, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={caseData}
                >
                  <Link
                    href={
                      caseData?.readyForInvitation
                        ? `/app/cases/case/${caseData.id}`
                        : `/app/cases/new/${caseData.id}`
                    }
                  >
                    <span
                      className={`block truncate ${
                        selected?.id == caseData.id
                          ? 'font-medium'
                          : 'font-normal'
                      }`}
                    >
                      {caseData?.title}
                    </span>

                    {selected?.id === caseData.id ? (
                      <span className="absolute inset-y-0 right-4 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                    {!caseData?.readyForInvitation && (
                      <span className="absolute inset-y-0 right-4 flex items-center pl-3 text-amber-600/70">
                        Draft
                      </span>
                    )}
                  </Link>
                </Listbox.Option>
              ))}

              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-4 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={null}
              >
                {({ selected }) => (
                  <Link href={`/app/cases/new`}>
                    <span className={`font-normal' block truncate`}>
                      New Case +
                    </span>
                  </Link>
                )}
              </Listbox.Option>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
