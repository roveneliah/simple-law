'use client'
import AppLayout from '@/components/Layout/AppLayout'
import { AVATARS, FALLBACK_AVATAR } from '@/data/dummy'
import { useCase } from '@/lib/useCase'
import { CircleStackIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// const questions = [
//   {
//     id: 1,
//     question: 'Have you ever worked with a lawyer before?',
//     subQuestion:
//       'If not, what are your expectation? Are there any questions you have about the process?',
//   },
//   {
//     id: 2,
//     question: 'What is your preferred method of communication?',
//     subQuestion: 'Do you prefer email, phone calls, or text messages?',
//   },
//   {
//     id: 3,
//     question: 'Are there any deadlines we should know about?',
//     // subQuestion: '',
//   },
// ]

export default function InfoGatherPage({ params: { caseId } }) {
  console.log('caseId', caseId)

  const inputRef = useRef(null)

  const caseData = useCase(caseId)
  const review = caseData?.review
  console.log('review', review)

  let questions
  try {
    questions = JSON.parse(review).questions
  } catch (error) {
    console.log(error)
  }

  console.log(questions)
  const [index, setIndex] = useState(0)
  const { id, question, subQuestion } = questions?.[index] || {}

  useEffect(() => {
    // Automatically focus the input when the component mounts
    const inputElement = inputRef.current
    if (inputElement) {
      inputElement.focus()
    }

    // Define a function to refocus the input
    const keepFocus = (event) => {
      event.preventDefault()
      inputElement.focus()
    }

    // Add an event listener to refocus the input whenever it loses focus
    inputElement.addEventListener('blur', keepFocus)

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      inputElement.removeEventListener('blur', keepFocus)
    }
  }, [index])

  const router = useRouter()
  const handleSubmit = (e) => {
    console.log('Submitting question...')
    e.preventDefault()
    const formData = new FormData(e.target)
    const answer = formData.get('answer')?.toString().trim()

    // clear the input field
    const inputElement = inputRef.current
    inputElement.value = ''

    console.log({ question, answer })
    console.log(e.target)

    if (index + 1 < questions.length) {
      setIndex(index + 1)
    } else {
      console.log('redirecting')

      // submit question
      console.log('updating case with this new information')

      console.log('triggering a new review')

      // then refresh
      router.refresh()
      // router.push(`/app/cases/lawyers/${caseId}/info`)
    }
  }

  return (
    <AppLayout caseId={caseId}>
      <div className="mb-8 flex flex-row justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Gather Information
        </h1>
        <div className="flex flex-row justify-end gap-2">
          <div className="flex flex-row items-center gap-1">
            <Link href={`/app/cases/case/${caseId}/documents`}>
              <CircleStackIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <form key={id} className="mt-0" onSubmit={handleSubmit}>
        <div className="flex flex-row items-start justify-start gap-4">
          <img
            src={AVATARS[2]}
            className="mt-1 h-6 w-6 rounded-full bg-gray-800"
            alt="avatar"
          />
          <div>
            <p name="question" className="text-xl font-bold tracking-tight">
              {question}
            </p>
            <p className="text-md">{subQuestion}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center justify-start gap-4">
          <img
            src={FALLBACK_AVATAR}
            className="h-6 w-6 rounded-full bg-gray-800"
            alt="avatar"
          />
          <input
            ref={inputRef}
            name="answer"
            className="bg-transparent text-xl outline-none"
            defaultValue=""
          />
        </div>
      </form>
    </AppLayout>
  )
}
