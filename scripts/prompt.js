const { compilePrompt } = require('./constructPrompt')

// Parse command-line arguments
const args = process.argv.slice(2)
const promptFlag = args.find((arg) => arg.startsWith('--prompt='))
const promptKey = promptFlag ? promptFlag.split('=')[1] : 'default'

compilePrompt(promptKey, true)
