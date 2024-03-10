import { OpenAI } from 'openai'

export async function POST(request) {
  const { inputText } = await request.json()

  console.log(inputText)

  const client = new OpenAI(process.env.OPENAI_API_KEY)

  try {
    console.log('trying to create')
    const mp3 = await client.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: inputText,
    })

    const audioData = await mp3.arrayBuffer()

    // const audioUrl = response.url
    return new Response(audioData, {
      status: 200,
      headers: { 'Content-Type': 'audio/mpeg' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
