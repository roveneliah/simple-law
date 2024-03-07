'use client'
import { useEffect, useState } from 'react'

export const useIsVerified = (verificationId: string) => {
  const [isVerified, setIsVerified] = useState(null)
  const checkVerification = async () => {
    const response = await fetch('/api/plaid/verify_verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ verificationId }),
    })
    const { verified } = await response.json()
    console.log(verified)
    setIsVerified(verified)
  }
  useEffect(() => {
    verificationId && checkVerification()
  }, [verificationId])
  return isVerified
}
