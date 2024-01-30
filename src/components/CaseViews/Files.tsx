'use client'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export const FILES = [
  {
    id: 1,
    name: 'Email screenshots',
    description: "Them telling me they're going to sue me.",
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
  },
  {
    id: 2,
    name: 'Contract',
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
  },
  {
    id: 3,
    name: 'Product pictures',
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
  },
  {
    id: 4,
    name: 'IMG_4988.HEIC',
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
  },
  {
    id: 5,
    name: 'IMG_4989.HEIC',
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
  },
]

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

export function Files({ caseData }) {
  const [files, setFiles] = useState(FILES)

  const addFile = (file) => {
    setFiles([...files, file])
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
    <div>
      <div className="col-span-full mt-8">
        <label
          htmlFor="cover-photo"
          className="block text-xl font-semibold leading-6 text-gray-900"
        >
          Upload Documents
        </label>
        <UploadView addFile={addFile} />
      </div>
      {files.length > 0 && (
        <div className="col-span-full mt-4">
          <p className="block text-lg font-semibold leading-6 text-gray-900">
            Files
          </p>
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between border-b border-gray-200/10 py-3"
            >
              <div className="flex items-center gap-x-3">
                {/* <DocumentIcon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    /> */}
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
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    setFiles(files.filter((f) => f.id !== file.id))
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-16 rounded-lg border border-black px-8 pb-16 pt-8 ">
        <p>DEV: Output Case Info for AI</p>
        <p>{JSON.stringify(parseCaseData(caseData))}</p>
      </div>
      <div className="mt-16 rounded-lg border border-black px-8 pb-16 pt-8 ">
        <p>DEV: Output Letter</p>
        <p>Hey Jason,</p>
        <p>We found a new case we think you might be a fit for.</p>
        <p className="border-l-2 px-4 py-2">
          Personal Injury Case - Auto Accident: San Diego, California Client
          injured in a multi-car collision. Alleged negligence by the other
          driver. Individual driver, mid-30s, seeking compensation for injuries
          and vehicle damage. Estimated claim is around $150,000. Complexity:
          Moderate, involving negotiation with insurance companies. Urgency:
          Response needed by February 15th for timely filing. Conflict Check: No
          known conflicts identified at this stage.
        </p>
        {/* 
        <p className="border-l-2 px-4 py-2">
          Commercial Contract Dispute: Austin, Texas Summary: Local electronics
          retailer seeking legal advice on a breach of contract with a supplier,
          involving delayed deliveries and quality issues. Value: Dispute
          involves approximately $75,000. Complexity: Low to moderate; potential
          for quick settlement. Timeline: Interested lawyers should express
          interest within the next two weeks.
        </p> */}
        <p className="py-2">
          To explore these cases further, including detailed case information
          and client profiles, please log in to your dashboard.
        </p>
        <p className="pt-2">Cheers,</p>
        <p>Team Simple</p>
      </div>
    </div>
  )
}
