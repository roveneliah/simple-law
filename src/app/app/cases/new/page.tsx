'use client'
import AutoFlipComponent from '@/components/AutoFlip'
import { Files } from '@/components/CaseViews/Files'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'
import prisma from '@/lib/prismaClient'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/lib/useUser'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { POST } from '@/app/api/cases/refine/route'
import { NewFiles } from '@/components/CaseViews/NewFiles'
import InfoGatherPage from '../lawyers/[caseId]/info/page'
import { NewCaseForm } from './[id]/page'

const uploadDocuments = async (files) => {
  const uploadedDocs = await Promise.all(
    files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      return data
    }),
  )
  return uploadedDocs
}

const createDocumentEntries = async (uploadedDocs) => {
  const documentEntries = await Promise.all(
    uploadedDocs.map(async (doc) => {
      const document = await prisma.document.create({
        data: {
          name: doc.name,
          url: doc.url,
        },
      })
      return document.id
    }),
  )
  return documentEntries
}

// function NewCaseForm() {
//   const router = useRouter()
//   const user = useUser()
//   const [currentIndex, setCurrentIndex] = useState(0)

//   // basics
//   const [nickname, setNickname] = useState('')
//   const [whatsUp, setWhatsUp] = useState('')

//   const [goals, setGoals] = useState('')
//   const [dates, setDates] = useState('')
//   const [files, setFiles] = useState([])

//   // make sure there is userid??
//   const handleCreateCase = async () => {
//     console.log('Create case')

//     // const refinedCase = refineCaseWithAI({ whatsUp, goals, dates, files })
//     // call POST /api/cases/refine with caseData to get refinedCase

//     // call endpoint
//     // const refinedCase = await fetch('/api/cases/refine', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify({
//     //     refinedCase: {
//     //       whatsUp,
//     //       goals,
//     //       dates,
//     //       files,
//     //     },
//     //   }),
//     // }).then((res) => res.json())

//     supabase
//       .from('Case')
//       .insert([
//         {
//           // generate id
//           id: uuidv4(),
//           userId: user.id,
//           title: nickname,
//           whatsUp,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ])
//       .select()
//       .then(({ data, error }) => {
//         if (error?.code === '23503') {
//           console.error('User not found')
//           return { data, error }
//         }

//         console.log(data, error)
//         router.push(`/app/cases/new/${data[0].id}`)
//       })

//     // then upload docs
//   }

//   const handleUpdateCase = async (e) => {
//     e.preventDefault()
//     console.log('Update case')
//     // call POST /api/cases/refine with caseData to get refinedCase
//     const refinedCase = await fetch('/api/cases/refine', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         caseData,
//       }),
//     }).then((res) => res.json())
//     console.log(refinedCase)
//   }

//   const [view, setView] = useState('basics')

//   return (
//     <div className="mt-8 w-full">
//       <div className="flex w-full flex-row items-center justify-between">
//         <div className="w-full px-4 sm:px-0">
//           <h3 className="text-5xl font-bold leading-7 tracking-tighter text-gray-900">
//             Create a Case
//           </h3>
//           {/* <p className="mt-4 max-w-2xl text-lg leading-6 text-gray-500">
//             We will use this to interview lawyers on your behalf.
//           </p> */}
//         </div>
//       </div>
//       <div className="mt-16 flex w-full flex-row">
//         <div className="flex w-2/5 flex-col items-start text-left font-semibold">
//           <button
//             type="button"
//             onClick={() => setView('intro')}
//             className={`mt-1 text-left text-sm leading-6 ${view === 'intro' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
//           >
//             Impossible Law
//           </button>
//           <button
//             type="button"
//             onClick={() => setView('basics')}
//             className={`mt-1 text-left text-sm leading-6 ${view === 'basics' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
//           >
//             Basic Information
//           </button>
//           <button
//             type="button"
//             onClick={() => setView('goals')}
//             className={`mt-1 text-left text-sm leading-6 ${view === 'goals' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
//           >
//             Goals
//           </button>{' '}
//           <button
//             type="button"
//             onClick={() => setView('dates')}
//             className={`mt-1 text-left text-sm leading-6 ${view === 'dates' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
//           >
//             Dates
//           </button>
//           <button
//             type="button"
//             onClick={() => setView('docs')}
//             className={`mt-1 text-left text-sm leading-6 ${view === 'docs' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
//           >
//             Documents
//           </button>
//           <button
//             type="button"
//             onClick={() => setView('review')}
//             className={`mt-1 text-left text-sm leading-6 ${view === 'review' ? 'text-gray-900' : 'font-medium text-gray-600'}`}
//           >
//             Review
//           </button>
//         </div>
//         <div className="mt-0 w-full">
//           <dl className="">
//             <div className={''}>
//               {view === 'intro' && (
//                 <div className="col-span-full rounded-md">
//                   <p className="block text-lg font-semibold leading-6 text-gray-900">
//                     Welcome to Impossible Law
//                   </p>
//                   <p className="mt-3 text-sm leading-6 text-gray-600">
//                     [[some sell, intro, walkthrough, video]]
//                   </p>
//                   <div className="mt-8 flex w-full flex-row justify-end gap-8">
//                     <button
//                       type="submit"
//                       onClick={() => setView('basics')}
//                       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {view === 'basics' && (
//                 <div className="col-span-full rounded-md">
//                   <label
//                     htmlFor="about"
//                     className="block text-sm font-medium leading-6 text-gray-900"
//                   >
//                     Tell us what's going on in your own words.
//                   </label>
//                   <div className="mt-2">
//                     <textarea
//                       id="about"
//                       name="about"
//                       rows={3}
//                       className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                       defaultValue={''}
//                       value={whatsUp}
//                       onChange={(e) => setWhatsUp(e.target.value)}
//                     />
//                   </div>

//                   <label
//                     htmlFor="nickname"
//                     className="mt-8 block text-sm font-medium leading-6 text-gray-900"
//                   >
//                     Oh, and let's create a nickname for our case.
//                   </label>
//                   <div className="mt-2">
//                     <input
//                       id="nickname"
//                       name="nickname"
//                       className="block w-3/4 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                       defaultValue={''}
//                       maxLength={28}
//                       value={nickname}
//                       onChange={(e) => setNickname(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-8 flex w-full flex-row justify-end gap-8">
//                     <button
//                       type="button"
//                       onClick={() => setView('intro')}
//                       className="text-sm font-semibold leading-6 text-gray-900"
//                     >
//                       Back
//                     </button>
//                     <button
//                       type="submit"
//                       onClick={handleCreateCase}
//                       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                       Create Case
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {view === 'goals' && (
//                 <form className="col-span-full" onSubmit={handleUpdateCase}>
//                   <label
//                     htmlFor="about"
//                     className="block text-sm font-medium leading-6 text-gray-900"
//                   >
//                     What are your goals?
//                   </label>
//                   <div className="mt-2">
//                     <textarea
//                       id="about"
//                       name="about"
//                       rows={3}
//                       className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                       defaultValue={''}
//                       value={goals}
//                       onChange={(e) => setGoals(e.target.value)}
//                     />
//                   </div>
//                   <p className="mt-3 text-sm leading-6 text-gray-600">
//                     Let's make sure you and your attorney get each other from
//                     Day 1.
//                   </p>
//                   <div className="mt-8 flex w-full flex-row justify-end gap-8">
//                     <button
//                       type="button"
//                       onClick={() => setView('basics')}
//                       className="text-sm font-semibold leading-6 text-gray-900"
//                     >
//                       Back
//                     </button>
//                     <button
//                       type="submit"
//                       onClick={() => setView('dates')}
//                       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </form>
//               )}

//               {view === 'dates' && (
//                 <div className="col-span-full">
//                   <label
//                     htmlFor="about"
//                     className="block text-sm font-medium leading-6 text-gray-900"
//                   >
//                     Any dates or deadlines we should know about?
//                   </label>
//                   <div className="mt-2">
//                     <textarea
//                       id="about"
//                       name="about"
//                       rows={3}
//                       className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                       defaultValue={''}
//                       value={dates}
//                       onChange={(e) => setDates(e.target.value)}
//                     />
//                   </div>
//                   <p className="mt-3 text-sm leading-6 text-gray-600">
//                     This will help attorneys understand your situation and set
//                     your expectation.
//                   </p>
//                   <div className="mt-8 flex w-full flex-row justify-end gap-8">
//                     <button
//                       type="button"
//                       onClick={() => setView('goals')}
//                       className="text-sm font-semibold leading-6 text-gray-900"
//                     >
//                       Back
//                     </button>
//                     <button
//                       type="submit"
//                       onClick={() => setView('docs')}
//                       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {view === 'docs' && (
//                 <div>
//                   <NewFiles files={files} setFiles={setFiles} />
//                   <div className="mt-8 flex w-full flex-row justify-end gap-8">
//                     <button
//                       type="button"
//                       onClick={() => setView('dates')}
//                       className="text-sm font-semibold leading-6 text-gray-900"
//                     >
//                       Back
//                     </button>
//                     <button
//                       type="submit"
//                       onClick={() => setView('review')}
//                       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {view === 'review' && (
//                 <div className="flex flex-col">
//                   <div className="flex flex-col">
//                     <p className="block text-lg font-semibold leading-6 text-gray-900">
//                       Review your case details.
//                     </p>

//                     <div className="flex w-full flex-row justify-end gap-8">
//                       <button
//                         type="button"
//                         onClick={() => setView('docs')}
//                         className="text-sm font-semibold leading-6 text-gray-900"
//                       >
//                         Back
//                       </button>
//                       <button
//                         type="submit"
//                         onClick={handleCreateCase}
//                         className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                       >
//                         Start Interviews
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="block text-lg font-semibold leading-6 text-gray-900">
//                       We need a few more details.
//                     </p>

//                     <div className="flex w-full flex-row justify-end gap-8">
//                       <button
//                         type="button"
//                         onClick={() => setView('docs')}
//                         className="text-sm font-semibold leading-6 text-gray-900"
//                       >
//                         Back
//                       </button>
//                       <button
//                         type="submit"
//                         onClick={handleCreateCase}
//                         className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                       >
//                         Start Interviews
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">
//               Attachments
//             </dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//               <ul
//                 role="list"
//                 className="divide-y divide-gray-100 rounded-md border border-gray-200"
//               >
//                 <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
//                   <div className="flex w-0 flex-1 items-center">
//                     <PaperClipIcon
//                       className="h-5 w-5 flex-shrink-0 text-gray-400"
//                       aria-hidden="true"
//                     />
//                     <div className="ml-4 flex min-w-0 flex-1 gap-2">
//                       <span className="truncate font-medium">
//                         resume_back_end_developer.pdf
//                       </span>
//                       <span className="flex-shrink-0 text-gray-400">2.4mb</span>
//                     </div>
//                   </div>
//                   <div className="ml-4 flex flex-shrink-0 space-x-4">
//                     <button
//                       type="button"
//                       className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </li>
//                 <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
//                   <div className="flex w-0 flex-1 items-center">
//                     <PaperClipIcon
//                       className="h-5 w-5 flex-shrink-0 text-gray-400"
//                       aria-hidden="true"
//                     />
//                     <div className="ml-4 flex min-w-0 flex-1 gap-2">
//                       <span className="truncate font-medium">
//                         coverletter_back_end_developer.pdf
//                       </span>
//                       <span className="flex-shrink-0 text-gray-400">4.5mb</span>
//                     </div>
//                   </div>
//                   <div className="ml-4 flex flex-shrink-0 space-x-4">
//                     <button
//                       type="button"
//                       className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </li>
//               </ul>
//             </dd>
//           </div> */}
//           </dl>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function NewCase() {
  return (
    <AppLayout>
      <NewCaseForm caseData={null} />
    </AppLayout>
  )
}
