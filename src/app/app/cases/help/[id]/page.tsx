'use client'

import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import { withCaseData } from '@/components/withCaseData'

function LearnView() {
  return (
    <AppLayout>
      <CaseLayout viewName="Help">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <p className="text-2xl font-medium">Help</p>
          </div>
          <button
            type="button"
            className="whitespace-nowrap rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            The Panic Button 🚨
          </button>
        </div>
        <p className="mt-4">
          We're can find you a lawyer fast and for free, but if you need
          immediate help, the panic button will get you a lawyer on the phone
          right now for a flat fee.
        </p>
        <div className="mt-4">
          <p className="text-lg font-medium">Common Questions</p>
          <div>
            <p>Do I have a solid case?</p>
            <p></p>
          </div>
          <div>
            <p>Do I really need to hire a lawyer?</p>
            <p></p>
          </div>
          <div>
            <p>What should I look for in a lawyer?</p>
            <p></p>
          </div>
          <div>
            <p>What should I look out for?</p>
            <p></p>
          </div>
          <div>
            <p>How much will this end up costing?</p>
            <p></p>
          </div>
        </div>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(LearnView)
