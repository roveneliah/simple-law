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

async function sendEmail(combinedContent) {
  const configuration = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })
  const openai = new OpenAI(configuration)

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: combinedContent,
      },
      {
        role: 'user',
        content:
          'Write a report as the General Counsel for ImpossibleLaw.  You have 40 years of experience working with startups, and have seen it all, and know all the inside baseball and practicalities of the game.',
      },
    ],
  })

  const text = response.choices[0].message.content
  const data = await mailgunClient.messages
    .create('mail.impossiblelaw.com', {
      from: 'Legal <legal@mail.impossiblelaw.com>',
      to: process.env.PERSONAL_EMAIL,
      subject: 'Legal Updates',
      text,
    })
    .catch((error) => {
      console.error(error)
      return { data: null, error }
    })

  console.log({ data })
  return { data, error: null }
}

async function getExistingQuestions() {
  let existingQuestions = []
  try {
    const questionsPath = path.join(__dirname, '../src/docs/questions.json')
    if (fs.existsSync(questionsPath)) {
      const questionsData = fs.readFileSync(questionsPath, 'utf8')
      existingQuestions = JSON.parse(questionsData)
    }
    return existingQuestions
  } catch (error) {
    console.error('Error loading existing questions:', error)
    return []
  }
}

async function dispatchLegalEmail() {
  try {
    // Dynamically import the clipboardy module
    // Parse command-line arguments
    const args = process.argv.slice(2)
    const promptFlag = args.find((arg) => arg.startsWith('--question='))
    const question = promptFlag ? promptFlag.split('=')[1] : ''

    // Read the contents of global.html
    const globalContent = fs.readFileSync(
      path.join(__dirname, '../src/docs/global.html'),
      'utf8',
    )

    // Read the contents of index.html
    const schemaContent = fs.readFileSync(
      path.join(__dirname, '../prisma/schema.prisma'),
      'utf8',
    )

    // Read the contents of index.html
    const indexContent = fs.readFileSync(
      path.join(__dirname, '../src/docs/index.html'),
      'utf8',
    )

    // Read every .md file in ../docs/..
    const docsDir = path.join(__dirname, '../docs')
    const mdFiles = fs
      .readdirSync(docsDir)
      .filter((file) => path.extname(file) === '.md')
      .map((file) => path.join(docsDir, file))
    const mdContents = mdFiles.map((file) => fs.readFileSync(file, 'utf8'))

    // Combine the contents into a single string
    const combinedContent = [
      stripHtml(globalContent),
      schemaContent,
      ...mdContents,
      stripHtml(indexContent),

      question,
    ].join('\n\n')

    // Generate questions using OpenAI API
    const res = await sendEmail(combinedContent)
    console.log(res)

    console.log('Done!')
  } catch (error) {
    console.error('Error combining documentation:', error)
  }
}

dispatchLegalEmail()
