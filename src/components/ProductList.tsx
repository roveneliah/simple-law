// const products = [
//   {
//     id: 1,
//     name: 'Zip Tote Basket',
//     color: 'White and black',
//     href: '#',
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
//     imageAlt:
//       'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
//     price: '$140',
//   },
//   // More products...
// ]

import Link from 'next/link'
import lawyers1 from '@/images/resources/lawyers1.png'
import lawyers2 from '@/images/resources/lawyers2.png'
import Image from 'next/image'
// import lawyers3 from '@/images/resources/lawyers3.png'

const products = (caseId) => [
  {
    id: 1,
    name: 'Shotgun Strategy',
    description:
      'Get written opinions from multiple lawyers.  Compare and contrast to make a better decision.',
    href: `/app/cases/services/${caseId ? `${caseId}/` : ''}/shotgun`,
    price: '$48',
    imageSrc: lawyers1,
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: '"4-Eyes" Review',
    description: 'Build a relationship with a legal strategist.',
    href: `/app/cases/services/${caseId ? `${caseId}/` : ''}/sanity`,
    price: '$35',
    imageSrc: lawyers2,
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Sanity Check',
    description: 'Get a written opinion on a specific question or issue.',
    href: `/app/cases/services/${caseId ? `${caseId}/` : ''}/sanity`,
    price: '$89',
    imageSrc: lawyers2,
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
  },
  // {
  //   id: 4,
  //   name: 'Machined Mechanical Pencil',
  //   href: '#',
  //   price: '$35',
  //   imageSrc:
  //     'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
  //   imageAlt:
  //     'Hand holding black machined steel mechanical pencil with brass tip and top.',
  // },
  // More products...
]

export default function ProductList({ caseId }) {
  return (
    <div className="bg-white">
      <div className="mx-auto py-16 sm:py-24">
        <h2 className="text-xl font-bold text-gray-900">On Demand Services</h2>

        {/* <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {products(caseId).map((product) => (
            <div key={product.id}>
              <Link href={product.href}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                      width={500}
                      height={500}
                    />
                  </div>

                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-start justify-between overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black opacity-70"
                    />

                    <p className="relative text-lg font-semibold text-white">
                      {product.name}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />

                    <p className="relative text-lg font-semibold text-white">
                      {product.price}
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href={product.href}
                      className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                    >
                      Add to bag
                      <span className="sr-only">, {product.name}</span>
                    </a>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div> */}
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-1 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {products(caseId).map((product) => (
            <div key={product.id}>
              <Link href={product.href}>
                <div className="relative flex flex-row gap-8 lg:flex-col lg:gap-0">
                  <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-lg lg:w-full">
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                      width={500}
                      height={500}
                    />
                    {/* <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    /> */}
                    <div className="absolute inset-x-0 top-0 flex h-72 items-start justify-between overflow-hidden rounded-lg p-4">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black opacity-70"
                      />

                      <p className="relative text-lg font-semibold text-white">
                        {product.name}
                      </p>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                      />

                      <p className="relative text-lg font-semibold text-white">
                        {product.price}
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-6">
                      <a
                        href={product.href}
                        className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                      >
                        Add to bag
                        <span className="sr-only">, {product.name}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
