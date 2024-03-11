require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { compilePrompt, loadPrompts } = require('./constructPrompt')
const { OpenAI } = require('openai')

function fulfillPrompt(prompt) {
  return async function (context) {
    const configuration = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    })
    const openai = new OpenAI(configuration)

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `${context}\n\n${prompt}`,
          },
        ],
      })

      return completion.choices[0].message.content
    } catch (error) {
      console.error('Error generation chat completion:', error)
      return []
    }
  }
}
async function task({ pathOut, promptKey, promptRaw }) {
  console.log('Fetching base context...')
  const combinedContent = await compilePrompt()

  console.log('Fetching prompt...')
  const PROMPTS = loadPrompts()
  const prompt = promptRaw || PROMPTS[promptKey].prompt

  console.log('Executing workflow with context..')
  const data = await fulfillPrompt(prompt)(combinedContent)
  const pth = path.join(__dirname, `../docs/ai/${pathOut || promptKey}.md`)

  console.log('Writing to result...', pth)
  fs.writeFileSync(pth, data)

  console.log('Writing full convo to...')
  const fullConvo = [combinedContent, prompt, data].join('\n\n')
  fs.writeFileSync(
    path.join(__dirname, `../docs/ai/${pathOut || promptKey}_full.md`),
    fullConvo,
  )
}

// @CLAUDE, prompt user to select workflow file from ../workflows
// HERE
// const TASKS = require('../workflows/daily.js')
// TASKS.map(task)

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function selectWorkflowFile() {
  return new Promise((resolve, reject) => {
    const workflowsDir = path.join(__dirname, '../workflows')

    fs.readdir(workflowsDir, (err, files) => {
      if (err) {
        console.error('Error reading workflows directory:', err)
        reject(err)
        return
      }

      console.log('Available workflow files:')
      files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`)
      })

      rl.question(
        'Enter the number of the workflow file you want to use: ',
        (answer) => {
          const selectedIndex = parseInt(answer) - 1
          if (selectedIndex >= 0 && selectedIndex < files.length) {
            const selectedFile = files[selectedIndex]
            const selectedFilePath = path.join(workflowsDir, selectedFile)
            resolve(selectedFilePath)
          } else {
            console.log('Invalid selection. Please try again.')
            resolve(selectWorkflowFile())
          }
        },
      )
    })
  })
}

function getWorkflowFilePath() {
  const args = process.argv.slice(2)
  const workflowFlag = args.find((arg) => arg.startsWith('-w='))

  if (workflowFlag) {
    const workflowFile = workflowFlag.split('=')[1]
    const workflowFilePath = path.join(__dirname, '../workflows', workflowFile)

    if (fs.existsSync(workflowFilePath)) {
      return Promise.resolve(workflowFilePath)
    } else {
      console.error(`Workflow file "${workflowFile}" does not exist.`)
      return Promise.reject(new Error('Invalid workflow file'))
    }
  } else {
    return selectWorkflowFile()
  }
}

getWorkflowFilePath()
  .then((workflowFilePath) => {
    const TASKS = require(workflowFilePath)
    TASKS.map(task)
  })
  .catch((err) => {
    console.error('Error selecting workflow file:', err)
  })
  .finally(() => {
    rl.close()
  })
