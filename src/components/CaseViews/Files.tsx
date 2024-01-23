'use client'
import { DocumentIcon } from '@heroicons/react/24/outline'

export const files = [
  {
    id: 1,
    name: 'Email screenshots',
    description: "Them telling me they're going to sue me.",
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
    icon: 'img',
  },
  {
    id: 2,
    name: 'Contract',
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
    icon: 'img',
  },
  {
    id: 3,
    name: 'Product pictures',
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
    icon: 'img',
  },
  {
    id: 4,
    name: 'IMG_4988.HEIC',
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
    icon: 'img',
  },
  {
    id: 5,
    name: 'IMG_4989.HEIC',
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
    icon: 'img',
  },
]

export function Files() {
  return (
    <div>
      <div className="col-span-full mt-8">
        <label
          htmlFor="cover-photo"
          className="block text-xl font-semibold leading-6 text-gray-900"
        >
          Upload Documents
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
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
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>
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
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View
              </button>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
