'use client'
import CaseLayout from '@/components/CaseLayout'
import AppLayout from '@/components/Layout/AppLayout'
import MagicText from '@/components/vibes/MagicText'
import { withCaseData } from '@/components/withCaseData'
import Link from 'next/link'

function CaseView({ caseData }) {
  const { id, name, description } = caseData || {
    id: null,
    name: null,
    description: null,
  }

  return (
    <AppLayout>
      <CaseLayout viewName="Status" id={id}>
        {/* <p className="transition-all hover:animate-pulse hover:cursor-pointer hover:text-orange-500">
          {description}
        </p> */}
        {/* <p className="transition-all hover:animate-pulse hover:cursor-pointer hover:text-orange-500">
          Hi Eli, tell us some more about your case so we can pair you with a
          trusted <MagicText>attorney</MagicText>.
        </p> */}

        <div className="col-span-full">
          <p className="text-xl font-medium text-gray-900/75">Hey {name},</p>
          <p className="mt-4 w-2/3">
            We're working to get you paired with a lawyer. You'll receive an
            email in under 48 hours with our top picks, and an explanation why.
          </p>
          <p className="mt-4 w-2/3">
            If there's any addition information or documents to share, do so{' '}
            <Link
              href={`/app/cases/case/${id}`}
              className="text-purple-400 transition-all hover:font-medium hover:text-purple-500"
            >
              here
            </Link>
            .
          </p>
        </div>
      </CaseLayout>
    </AppLayout>
  )
}

export default withCaseData(CaseView)
