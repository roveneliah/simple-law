'use client'
import AutoFlipComponent from '@/components/AutoFlip'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'
import { useLawyerUser } from '@/lib/useUser'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'

export default function VerificationPage() {
  const user = useLawyerUser()

  const [loading, setLoading] = useState(false)
  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    setLoading(true)

    // Gather data from the form
    const formData = new FormData(event.target)
    const updatedData = {
      id: user?.id,
      first: formData.get('first-name')?.toString().trim(),
      last: formData.get('last-name')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      // street_address: formData.get('street-address'),
      // city: formData.get('city'),
      // region: formData.get('region'),
      // postal_code: formData.get('postal-code'),
      // Add more fields as necessary
    }

    const { data, error } = await fetch('/api/lawyers/verification', {
      method: 'POST',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())

    console.log(updatedData)

    setLoading(false)

    if (error) {
      alert('Failed to update profile: ' + error.message)
    } else {
      alert('Profile updated successfully!')
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <LawyerAppLayout>
      <div>
        <div className="mb-8">
          <div
            style={{
              overflow: 'hidden',
              paddingBottom: '56.25%',
              position: 'relative',
              height: 0,
            }}
            className="rounded-lg"
          >
            <iframe
              style={{
                left: 0,
                top: 0,
                height: '100%',
                width: '100%',
                position: 'absolute',
              }}
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="w-full px-4">
          <div className="flex w-full flex-row justify-between">
            <p>Hey Jerri,</p>
            {/* <p>{currentIndex}</p> */}
          </div>
          <p className="mt-4">We're glad to have you!</p>
          <p className="mt-4">
            Once you give us some basic details about your practice and goals,
            we'll start sending you cases that match your preferences.
          </p>
          <p className="mt-4">
            Our job is to make sure we can provide you the best client flow, and
            speed up the process, such that we can offer our clients the highest
            quality lawyers.{' '}
          </p>
          <div className="mt-8 flex w-full flex-row justify-center gap-4">
            <Link
              href={'/lawyers/verification/form'}
              className="h-fit text-nowrap rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </LawyerAppLayout>
  )
}
