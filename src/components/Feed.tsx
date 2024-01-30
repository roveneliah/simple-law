import { Dropdown } from './Dropdown'

export const feed = [
  {
    id: 5,
    name: 'Tell us more about your case.',
    from: 'IMPOSSIBLELaw',
    href: '#',
  },
  {
    id: 5,
    name: 'We found 4 lawyers you might like.',
    from: 'IMPOSSIBLELaw',
    href: '#',
  },
  {
    id: 5,
    name: 'Flip through some lawyers that might be a fit.',
    from: 'IMPOSSIBLELaw',
    href: '#',
  },
]

export function Feed() {
  return (
    <>
      <div className="col-span-full">
        {/* <label
          htmlFor="cover-photo"
          className="block text-xl font-semibold leading-6 text-gray-900"
        >
          Home
        </label> */}
        <p className="text-xl font-medium text-gray-900/75">Hey Eli,</p>
        <p className="mt-4 w-2/3">
          We're working to get you paired with a lawyer. You'll receive an email
          in under 48 hours with our top picks, and an explanation why.
        </p>
        <p className="mt-4 w-2/3">
          If there's any addition information or documents to share, do so{' '}
          <a
            href="#"
            className="text-purple-400 transition-all hover:font-medium hover:text-purple-500"
          >
            here
          </a>
          .
        </p>
      </div>
      <div className="col-span-full mt-4 mt-80">
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
