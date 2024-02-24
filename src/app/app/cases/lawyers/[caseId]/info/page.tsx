'use client'
import CaseProgress from '@/components/CaseProgress'
import AppLayout from '@/components/Layout/AppLayout'
import { AVATARS, FALLBACK_AVATAR } from '@/data/dummy'
import { supabase } from '@/lib/supabaseClient'
import { useCase } from '@/lib/useCase'
import {
  CircleStackIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function InfoGatherPage({ params: { caseId } }) {
  const caseData = useCase(caseId)

  const [questions, setQuestions] = useState([])
  useEffect(() => {
    console.log(caseData)
    if (!caseData?.Question) return
    try {
      setQuestions(
        caseData.Question.map((q) => ({ ...q, answer: q.answer || '' })),
      )
    } catch (error) {
      console.log("Couldn't parse questions...")
      console.log(error)
    }
  }, [caseData?.Question])

  const [index, setIndex] = useState(0)
  const { id, question, subQuestion, answer } = questions?.[index] || {}

  const inputRef = useRef(null)
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

    console.log({ question, answer })
    console.log(e.target)

    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, answer } : q,
    )
    console.log(updatedQuestions)

    // update the answer
    // submit question to the server
    if (questions[index].answer !== answer) {
      console.log(answer, questions[index].answer)
      console.log('updating case with this new information')
      supabase
        .from('Question')
        .update({
          answer,
          updatedAt: new Date(),
        })
        .eq('id', id)
        .then(console.log)
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1)
      inputElement.value = questions[index + 1].answer
    } else {
      console.log('triggering a new review')
      setQuestions([])
      fetch(`/api/cases/review/parse`, {
        method: 'POST',
        body: JSON.stringify({ caseId }),
      })

      // then refresh questions
      router.push(`/app/cases/lawyers/${caseId}`)
    }
  }

  return (
    <AppLayout caseId={caseId}>
      <CaseProgress stageIndex={0} />
      <div className="mt-16"></div>

      <div className="mb-8 flex flex-row justify-between">
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-row justify-start gap-2 text-sm">
            <Link href={`/app/cases/lawyers/${caseId}/info`}>
              {/* <CircleStackIcon className="h-5 w-5" /> */}

              <p>Chat</p>
            </Link>
            <Link href={`/app/cases/case/${caseId}/summary`}>
              {/* <CircleStackIcon className="h-5 w-5" /> */}

              <p>Case Summary</p>
            </Link>
          </div>
          <div className="flex flex-row justify-end gap-4 text-sm">
            <button className="flex flex-row items-center gap-2">
              <PaperClipIcon className="h-5 w-5" />

              <p>Upload File</p>
            </button>
            <Link href={`/app/cases/case/${caseId}/documents`}>
              <div className="flex flex-row items-center gap-1">
                <CircleStackIcon className="h-5 w-5" />
                <p>Documents</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {questions.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-gray-700">
            No questions to answer
          </p>
          <p className="text-md text-gray-500">
            You've answered all the questions
          </p>
        </div>
      )}

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
        <div className="mt-4 flex flex-row items-start justify-start gap-4">
          <img
            src={FALLBACK_AVATAR}
            className="mt-1 h-6 w-6 rounded-full bg-gray-800"
            alt="avatar"
          />
          <input
            ref={inputRef}
            name="answer"
            className="w-full bg-transparent text-xl outline-none"
            defaultValue={answer}
          />
        </div>
      </form>
    </AppLayout>
  )
}
