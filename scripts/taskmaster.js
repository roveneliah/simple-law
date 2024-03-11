require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { compilePrompt, loadPrompts } = require('./constructPrompt')
const { OpenAI } = require('openai')

function fulfillPrompt({ promptRaw, promptKey }) {
  return async function (combinedContent) {
    const configuration = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    })
    const openai = new OpenAI(configuration)

    const PROMPTS = loadPrompts()

    const prompt = `${combinedContent}\n\n${promptRaw || PROMPTS[promptKey]}`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      })

      return completion.choices[0].message.content
    } catch (error) {
      console.error('Error generation chat completion:', error)
      return []
    }
  }
}
async function task({ pathOut, workflow }) {
  console.log('Fetching base context...')
  const combinedContent = await compilePrompt()

  console.log('Executing workflow with context..')
  const data = await workflow(combinedContent)

  console.log('Writing to...', pathOut)
  fs.writeFileSync(path.join(__dirname, `../docs/ai/${pathOut}`), data)
}

const TASKS = [
  {
    workflow: fulfillPrompt({
      promptRaw:
        'Write a 3 x 3-word call to action that distills today\ns priorities.',
    }),
    pathOut: `priorities-${new Date().toISOString().split('T')[0]}.md`,
  },
  {
    workflow: fulfillPrompt({ promptKey: 'steve' }),
    pathOut: `steve_${new Date().toISOString().split('T')[0]}.md`,
  },
]

TASKS.map(task)
