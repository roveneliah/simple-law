'use client'
import AppLayout from '@/components/Layout/AppLayout'
import { AVATARS, FALLBACK_AVATAR } from '@/data/dummy'
import { supabase } from '@/lib/supabaseClient'
import { useCase } from '@/lib/useCase'
import { CircleStackIcon } from '@heroicons/react/24/outline'
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
