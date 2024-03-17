'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, supabaseLawyers } from '@/lib/supabaseClient'

/**
 * useUser listens for changes in the user's session and fetches the user from the database
 *
 * @returns user object from database
 */
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
        .select('*, Agreement(*, Lawyer(*), Case(*))')
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
    name: user?.first && user?.last ? `${user.first} ${user.last}` : '',
    ...user,
  }
}

/**
 *
 * useSession listens for changes in the user's session
 *
 * @returns supabase session
 */
export const useSession = () => {
  const [session, setSession] = useState(null)
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

/**
 *
 *  useStripePolice creates a stripe user if it doesn't exist and checks if the stripeCustomerId is real
 *
 * @param {Object} user
 */
export const useStripePolice = (user) => {
  // create stripe user if doesn't exist
  useEffect(() => {
    const loadedButNoStripeId =
      !user?.stripeCustomerId && user?.email && user?.first && user?.last
    if (loadedButNoStripeId) {
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

        // console.log(data)
        if (data.error) {
          console.error(data.error)
        } else {
          // console.log('got stripe user:', data.data)
        }
      })
    }
  }, [user?.stripeCustomerId])
}

/**
 *
 * useLawyerUser listens for changes in the lawyer's session and fetches the lawyer from supabase
 *
 * @returns lawyer user object from database
 */
export const useLawyerUser = () => {
  const [session, setSession] = useState(null)
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
            `*, BarMembership(*), Invitation(*, Case(*, User(*))), Agreement(*, Case(*, User(*)))`,
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
          .then(({ data, error }) => {
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

/**
 * useRedirectIfSignedIn redirects to /app if user is signed in, to be used in login page contexts
 */
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

/**
 * useRedirectLawyerIfSignedIn redirects to /lawyers if user is signed in, to be used in login page contexts
 */
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
