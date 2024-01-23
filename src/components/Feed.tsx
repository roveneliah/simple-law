export const feed = [
  {
    id: 5,
    name: 'Tell us more about your case.',
    from: 'SimpleLaw',
    href: '#',
  },
  {
    id: 5,
    name: 'We found 4 lawyers you might like.',
    from: 'SimpleLaw',
    href: '#',
  },
  {
    id: 5,
    name: 'Flip through some lawyers that might be a fit.',
    from: 'SimpleLaw',
    href: '#',
  },
]

export function Feed() {
  return (
    <>
      <div className="col-span-full mx-4 mt-8">
        <label
          htmlFor="cover-photo"
          className="block text-xl font-semibold leading-6 text-gray-900"
        >
          Feed
        </label>
        <p className="mt-4 font-medium text-gray-900/75">Hi, Eli.</p>
      </div>
      <div className="col-span-full mx-4 mt-4">
        {feed.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between border-b border-gray-200/10 py-3"
          >
            <div className="flex items-center gap-x-3">
              {/* <DocumentIcon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    /> */}
              <span className="text-sm font-medium text-gray-900/50">
                {file.from}
              </span>
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
    </>
  )
}
