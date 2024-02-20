import AppLayout from '@/components/Layout/AppLayout'

// browse lawyers, view top awardees
export default function LawyersPage() {
  return (
    <AppLayout>
      <div className="mt-16">
        <h1 className="text-5xl font-extrabold tracking-tight">Star Lawyers</h1>
        <div className="mt-8">
          <h3 className="text-2xl font-bold">Best Communicators</h3>
          <p>
            Law is a dialogue. These attorneys have earned our praise by their
            commitment to ensuring clients understand and can be a crucial
            partner.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold">Top Strategists</h3>
          <p>These lawyers have provided elite strategic counsel.</p>
        </div>
        <div className="">
          <div className="mx-auto py-16 sm:py-24">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Top Strategists
              </h2>
              <a
                href="#"
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
              >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
              <div className="aspect-h-1 aspect-w-2 sm:aspect-h-1 sm:aspect-w-1 group relative overflow-hidden rounded-lg bg-gray-600 sm:row-span-2">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-03-featured-category.jpg"
                  alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                  className="object-cover object-center group-hover:opacity-75"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50"
                />
                <div className="absolute bottom-0 flex w-full items-end bg-gray-600/80 p-6">
                  <div>
                    <h3 className="font-semibold text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        Jerri Kelman
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Kelman Partners
                    </p>
                  </div>
                </div>
              </div>
              <div className="aspect-h-1 aspect-w-2 sm:aspect-none group overflow-hidden rounded-lg sm:relative sm:h-full">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                  alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                  className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                />
                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                  <div>
                    <h3 className="font-semibold text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        Accessories
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Shop now
                    </p>
                  </div>
                </div>
              </div>
              <div className="aspect-h-1 aspect-w-2 sm:aspect-none group overflow-hidden rounded-lg sm:relative sm:h-full">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                  alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                  className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                />
                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                  <div>
                    <h3 className="font-semibold text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        Workspace
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Shop now
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:hidden">
              <a
                href="#"
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
