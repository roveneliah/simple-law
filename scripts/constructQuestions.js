require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { z } = require('zod')
const { OpenAI } = require('openai')

// ... (stripHtml and PROMPTS remain the same)
function stripHtml(html) {
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const PROMPTS = {
  v1: 'Respond ONLY with parseable json list of objects with question field (string), and list of tags.  It will be direct input into JSON.parse, so the entire response must be JSON compilable.  Only json, no text, only json, only json.',
}

const QuestionSchema = z.object({
  question: z.string(),
  tags: z.array(z.string()),
})

const QuestionsSchema = z.array(QuestionSchema)

async function generateQuestions(combinedContent) {
  const configuration = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })
  const openai = new OpenAI(configuration)

  const prompt = `${combinedContent}\n\n${PROMPTS.v1}`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })

    console.log(completion.choices.length)
    const questions = completion.choices.reduce((acc, choice) => {
      try {
        const qs = QuestionsSchema.parse(JSON.parse(choice.message.content))

        console.log(qs)
        return [...acc, ...qs.map((q) => ({ ...q, answer: '' }))]
      } catch (error) {
        console.error('Error parsing questions:', error)
        return acc
      }
    }, [])

    console.log(questions)

    return questions
  } catch (error) {
    console.error('Error generating questions:', error)
    return []
  }
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

async function writeQuestions() {
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

    const existingQuestions = await getExistingQuestions()

    // Combine the contents into a single string
    const combinedContent = [
      stripHtml(globalContent),
      schemaContent,
      ...mdContents,
      stripHtml(indexContent),
      existingQuestions,
      question,
    ].join('\n\n')

    // Generate questions using OpenAI API
    const questions = await generateQuestions(combinedContent)

    // Combine existing questions with newly generated questions
    const combinedQuestions = [...existingQuestions, ...questions]

    // Remove duplicate questions based on the 'question' field
    const uniqueQuestions = combinedQuestions.reduce((acc, question) => {
      if (!acc.find((q) => q.question === question.question)) {
        acc.push(question)
      }
      return acc
    }, [])

    // console.log(uniqueQuestions)

    // Save the questions to a file
    fs.writeFileSync(
      path.join(__dirname, '../src/docs/questions.json'),
      JSON.stringify(uniqueQuestions, null, 2),
    )

    console.log('Done!')
  } catch (error) {
    console.error('Error combining documentation:', error)
  }
}

writeQuestions()
