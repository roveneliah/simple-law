'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import { useLawyerUser, useRedirectLawyerIfSignedIn } from '@/lib/useUser'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { LawyerProfileHeader } from '../profile/page'

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

  return (
    <LawyerAppLayout>
      <div className="mt-16" />
      <LawyerProfileHeader lawyer={user} status={'gold'} view={'perks'} />
      <div className="mt-8 flex w-full flex-row sm:gap-8">
        <div className="flex flex-col items-start gap-0">
          <button>Training</button>
          <button>Marketing</button>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div>
            <p className="font-bold tracking-tighter">
              Empathizing with Clients via Negotiation
            </p>
            <p>Black Swan Group</p>
            <p>
              Fees reduces by 20% on completion of communications training
              pathway.
            </p>
          </div>
          <div>
            <p className="font-bold tracking-tighter">
              30% Off Video Production
            </p>
            <p>Black Swan Group</p>
            <p>Fees reduces by 5% with a video produced by...</p>
          </div>
        </div>
      </div>
    </LawyerAppLayout>
  )
}
