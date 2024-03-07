'use client'
import { useLawyerUser } from '@/lib/useUser'
import { useCallback, useEffect, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { useIsVerified } from './useIsVerified'

export const useLinkToken = (userId) => {
  const [linkToken, setLinkToken] = useState(null)
  const generateToken = async () => {
    const response = await fetch('/api/plaid/create_link_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    const data = await response.json()

    setLinkToken(data.link_token)
  }
  useEffect(() => {
    userId && generateToken()
  }, [userId])
  return linkToken
}

export const LinkButton = ({ children }) => {
  const user = useLawyerUser()
  const linkToken = useLinkToken(user?.id)
  const verified = useIsVerified(user?.plaidVerificationId)

  const onSuccess = useCallback(
    (public_token, metadata) => {
      if (!user?.id) return
      // send public_token to server
      console.log('setting access token')
      console.log(public_token)
      console.log(metadata)
      fetch('/api/plaid/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link_session_id: metadata.link_session_id,
          lawyerId: user?.id,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response)
          // Handle response ...
        })
    },
    [user?.id],
  )

  const { open, ready } = usePlaidLink({
    token: linkToken!,
    onSuccess,
  })

  if (!ready) return <></>
  if (verified) return <></>
  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  )
}
