import { supabase } from '@/lib/supabaseClient'
import { UUID } from 'crypto'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { reviewCaseWithAI } from '../utils'
import { v4 as uuidv4 } from 'uuid'

export const getCaseData = async (caseId: UUID) =>
  await supabase.from('Case').select('*, Question(*)').eq('id', caseId).single()

export const caseParser = z.object({
  // string of max length 32
  readyForInvitation: z.boolean(),
  questions: z.array(
    z.object({
      question: z
        .string()
        .max(128)
        .transform(
          (subQuestion) => subQuestion.replace(/"/g, '\\"'), // Escape double quotes
        ),
      subQuestion: z
        .string()
        .max(256)
        .transform(
          (subQuestion) => subQuestion.replace(/"/g, '\\"'), // Escape double quotes
        ),
    }),
  ),
  determination: z.string().max(256),
})

export async function POST(request: NextRequest) {
  const { caseId } = await request.json()
  const { data: caseData, error } = await getCaseData(caseId)

  let attempts = 3 // make 3 attempts to refine the case before giving up
  while (attempts > 0) {
    console.log(caseData)
    const caseReview = await reviewCaseWithAI(caseData)
    console.log(caseReview)
    const parsedCase = caseParser.safeParse(caseReview)

    if (parsedCase.error) {
      console.log(parsedCase.error.errors)
      attempts -= 1
      console.log('attempting to parse again')
      continue
    }

    const { readyForInvitation, questions, determination } = parsedCase.data

    console.log(determination)

    console.log('Creating questions', questions)

    // filter out questions that already exist
    const existingQuestions = caseData?.Question || []
    const newQuestions = questions.filter(
      (question: any) =>
        !existingQuestions.find(
          (existingQuestion: any) =>
            existingQuestion.question === question.question,
        ),
    )

    console.log('new questions')
    console.log(newQuestions)

    const { data, error } = await supabase.from('Question').upsert(
      newQuestions.map((question: any) => ({
        id: uuidv4(),
        caseId,
        ...question,
        updatedAt: new Date(),
      })),
    )
    console.log(data, error)

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to insert questions', message: error }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    console.log('Marking ready: ', readyForInvitation)
    const { data: updatedCaseData, error: updatedCaseError } = await supabase
      .from('Case')
      .update({
        readyForInvitation,
      })
      .eq('id', caseData.id)
      .single()

    if (updatedCaseError) {
      return new Response(
        JSON.stringify({
          error: 'Failed to update case',
          message: updatedCaseError,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    return new Response(JSON.stringify(parsedCase.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ error: 'Failed to parse case' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  })
}
