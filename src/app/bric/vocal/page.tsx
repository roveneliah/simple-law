'use client'
import { useState } from 'react'

export default function Page() {
  const [inputText, setInputText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log(inputText)
      const response = await fetch('/bric/vocal/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      })
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(audioUrl)
    } catch (error) {
      console.error('Error:', error)
    }

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto">
      <h1 className="h1">Text-to-Speech</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="inputText" className="mb-2 block">
            Enter Text:
          </label>
          <textarea
            id="inputText"
            className="w-full rounded border border-gray-300 p-2"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Converting...' : 'Convert to Speech'}
        </button>
      </form>

      {audioUrl && (
        <div className="mt-8">
          <h2 className="h2">Generated Audio:</h2>
          <audio src={audioUrl} controls />
        </div>
      )}
    </div>
  )
}
