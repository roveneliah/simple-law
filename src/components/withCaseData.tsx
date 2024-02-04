// 'use client'

import { CASES } from '@/data/dummy'
import { supabase } from '@/lib/supabaseClient'
import { usePathname } from 'next/navigation'

export const withCaseData = (WrappedComponent: any) => {
  return (props: any) => {
    const id = usePathname().split('/').pop()

    const caseData = CASES.find((caseItem) => caseItem?.id?.toString() === id)

    return <WrappedComponent {...props} caseData={caseData} caseId={id} />
  }
}
