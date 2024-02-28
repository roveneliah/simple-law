import Link from 'next/link'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = (caseId) => [
  {
    name: 'Summary',
    href: `/app/cases/case/${caseId}/summary`,
    current: false,
  },
  {
    name: 'Documents',
    href: `/app/cases/case/${caseId}/documents`,
    current: false,
  },
  {
    name: 'Facts',
    href: `/app/cases/case/${caseId}/facts`,
    current: false,
  },
  {
    name: 'Dates',
    href: `/app/cases/case/${caseId}/dates`,
    current: false,
  },
  {
    name: 'Goals',
    href: `/app/cases/case/${caseId}/goals`,
    current: true,
  },
  {
    name: 'Settings',
    href: `/app/cases/case/${caseId}/settings`,
    current: true,
  },

  // { name: 'Offer', href: '#', current: false },
  // { name: 'Hired', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CaseInfoHeader({ caseId, view }) {
  const liveTabs = tabs(caseId).map((tab) => ({
    ...tab,
    current: tab.name.toLowerCase() === view,
  }))

  console.log(view)

  return (
    <div className="">
      <h3 className="text-4xl font-medium leading-6 text-gray-900">
        Case Summary
      </h3>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
        We will use this to interview lawyers on your behalf.
      </p>
      <div className="mt-8">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={liveTabs?.find((tab) => tab.current)?.name}
          >
            {liveTabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        {/* <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {liveTabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div> */}
      </div>
    </div>
  )
}
