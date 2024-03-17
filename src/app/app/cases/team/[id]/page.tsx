'use client'
import CaseTeamTable from '@/components/CaseTeam'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'

import { useUser } from '@/lib/useUser'
import Link from 'next/link'
import { CaseHeader } from '../../case/[caseId]/[view]/CaseHeader'
import { useCase } from '@/lib/useCase'

function TeamGrid(props) {
  return (
    <ul
      role="list"
      className="mt-20 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
    >
      {props.lawyers?.map(({ Lawyer, Case }, i) => (
        <Link href={`/app/lawyers/${Lawyer.id}`} key={i}>
          <li key={i} className="rounded-2xl bg-gray-50 px-8 py-10">
            <img
              className="mx-auto aspect-square h-32 w-32 rounded-full object-fill md:h-32 md:w-32"
              src={Lawyer.imageUrl}
              alt=""
            />
            <h3 className="mt-6 text-center text-base font-semibold leading-7 tracking-tight">
              {Lawyer.first} {Lawyer.last}
            </h3>
            <p className="text-sm leading-6">{Lawyer.firm}</p>
            <p className="text-center text-sm leading-6">{Case.title}</p>

            {/* <ul role="list" className="mt-6 flex justify-center gap-x-6">
        <li>
         <a
           // href={person.xUrl}
           className=" hover:text-gray-300"
         >
           <span className="sr-only">X</span>
           <svg
             className="h-5 w-5"
             aria-hidden="true"
             fill="currentColor"
             viewBox="0 0 20 20"
           >
             <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
           </svg>
         </a>
        </li>
        <li>
         <button className="hover:text-gray-300">
           <span className="sr-only">Email</span>
           <svg
             className="h-5 w-5"
             aria-hidden="true"
             fill="currentColor"
             viewBox="0 0 20 20"
           >
             <path
               fillRule="evenodd"
               d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
               clipRule="evenodd"
             />
           </svg>
         </button>
        </li>
        </ul> */}
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default function TeamPage({ params: { id: caseId } }) {
  const user = useUser()

  // remove duplicates where lawyer is the same using Lawyer.id
  const lawyers = user.Agreement?.reduce((acc, curr) => {
    if (!acc.find((agreement) => agreement.Lawyer.id === curr.Lawyer.id)) {
      acc.push(curr)
    }
    return acc
  }, [])

  console.log(lawyers)
  const caseData = useCase(caseId)

  return (
    <AppLayout caseId={caseId}>
      <CaseHeader caseId={caseId} view={'team'} title={caseData?.title} />
      <div className="">
        {/* <h1 className="h1">My Team</h1> */}
        {/* <div className="flex flex-row gap-2">
          <Link
            href={`#`}
            className="h3 text-gray-500 transition-all hover:text-gray-900"
          >
            Search Talent
          </Link>
          <Link
            href={`#`}
            className="h3 text-gray-500 transition-all hover:text-gray-900"
          >
            Shop Services
          </Link>
        </div> */}
        <div className="mb-32 mt-16">
          <CaseTeamTable agreements={lawyers} />
        </div>

        {/* <TeamGrid lawyers={lawyers} /> */}
      </div>
    </AppLayout>
  )
}
