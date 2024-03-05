'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, supabaseLawyers } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

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

export const useSession = (): Session | null => {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      const session = data?.session
      if (!session) {
        router.push('/app/login')
      }
      setSession(session)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push('/app/login')
        }
        setSession(session)
      },
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [router])

  return session
}

export const useStripePolice = (user: any) => {
  // create stripe user if doesn't exist
  useEffect(() => {
    if (!user?.stripeCustomerId && user?.email && user?.first && user?.last) {
      console.log('creating stripe user...')
      fetch('/api/stripe/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          name: `${user.first} ${user.last}`,
          id: user.id,
        }),
      }).then(async (res) => {
        const data = await res.json()
        console.log(data)
        if (data.error) {
          console.error(data.error)
        } else {
          console.log('created stripe user:', data.data)
          supabase
            .from('Lawyer')
            .update({ stripeCustomerId: data.data.customer.id })
            .eq('id', user.id)
            .then(({ data, error }) => {
              console.log('updated user:', data)
            })
        }
      })
    }
  }, [user?.stripeCustomerId, user?.email])

  // check stripeCustomerId is real
  useEffect(() => {
    if (user?.stripeCustomerId) {
      console.log('getting stripe user...')
      fetch(`/api/stripe/customer/get?customerId=${user.stripeCustomerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (res) => {
        const data = await res.json()
        const customer = data.data.customer

        if (customer.deleted) {
          console.log('customer deleted on stripe, deleting on supabase...')
          supabase
            .from('Lawyer')
            .update({ stripeCustomerId: null })
            .eq('id', user.id)
            .then(({ data, error }) => {
              console.log('deleted stripeCustomerId:', data)
            })
        }

        console.log(data)
        if (data.error) {
          console.error(data.error)
        } else {
          console.log('got stripe user:', data.data)
        }
      })
    }
  }, [user?.stripeCustomerId])
}

export const useLawyerUser = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState(null)
  const router = useRouter()
  useStripePolice(user)

  useEffect(() => {
    if (!session?.user?.id) {
      console.log("no session, can't find lawyer user:", session)
    } else {
      console.log('trying to get lawyer from db with id:', session?.user?.id)
      supabaseLawyers.auth.getSession().then(({ data, error }) => {
        const session = data?.session

        // get the user from db given id
        supabase
          .from('Lawyer')
          .select(
            `*, BarMembership(*), Invitation(*, Case(*, User(*))), Agreement(*)`,
          )
          .eq('id', session?.user?.id)
          .single()
          .then(({ data, error }) => {
            // create if doesn't exist
            if (!data) {
              console.log('creating lawyer...')
              supabase
                .from('Lawyer')
                .upsert([
                  {
                    id: session?.user?.id,
                    email: session?.user?.email,
                  },
                ])
                .then(({ data, error }) => {
                  setUser(data || null)
                })
            } else return { data, error }
          })
          .then(({ data, error }: any) => {
            setUser(data || null)
          })
      })
    }
  }, [session])

  useEffect(() => {
    const { data: authListener } = supabaseLawyers.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push('/lawyers/login')
        }
        setSession(session)
      },
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

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
