'use client'
import LawyerViewLayout from '@/components/LawyerViewLayout'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { supabase, supabaseLawyers } from '@/lib/supabaseClient'
import { useLawyerUser } from '@/lib/useUser'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const getLawyerAvatarUrlById = (lawyerId: string) => {
  const timestamp = new Date().getTime() // Current timestamp as cache buster
  return `${process.env.NEXT_PUBLIC_SUPABASE_LAWYERS_URL}/storage/v1/object/public/avatars/${lawyerId}/avatar?cacheBust=${timestamp}`
}

async function updateLawyerImageUrl(lawyerId: string, fullPath: string) {
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_LAWYERS_URL}/storage/v1/object/public/${fullPath}`
  const { data, error } = await supabase
    .from('Lawyer')
    .update({ imageUrl })
    .eq('id', lawyerId)

  if (error) {
    console.error('Error updating lawyer profile:', error)
    return { error }
  }

  return { data }
}

export default function Profile() {
  const lawyer = useLawyerUser()

  const [avatarUrl, setAvatarUrl] = useState<string>('')
  useEffect(() => {
    setAvatarUrl(getLawyerAvatarUrlById(lawyer.id))
  }, [lawyer.id])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const file = e.target.files[0]

      // Directly upload the file without reading it as text
      uploadPhoto({ blob: file, name: file.name })
        .then(({ data, error }: any) => {
          console.log(data, error)
          updateLawyerImageUrl(lawyer.id, data?.fullPath)
        })
        .finally(() => setAvatarUrl(getLawyerAvatarUrlById(lawyer.id)))
    }
  }

  const uploadPhoto = async ({ blob, name }: any) => {
    if (!blob) {
      alert('Please select a photo to upload.')
      return
    }

    console.log(blob)
    try {
      const { data, error } = await supabaseLawyers.storage
        .from('avatars')
        .upload(`${lawyer.id}/avatar`, blob, {
          cacheControl: '3600',
          upsert: true,
        })

      console.log('Uploaded photo:', data)
      console.log(data, error)
      return { data, error }
    } catch (error) {
      console.error('Error uploading photo:', error)
      alert('Error uploading photo.')
    }
  }

  console.log(lawyer)
  console.log(getLawyerAvatarUrlById(lawyer.id))
  console.log(avatarUrl)
  return (
    <LawyerAppLayout>
      <form className="mt-8">
        <div className="space-y-0">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter">
              Impossible{' '}
              <span className="underline decoration-amber-300">Gold</span>
            </h1>
          </div>
          <div className="flex flex-row gap-2 text-4xl font-bold tracking-tighter text-gray-400">
            <Link href={'/lawyers/account'}>
              <p className="transition-all hover:text-gray-500">
                account settings
              </p>
            </Link>
            <Link href={'/lawyers/perks'}>
              <p className="transition-all hover:text-gray-500">perks</p>
            </Link>
            <Link href={'/lawyers/verification'}>
              <p className="transition-all hover:text-gray-500">verification</p>
            </Link>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      impossiblelaw.com/
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <img
                    src={avatarUrl}
                    className="h-24 w-24 rounded-full bg-gray-800"
                    alt="avatar"
                  />
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <div className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <span>Change</span>
                    </div>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </LawyerAppLayout>
  )
}
