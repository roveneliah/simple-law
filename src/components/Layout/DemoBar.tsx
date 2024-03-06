import { XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function DemoBar() {
  return (
    <>
      {/*
        Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
        your content from being obscured when the user scrolls to the bottom of the page.
      */}
      <div className="inset-x-0 top-0 w-full">
        <div className="pointer-events-auto flex flex-row items-center justify-center gap-x-6 bg-gray-900 px-6 py-2.5 sm:py-3 sm:pl-4 sm:pr-3.5">
          <div className="flex w-full  flex-row">
            <div className="flex w-full flex-row justify-between">
              <p className="whitespace-nowrap text-sm leading-6 text-white">
                <strong className="font-semibold">
                  Welcome to ImpossibleLaw's Demo
                </strong>
                {/* <svg
                  viewBox="0 0 2 2"
                  className="mx-2 inline h-0.5 w-0.5 fill-current"
                  aria-hidden="true"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg> */}
              </p>
              {/* <p className="w-1/3 whitespace-nowrap  text-center text-sm text-white"></p> */}
              <Link
                href="/lawyers/verification"
                className="flex flex-row justify-end"
              >
                <p className="whitespace-nowrap text-sm font-semibold leading-6 text-white">
                  <span className="font-normal">You're using test data</span>{' '}
                  <svg
                    viewBox="0 0 2 2"
                    className="mx-2 inline h-0.5 w-0.5 fill-current"
                    aria-hidden="true"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  Get verified &nbsp;
                  <span aria-hidden="true">&rarr;</span>
                </p>
              </Link>
              {/* <button type="button" className="-m-1.5 flex-none p-1.5">
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
