'use client'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { CheckIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'

import Image from 'next/image'
import STORE from '../store'

const product = STORE['shotgun']
export function ShotgunProductView({ caseId }) {
  return (
    <div className="mx-auto w-full pb-24 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
      <div className="lg:self-end">
        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
        </div>

        <section aria-labelledby="information-heading" className="mt-4">
          <h2 id="information-heading" className="sr-only">
            Product information
          </h2>

          <div className="flex items-center">
            <p className="text-lg text-gray-900 sm:text-xl">{product.price}</p>
          </div>

          <div className="mt-4 space-y-6">
            <p className="text-base text-gray-500">{product.description}</p>
          </div>

          <div className="mt-6 flex items-center">
            <CheckIcon
              className="h-5 w-5 flex-shrink-0 text-green-500"
              aria-hidden="true"
            />
            <p className="ml-2 text-sm text-gray-500">48 hour turnaround.</p>
          </div>
          <div className="mt-2 flex items-center">
            <CheckIcon
              className="h-5 w-5 flex-shrink-0 text-green-500"
              aria-hidden="true"
            />
            <p className="ml-2 text-sm text-gray-500">2 written opinions.</p>
          </div>
          <div className="mt-2 flex items-center">
            <CheckIcon
              className="h-5 w-5 flex-shrink-0 text-green-500"
              aria-hidden="true"
            />
            <p className="ml-2 text-sm text-gray-500">
              Don't pay until you've matched.
            </p>
          </div>
        </section>
      </div>

      {/* Product image */}
      <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
     <section aria-labelledby="options-heading">
       <h2 id="options-heading" className="sr-only">
         Product options
       </h2>
        <form>
         <div className="sm:flex sm:justify-between">
           <RadioGroup value={selectedSize} onChange={setSelectedSize}>
             <RadioGroup.Label className="block text-sm font-medium text-gray-700">
               Lawyer
             </RadioGroup.Label>
             <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
               {product.sizes.map((size) => (
                 <RadioGroup.Option
                   as="div"
                   key={size.name}
                   value={size}
                   className={({ active }) =>
                     clsx(
                       active ? 'ring-2 ring-indigo-500' : '',
                       'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none',
                     )
                   }
                 >
                   {({ active, checked }) => (
                     <>
                       <RadioGroup.Label
                         as="p"
                         className="text-base font-medium text-gray-900"
                       >
                         {size.name}
                       </RadioGroup.Label>
                       <RadioGroup.Description
                         as="p"
                         className="mt-1 text-sm text-gray-500"
                       >
                         {size.description}
                       </RadioGroup.Description>
                       <div
                         className={clsx(
                           active ? 'border' : 'border-2',
                           checked
                             ? 'border-indigo-500'
                             : 'border-transparent',
                           'pointer-events-none absolute -inset-px rounded-lg',
                         )}
                         aria-hidden="true"
                       />
                     </>
                   )}
                 </RadioGroup.Option>
               ))}
             </div>
           </RadioGroup>
         </div>
         <div className="mt-4">
           <a
             href="#"
             className="group inline-flex text-sm text-gray-500 hover:text-gray-700"
           >
             <span>What size should I buy?</span>
             <QuestionMarkCircleIcon
               className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
               aria-hidden="true"
             />
           </a>
         </div>
         <div className="mt-10">
           <Link
             href={}
             className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
           >
             Get Started
           </Link>
         </div>
         <div className="mt-6 text-center">
           <a
             href="#"
             className="group inline-flex items-center text-base font-medium"
           >
             <ShieldCheckIcon
               className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
               aria-hidden="true"
             />
             <span className="text-gray-500 hover:text-gray-700">
               Quality Guarantee
             </span>
           </a>
         </div>
       </form>
     </section>
    </div> */}
    </div>
  )
}

export default function ShotgunProduct({ params: { caseId } }) {
  return (
    <AppLayout caseId={caseId}>
      <ShotgunProductView caseId={caseId} />
    </AppLayout>
  )
}
