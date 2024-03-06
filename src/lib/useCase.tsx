'use client'
import { supabase } from '@/lib/supabaseClient'
import { UUID } from 'crypto'
import { useEffect, useState } from 'react'

export const getCaseData = (caseId: UUID) => {
  return supabase
    .from('Case')
    .select(
      '*, Question(*), CaseAnalysis(*), Document(*), Invitation(*, Lawyer(*), Service(*)), Agreement(*, Lawyer(*))',
    )
    .eq('id', caseId)
    .single()
}

export const useCase = (caseId: UUID) => {
  const [caseData, setCaseData] = useState(null)

  // subscribe to realtime case data channel
  useEffect(() => {
    const channel = supabase
      .channel('case-filter-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Case',
          filter: `id=eq.${caseId}`,
        },
        (payload) => {
          console.log('Change received!', payload)
          setCaseData(payload.new)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

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
