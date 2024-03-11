require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { compilePrompt, loadPrompts } = require('./constructPrompt')
const { OpenAI } = require('openai')

function fulfillPrompt(promptKey) {
  return async function (combinedContent) {
    const configuration = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    })
    const openai = new OpenAI(configuration)

    const PROMPTS = loadPrompts()

    console.log(PROMPTS.promptKey)

    const prompt = `${combinedContent}\n\n${PROMPTS[promptKey]}`

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
  console.log('Writing to...', pathOut)
  const combinedContent = await compilePrompt()

  const data = await workflow(combinedContent)

  fs.writeFileSync(path.join(__dirname, `../docs_ai/tasks/${pathOut}`), data)
}

const TASKS = [
  {
    workflow: fulfillPrompt('legal'),
    pathOut: `legal_${new Date().toISOString().split('T')[0]}.md`,
  },
  {
    workflow: fulfillPrompt('steve'),
    pathOut: `steve_${new Date().toISOString().split('T')[0]}.md`,
  },
]

TASKS.map(task)
