import fs from 'fs/promises'
import path from 'path'

export default async function QuestionsPage() {
  // Read the questions from ../src/docs/questions.json
  const questionsPath = path.join(
    process.cwd(),
    'src',
    'docs',
    'questions.json',
  )
  const questionsData = await fs.readFile(questionsPath, 'utf8')
  const questions = JSON.parse(questionsData)

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="h1 mb-8">Questions</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-8">
          <h2 className="h3 mb-0">{question.question}</h2>
          <p className="p-sm">
            <strong>Answer:</strong> {question.answer}
          </p>
        </div>
      ))}
    </div>
  )
}
