'use client'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import { useLawyerUser, useRedirectLawyerIfSignedIn } from '@/lib/useUser'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { LawyerProfileHeader } from '../../../components/LawyerProfileHeader'

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
          <div>
            <h1 className="text-5xl font-bold tracking-tighter">Tools</h1>
            <div className="mt-8 flex flex-col gap-4">
              <div>
                <p className="font-bold">Argument Simulator</p>
                <li>Craft an argument, pulling from precendent.</li>
                <li>Simulate counterarguments.</li>
              </div>
              <div>
                <p className="font-bold">Contract Library</p>
                <li>Manage and draft knowledge base.</li>
              </div>
              <div>
                <p className="font-bold">Sensei</p>
                <li>AI to upskill in-house team on your organization.</li>
                <li>Give external counsel access to key info.</li>
                <li>Redirect employee questions to AI.</li>
              </div>
              <div>
                <p className="font-bold">Legal Dojo</p>
                <p>
                  Test and grow your legal knowledge in our training studio.
                </p>
              </div>
              <div>
                <p className="font-bold">Brand Studio</p>
                <p>Elevate your brand with our marketing partners.</p>
              </div>
              <div>
                <p className="font-bold">Healthcare</p>
                <p>Healthcare options for independent lawyers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LawyerAppLayout>
  )
}
