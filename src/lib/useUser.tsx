'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, supabaseLawyers } from '@/lib/supabaseClient'

export function useUser() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      const session = data?.session
      if (!session) {
        router.push('/app/login')
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
          router.push('/app/login')
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

export const useLawyerUser = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    supabaseLawyers.auth.getSession().then(({ data, error }) => {
      const session = data?.session
      // if (!session) {
      //   router.push('/lawyers/login')
      // }

      // get the user from db given id
      supabase
        .from('Lawyer')
        .select('*')
        .eq('id', session?.user?.id)
        .single()
        .then(({ data, error }) => {
          // create if doesn't exist
          if (!data) {
            console.log(
              'Trying to create a new lawyer in db.  Found:',
              data,
              error,
            )
            supabase
              .from('Lawyer')
              .upsert([
                {
                  id: session?.user?.id,
                  email: session?.user?.email,
                },
              ])
              .then(({ data, error }) => {
                console.log('Data:', data, 'Error:', error)
                setUser(data || null)
              })
          } else return { data, error }
        })
        .then(({ data, error }) => {
          console.log('Data:', data, 'Error:', error)
          setUser(data || null)
        })
    })

    const { data: authListener } = supabaseLawyers.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push('/lawyers/login')
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

export function useRedirectLawyerIfSignedIn() {
  const router = useRouter()
  useEffect(() => {
    const { data: authListener } = supabaseLawyers.auth.onAuthStateChange(
      (_event, session) => {
        console.log(session)
        if (session?.user?.aud === 'authenticated') {
          router.push('/lawyers')
        }
      },
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [router])
}
