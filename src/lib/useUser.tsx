'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export function useUser() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const session = supabase.auth.getSession()
    setUser(session?.user || null)

    if (!session) {
      // Redirect to login if not logged in
      router.push('/login')
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
      },
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [router])

  return user
}
