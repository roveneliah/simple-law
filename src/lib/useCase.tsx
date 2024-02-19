'use client'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'

export const getCaseData = (caseId) => {
  return supabase
    .from('Case')
    .select('*, Invitation(*, Lawyer(*), Service(*)), Agreement(*, Lawyer(*))')
    .eq('id', caseId)
    .single()
}

export const useCase = (caseId) => {
  const [caseData, setCaseData] = useState(null)
  useEffect(() => {
    try {
      caseId &&
        getCaseData(caseId).then(({ data, error }) => {
          setCaseData(data)
        })
    } catch (error) {
      console.log(error)
    }
  }, [caseId])
  return caseData
}
