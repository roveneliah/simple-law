'use client'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'

export const useCase = (caseId) => {
  const [caseData, setCaseData] = useState(null)
  useEffect(() => {
    supabase
      .from('Case')
      .select('*')
      .eq('id', caseId)
      .single()
      .then(({ data, error }) => {
        setCaseData(data)
      })
  }, [caseId])
  return caseData
}
