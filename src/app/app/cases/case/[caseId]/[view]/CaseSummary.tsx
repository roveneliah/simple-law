'use client'

export function CaseSummary({ caseData }) {
  return (
    <div className="col-span-full py-4">
      <div className="mb-8">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Summary
        </label>
        <div className="mt-2">
          <p>{caseData?.summary}</p>
        </div>
      </div>
      <div className="mb-8">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Timeline
        </label>
        <div className="mt-2">
          <p>{caseData?.dates}</p>
        </div>
      </div>

      <div className="mb-8">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Goals
        </label>
        <div className="mt-2">
          <p>{caseData?.goals}</p>
        </div>
      </div>
      {/* <div className="mb-8">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Our Questions for You
              </label>
              <div className="mt-2">
                {caseData?.Question?.map((q) => (
                  <div key={q.id} className="mt-2">
                    <p>{q.question}</p>
                  </div>
                ))}
              </div>
            </div> */}
    </div>
  )
}
