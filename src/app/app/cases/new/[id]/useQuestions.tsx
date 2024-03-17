'use client'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'

export const useQuestions = (caseId) => {
  const [questions, setQuestions] = useState([])

  // subscribe to realtime case data channel
  useEffect(() => {
    const channel = supabase
      .channel('case-questions-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Questions',
          filter: `caseId=eq.${caseId}`,
        },
        (payload) => {
          console.log('New questions!', payload)
          setQuestions(payload.new)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [caseId])

  useEffect(() => {
    supabase
      .from('Question')
      .select('*')
      .eq('caseId', caseId)
      .then(({ data, error }) => {
        setQuestions(data)
      })
  }, [caseId])

  return questions
}
