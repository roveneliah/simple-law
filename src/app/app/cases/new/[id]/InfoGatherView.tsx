'use client'
import { getUserAvatarUrlById } from '@/app/app/account/page'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/lib/useUser'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useQuestions } from './useQuestions'

export default function InfoGatherView({ caseId }: any) {
  const user = useUser()
  // const caseData = useCase(caseId)
  const questions = useQuestions(caseId)
  const [filteredQuestions, setFilteredQuestions] = useState([])
  useEffect(() => {
    setFilteredQuestions(questions.filter((q) => !q.answer))
  }, [questions])

  console.log(filteredQuestions)

  const [index, setIndex] = useState(0)
  const { id, question, subQuestion, answer } = filteredQuestions?.[index] || {}

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
    inputElement?.addEventListener('blur', keepFocus)

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      inputElement?.removeEventListener('blur', keepFocus)
    }
  }, [index, inputRef.current])

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

    const updatedQuestions = filteredQuestions.map((q, i) =>
      i === index ? { ...q, answer } : q,
    )
    console.log(updatedQuestions)

    // update the answer
    // submit question to the server
    if (filteredQuestions[index].answer !== answer) {
      console.log(answer, filteredQuestions[index].answer)
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

    console.log(filteredQuestions.length, index)
    if (index + 1 < filteredQuestions.length) {
      setIndex(index + 1)
      inputElement.value = filteredQuestions[index + 1].answer
    } else {
      console.log('triggering a new review')
      // setQuestions([])
      fetch(`/api/cases/review/parse`, {
        method: 'POST',
        body: JSON.stringify({ caseId }),
      })

      // then refresh questions
      router.push(`/app/cases/lawyers/${caseId}`)
    }
  }

  // TODO: trigger review if all questions are answered
  useEffect(() => {
    if (questions.length > 0 && filteredQuestions.length === 0) {
      console.log('triggering a new review')
      // setQuestions([])
      fetch(`/api/cases/review/parse`, {
        method: 'POST',
        body: JSON.stringify({ caseId }),
      })

      // // then refresh questions
      // router.push(`/app/cases/lawyers/${caseId}`)
    }
  }, [filteredQuestions])

  const userImageUrl = getUserAvatarUrlById(user?.id)

  return (
    <div>
      {/* <div className="mb-8 flex flex-row justify-between">
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-row justify-start gap-2 text-sm">
                  <Link href={`/app/cases/lawyers/${caseId}/info`}>
                    <p>Chat</p>
                  </Link>
                  <Link href={`/app/cases/case/${caseId}/summary`}>
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
            </div> */}
      {filteredQuestions.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-gray-700">
            No questions to answer
          </p>
          <p className="text-md text-gray-500">
            You've answered all the questions
          </p>
        </div>
      ) : (
        <form key={id} className="mt-0" onSubmit={handleSubmit}>
          <div className="mb-4 h-1.5 w-full rounded-full bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-blue-600"
              style={{
                width:
                  questions.length > 0
                    ? `${(index / questions.length) * 100}%`
                    : '0%',
              }}
            />
          </div>
          <div className="flex flex-row items-start justify-start gap-4">
            {/* <img
                      src={AVATARS[2]}
                      className="mt-1 h-10 w-10 rounded-full bg-gray-800"
                      alt="avatar"
                    /> */}
            <div>
              <p className="w-fit bg-yellow-300 text-2xl font-bold tracking-tighter">
                {question}
              </p>
              <p className="text-md">{subQuestion}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-row items-start justify-start gap-4">
            {/* <img
                    src={FALLBACK_AVATAR}
                    className="mt-1 h-10 w-10 rounded-full bg-gray-800"
                    alt="avatar"
                  /> */}
            {/* <img
                      src={userImageUrl}
                      alt=""
                      className="mt-0 h-10 w-10 rounded-full"
                    /> */}
            <input
              ref={inputRef}
              name="answer"
              className="mt-1 w-full bg-transparent text-xl outline-none"
              defaultValue={answer}
            />
          </div>
        </form>
      )}
    </div>
  )
}
