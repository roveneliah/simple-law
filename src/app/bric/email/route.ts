import { mailgunClient } from '@/app/api/email/invite-by-caseId/mailgunClient'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import path from 'path'
import fs from 'fs'
// import idx from '@/public/index.html'

export async function sendLegalEmail(text: string) {
  const data = await mailgunClient.messages
    .create('mail.impossiblelaw.com', {
      from: 'Legal <legal@mail.impossiblelaw.com>',
      to: process.env.PERSONAL_EMAIL,
      subject: 'Legal Updates',
      text,
    })
    .catch((error: any) => {
      console.error(error)
      return { data: null, error }
    })

  return { data, error: null }
}

export async function POST(req: NextRequest) {
  try {
    // todo: get combined contents
    const combinedContents = ''

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    })
    // const openai = new OpenAI(configuration)

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: combinedContents,
        },
        {
          role: 'user',
          content:
            'Write a report as the General Counsel for ImpossibleLaw.  You have 40 years of experience working with startups, and have seen it all, and know all the inside baseball and practicalities of the game.',
        },
      ],
    })

    const text = response.choices[0].message.content
    console.log(text)

    if (!text) {
      throw new Error('Invalid response from OpenAI')
    }

    const { data, error } = await sendLegalEmail(text)
    const status = error ? 500 : 200
    return NextResponse.json({ data, error }, { status })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ e, message: e.message }, { status: 500 })
  }
}
