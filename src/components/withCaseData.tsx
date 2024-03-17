// 'use client'

import { supabase } from '@/lib/supabaseClient'

export const withCaseData = (WrappedComponent: any) => {
  return async (props) => {
    console.log(props.params)
    const caseId = props.params.caseId
    const { data: cases, error } = await supabase
      .from('Case')
      .select('*')
      .eq('id', caseId)
    console.log(cases, error)
    const caseData = cases.find((caseItem) => caseItem?.id?.toString() === id)
    console.log(caseData)

    return <WrappedComponent {...props} caseData={caseData} caseId={caseId} />
  }
}
