const fs = require('fs')
const path = require('path')

async function combineDocs() {
  try {
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

    // Combine the contents into a single string
    const combinedContent = `${globalContent}\n\n${schemaContent}\n\n${indexContent}`

    // Copy the combined content to the clipboard
    await clipboardy.default.write(combinedContent)

    console.log('Combined documentation copied to clipboard!')
  } catch (error) {
    console.error('Error combining documentation:', error)
  }
}

combineDocs()
