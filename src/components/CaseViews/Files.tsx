'use client'
import { useCase } from '@/lib/useCase'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/lib/useUser'
import {
  DocumentIcon,
  PaperClipIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const parseCaseData = (caseData) => {
  const { id, name, description } = caseData || {
    id: null,
    name: null,
    description: null,
  }
  return {
    name,
    description,
    budget: 20000,
    value: 1000000,
    location: 'New York, NY',
    type: 'Personal Injury',
    client: 'John Smith',
    clientType: 'Individual',
    clientLocation: 'New York, NY',
    complexity: 'Medium',
  }
}

function UploadView({ addFile }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        // const content = e.target.result
        // Process the content here
        addFile({
          id: Math.random(),
          name: file.name,
          description: file.description,
          href: '#',
          size: file.size,
          lastModified: file.lastModified,
          // content,
          blob: file,
        })
      }
      reader.readAsText(file) // Read the file as text
    }
  }

  return (
    <div className="mt-4 flex justify-center rounded-lg border border-dashed border-black border-white/25 px-6 py-10">
      <div className="text-center">
        <DocumentIcon
          className="mx-auto h-12 w-12 text-gray-300"
          aria-hidden="true"
        />
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-600">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  )
}

export const useFiles = (userId: string, caseId: string) => {
  const [files, setFiles] = useState([])
  const [nonce, setNonce] = useState<number>(0)

  const fetchFiles = async (userId, caseId) => {
    const { data, error } = await supabase.storage
      .from('caseFiles')
      .list(`${userId}/${caseId}`)

    console.log('fetched files', data, error)

    return { data, error }
  }

  useEffect(() => {
    if (userId && caseId) {
      console.log('fetching files', userId, caseId)
      fetchFiles(userId, caseId).then(({ data, error }: any) => setFiles(data))
    } else {
      console.log("not fetching files because userId or caseId isn't set")
    }
  }, [userId, caseId, nonce])

  console.log(files)

  return { files, setFiles, fetchFiles: () => setNonce(Math.random()) }
}

export function Files({ caseId }) {
  const user = useUser()
  const { files, setFiles, fetchFiles } = useFiles(user.id, caseId)
  // const caseData = useCase(caseId)
  const addFile = (file) => {
    // add to supabase document store
    console.log('trying to add file to supabase')
    supabase.storage
      .from('caseFiles')
      .upload(`${user.id}/${caseId}/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false,
      })
      .then((response) => {
        console.log('response from supabase')
        console.log(response)
        fetchFiles()
      })
      .catch((error) => {
        console.log('error from supabase')
        console.log(error)
      })
  }

  const deleteFile = (file) => {
    // delete from supabase
    supabase.storage
      .from('caseFiles')
      .remove(`${user.id}/${caseId}/${file.name}`)
      .then((response) => {
        console.log('response from supabase')
        console.log(response)
        fetchFiles()
      })
      .catch((error) => {
        console.log('error from supabase')
        console.log(error)
      })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        // const content = e.target.result
        // Process the content here
        addFile({
          id: Math.random(),
          name: file.name,
          description: file.description,
          href: '#',
          size: file.size,
          lastModified: file.lastModified,
          // content,
          blob: file,
        })
      }
      reader.readAsText(file) // Read the file as text
    }
  }

  const viewFile = (file) => {
    // For text files, you can simply alert or display in a modal/dialog

    // For more complex handling (like images or PDFs), you might need to
    // convert the content to a Blob and create an object URL.
    // This depends on how you've stored the file content.
    const blob = new Blob([file.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    window.open(url)
  }

  const downloadFile = (file) => {
    // Create a URL for the file
    const url = URL.createObjectURL(file.blob)

    // Create a temporary link element
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    document.body.appendChild(a)

    // Trigger the download
    a.click()

    // Clean up by revoking the Object URL and removing the link element
    URL.revokeObjectURL(url)
    a.remove()
  }

  return (
    <div className="">
      {/* <div className="col-span-full mt-8">
        <label
          htmlFor="cover-photo"
          className="block text-xl font-semibold leading-6 text-gray-900"
        >
          Upload Documents
        </label>
        <UploadView addFile={addFile} />
      </div> */}

      <div className="col-span-full">
        <div className="flex flex-row justify-between">
          <p className="block text-lg font-semibold leading-6 text-gray-900">
            Upload any relevant documents.
          </p>
          {/* <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label> */}
        </div>
        <div className="mt-2 flex justify-center rounded-t-lg border-x border-t border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
        {files.length > 0 && (
          <div className="mt-0 rounded-b-md border px-3 py-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between border-b border-gray-200/10 py-2"
              >
                <div className="flex items-center gap-x-3">
                  <PaperClipIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-900/75">
                    {file.name}
                  </span>
                  {file?.description && (
                    <span className="text-sm font-medium text-gray-900/50">
                      {file.description}
                    </span>
                  )}
                </div>
                <div className="flex gap-x-3">
                  {file.content && (
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => viewFile(file)}
                    >
                      View
                    </button>
                  )}
                  {file.blob && (
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => downloadFile(file)}
                    >
                      Download
                    </button>
                  )}
                  <button
                    type="button"
                    className="text-sm font-normal text-indigo-600 hover:text-indigo-500"
                    onClick={() => deleteFile(file)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
