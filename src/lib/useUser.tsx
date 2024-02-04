'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export function useUser() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      const session = data?.session
      if (!session) {
        router.push('/account/login')
      }

      // get the user from db given id
      supabase
        .from('User')
        .select('*')
        .eq('id', session?.user?.id)
        .single()
        .then(({ data, error }) => {
          setUser(data || null)
        })
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push('/account/login')
        }
        setUser(session?.user || null)
      },
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [router])

  return {
    first: '',
    last: '',
    ...user,
  }
}

export function useRedirectIfSignedIn() {
  const router = useRouter()
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log(session)
        if (session?.user?.aud === 'authenticated') {
          router.push('/app')
        }
      },
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [router])
}
