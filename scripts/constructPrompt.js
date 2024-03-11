const fs = require('fs')
const path = require('path')

function stripHtml(html) {
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getGlobalDocs() {
  return stripHtml(
    fs.readFileSync(path.join(__dirname, '../src/docs/global.html'), 'utf8'),
  ).slice(0, -240)
}

function getSchemaDocs() {
  return fs.readFileSync(
    path.join(__dirname, '../prisma/schema.prisma'),
    'utf8',
  )
}

function getCodeDocumentation() {
  return stripHtml(
    fs.readFileSync(path.join(__dirname, '../src/docs/index.html'), 'utf8'),
  ).slice(0, -240)
}

function getFromNotesDir(dir = '', annotation = null) {
  const notesDir = path.join(__dirname, `../docs/${dir}`)
  const notesFiles = fs
    .readdirSync(notesDir)
    .filter((file) => path.extname(file) === '.md')
    .map((file) => path.join(notesDir, file))

  const notesContents = notesFiles.map((file) => {
    const fileName = path.basename(file, path.extname(file))
    const content = fs.readFileSync(file, 'utf8')
    return `File: ${fileName}\n${content}\n\n`
  })

  return [annotation + '\n', ...notesContents]
}

// Load Prompts
function loadPrompts() {
  const promptsFilePath = path.join(__dirname, '../prompts.json')
  const promptsData = fs.readFileSync(promptsFilePath, 'utf8')
  return JSON.parse(promptsData)
}

async function compilePrompt(promptKey = 'default', writeToFile = false) {
  try {
    // Parse command-line arguments
    const PROMPTS = loadPrompts()
    const { prompt, context } = PROMPTS[promptKey]

    // Dynamically import the clipboardy module
    const clipboardy = await import('clipboardy')

    // jsdocs content
    const globalContent = getGlobalDocs()
    const indexContent = getCodeDocumentation()
    // prisma schema
    const schemaContent = getSchemaDocs()

    // notes
    const mdContents = getFromNotesDir('')
    const logs = getFromNotesDir(
      'daily',
      'Here is a log of recent founder notes:',
    ) // daily logs
    const memos = getFromNotesDir(
      'memos',
      'This is a log of memos written.  This should help provide context into the evolution of our thinking.',
    ) // daily logs

    // Combine the contents into a single string
    const combinedContent = [
      globalContent,
      indexContent,
      schemaContent,
      mdContents,
      memos,
      logs,
      prompt,
      "(Make sure to respond in the context of ImpossibleLaw's operational aspirations, values, and role models.)",
    ].join('\n\n')

    // Copy the combined content to the clipboard
    await clipboardy.default.write(combinedContent)
    console.log('Combined documentation copied to clipboard!')

    // write the combined content to a file
    if (writeToFile) {
      fs.writeFileSync(
        path.join(
          __dirname,
          `../docs_ai/prompts/${promptKey || 'default'}.txt`,
        ),
        combinedContent,
      )
    }

    return combinedContent
  } catch (error) {
    console.error('Error combining documentation:', error)
  }
}

// compilePrompt()

module.exports = { compilePrompt: compilePrompt, loadPrompts: loadPrompts }
