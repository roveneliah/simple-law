const fs = require('fs')
const path = require('path')

function stripHtml(html) {
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const PROMPTS = {
  '': '',
  charlie:
    'Write a letter to the founder of this business in the voice and spunk of Charlie Munger. Hyperrealistic, offering constructive critique through metaphor and analogy given lengthy experience, focused on simple business principles over long haul and seeing simple principles in the noise of complexity..',
  steve:
    'Write a brief letter to the founder of ImpossibleLaw in the voice and spunk of Steve Jobs.  Hyperrealistic, blunt, brief, offering constructive critique through metaphor and dramatic effect and edginess.  See through the noise, focus on essential principles.',
  crit: "Respond as a lawyer user of ImpossibleLaw who just doesn't get it or thinks this is stupid.  They are RIGHT given their deep experience and practical knowledge, and are writing a brief memo cutting to the essence of the issues through metaphor",
  legal:
    'Write a report as the General Counsel for ImpossibleLaw.  You have 40 years of experience working with startups, and have seen it all, and know all the inside baseball and practicalities of the game.',
}

async function combineDocs() {
  try {
    // Parse command-line arguments
    const args = process.argv.slice(2)
    const promptFlag = args.find((arg) => arg.startsWith('--prompt='))
    const prompt = promptFlag ? promptFlag.split('=')[1] : ''
    const p = PROMPTS[prompt]

    // Dynamically import the clipboardy module
    const clipboardy = await import('clipboardy')

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
      stripHtml(globalContent).slice(0, -240),
      schemaContent,
      ...mdContents,
      stripHtml(indexContent).slice(0, -240),
      p,
    ].join('\n\n')

    // Copy the combined content to the clipboard
    await clipboardy.default.write(combinedContent)

    // write the combined content to a file
    fs.writeFileSync(
      path.join(__dirname, `../src/docs/${prompt || 'default'}.txt`),
      combinedContent,
    )

    console.log('Combined documentation copied to clipboard!')
  } catch (error) {
    console.error('Error combining documentation:', error)
  }
}

combineDocs()
