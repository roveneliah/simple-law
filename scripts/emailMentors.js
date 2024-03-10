require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { z } = require('zod')
const { OpenAI } = require('openai')

const formData = require('form-data')
const { default: Mailgun } = require('mailgun.js')
const mailgun = new Mailgun(formData)
const mailgunClient = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  // domain: 'mail.impossiblelaw.com',
})

// ... (stripHtml and PROMPTS remain the same)
function stripHtml(html) {
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function magic(prompt) {
  const configuration = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })
  const openai = new OpenAI(configuration)

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const text = response.choices[0].message.content
  return text
}

async function sendEmail({
  from = 'AI',
  to = process.env.PERSONAL_EMAIL,
  subject,
  text,
}) {
  const data = await mailgunClient.messages
    .create('mail.impossiblelaw.com', {
      from: `${from} <ai@mail.impossiblelaw.com>`,
      to: process.env.PERSONAL_EMAIL,
      subject,
      text,
    })
    .catch((error) => {
      console.error(error)
      return { data: null, error }
    })

  console.log({ data })
  return { data, error: null }
}

async function dispatchMentorsEmail(mentor) {
  try {
    // Read the contents of index.html
    const steve = fs.readFileSync(
      path.join(__dirname, `../src/docs/${mentor}.txt`),
      'utf8',
    )
    const response = await magic(steve)
    const res = await sendEmail({
      from: mentor,
      text: response,
      subject: 'Note from ' + mentor,
    })
    console.log(res)

    console.log('Done!')
  } catch (error) {
    console.error('Error combining documentation:', error)
  }
}

const mentors = ['steve', 'charlie']
mentors.map(dispatchMentorsEmail)
