import { promises as fs } from 'fs'

export async function GET() {
  try {
    // const filePath = path.join(process.cwd(), 'docs', 'combined.txt')
    const prompt = await fs.readFile('./src/docs/combined.txt', 'utf-8')
    console.log(prompt)
    return new Response(prompt, {
      status: 200,
      headers: {
        'content-type': 'text/plain',
      },
    })
  } catch (error) {
    console.error('Error reading file:', error)
    return new Response('Error reading file', {
      status: 500,
      headers: {
        'content-type': 'text/plain',
      },
    })
  }
}
