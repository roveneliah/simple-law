'use client'
import { supabase } from '@/lib/supabaseClient'
import { UUID } from 'crypto'
import { useEffect, useState } from 'react'

export const useCase = (caseId: UUID) => {
  const [caseData, setCaseData] = useState(null)
  useEffect(() => {
    try {
      caseId &&
        supabase
          .from('Case')
          .select(
            '*, Invitation(*, Lawyer(*), Service(*)), Agreement(*, Lawyer(*))',
          )
          .eq('id', caseId)
          .single()
          .then(({ data, error }) => {
            setCaseData(data)
          })
    } catch (error) {
      console.log(error)
    }
  }, [caseId])
  return caseData
}
