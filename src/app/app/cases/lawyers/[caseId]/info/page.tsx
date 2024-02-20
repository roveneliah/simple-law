'use client'
import AppLayout from '@/components/Layout/AppLayout'
import { AVATARS, FALLBACK_AVATAR } from '@/data/dummy'
import { useEffect, useRef, useState } from 'react'

const questions = [
  {
    id: 1,
    question: 'Have you ever worked with a lawyer before?',
    subQuestion:
      'If not, what are your expectation? Are there any questions you have about the process?',
  },
  {
    id: 2,
    question: 'What is your preferred method of communication?',
    subQuestion: 'Do you prefer email, phone calls, or text messages?',
  },
  {
    id: 3,
    question: 'Are there any deadlines we should know about?',
    // subQuestion: '',
  },
]

export default function InfoGatherPage({ params: { caseId } }) {
  console.log('caseId', caseId)

  const inputRef = useRef(null)

  const [index, setIndex] = useState(0)
  const { id, question, subQuestion } = questions[index]

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

  const handleSubmit = (e) => {
    console.log('Submitting question...')
    e.preventDefault()
    const formData = new FormData(e.target)
    const answer = formData.get('answer')?.toString().trim()

    console.log({ question, answer })
    console.log(e.target)
    setIndex(index + 1)
  }

  return (
    <AppLayout caseId={caseId}>
      <form key={id} className="mt-32" onSubmit={handleSubmit}>
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
            className="text-xl outline-none"
            defaultValue=""
          />
        </div>
      </form>
    </AppLayout>
  )
}
