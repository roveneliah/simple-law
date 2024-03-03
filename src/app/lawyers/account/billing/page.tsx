'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import { useLawyerUser, useRedirectLawyerIfSignedIn } from '@/lib/useUser'
import { useState } from 'react'
import Link from 'next/link'
import { LawyerProfileHeader } from '../../../../components/LawyerProfileHeader'

export default function Account() {
  const user = useLawyerUser()

  const [loading, setLoading] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    // Gather data from the form
    const formData = new FormData(event.target)
    const updatedData = {
      first: formData.get('first-name')?.toString().trim(),
      last: formData.get('last-name')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      // street_address: formData.get('street-address'),
      // city: formData.get('city'),
      // region: formData.get('region'),
      // postal_code: formData.get('postal-code'),
      // Add more fields as necessary
    }

    console.log(updatedData)

    // Update the user profile db entry in Supabase
    const { data, error } = await supabase
      .from('Lawyer')
      .update(updatedData)
      .eq('id', user.id)

    console.log(data)
    console.log(error)

    setLoading(false)

    if (error) {
      alert('Failed to update profile: ' + error.message)
    } else {
      alert('Profile updated successfully!')
    }
  }

  const [subview, setSubview] = useState('notifications')

  return (
    <LawyerAppLayout>
      <div className="mt-16" />
      <LawyerProfileHeader lawyer={user} status={'gold'} view={'billing'} />
      <div className="mt-16 flex flex-row gap-32">
        <div className="flex w-fit flex-col items-start gap-0">
          <button
            type="button"
            onClick={() => setSubview('membership')}
            className={`text-base font-semibold leading-7 ${subview === 'membership' ? 'text-bold text-gray-900' : 'text-gray-500'}`}
          >
            Membership
          </button>
          <button
            type="button"
            onClick={() => setSubview('cases')}
            className={`text-base font-semibold leading-7 ${subview === 'cases' ? 'text-bold text-gray-900' : 'text-gray-500'}`}
          >
            Cases
          </button>
          {/* <button
            type="button"
            onClick={() => setSubview('verification')}
            className={`text-base font-semibold leading-7 ${subview === 'verification' ? 'text-bold text-gray-900' : 'text-gray-500'}`}
          >
            Verification
          </button> */}
        </div>
        {subview === 'membership' && (
          <div className="flex w-full flex-col gap-4">
            <h4 className="text-4xl font-semibold">Membership</h4>
            <Link href={process.env.NEXT_PUBLIC_STRIPE_GOLD}>
              <div>
                <p>Impossible Gold Yearly</p>
                <p>January 24 2024</p>
                <p>$1200</p>
              </div>
            </Link>
          </div>
        )}
        {subview === 'cases' && (
          <div className="flex w-full flex-col gap-2">
            <h4 className="text-4xl font-semibold">Cases</h4>

            <Link href={process.env.NEXT_PUBLIC_STRIPE_GOLD} className="w-full">
              <div className="flex w-full flex-row justify-between gap-4">
                <div className="flex flex-row gap-2">
                  <p className="font-medium text-gray-500">$100</p>
                  <p className="font-semibold tracking-tighter">
                    Case Match Gold
                  </p>
                </div>
                <p>Feb 13 2024</p>
              </div>
            </Link>
            <Link href={process.env.NEXT_PUBLIC_STRIPE_GOLD} className="w-full">
              <div className="flex w-full flex-row justify-between gap-4">
                <div className="flex flex-row gap-2">
                  <p className="font-medium text-gray-500">$250</p>
                  <p className="font-semibold tracking-tighter">
                    Case Match Free
                  </p>
                </div>
                <p>Feb 13 2023</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </LawyerAppLayout>
  )
}
