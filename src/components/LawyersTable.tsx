import Link from 'next/link'

const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Leslie has over 100 injury cases with similar settlements and has a 5 star rating. She is a top choice for this case.  Her responses to our interview questions were thorough, and she has agreed to provide weekly updates.',
    date: '1d ago',
    dateTime: '2023-03-04T15:54Z',
    rank: 'Top Choice',
    caseId: '123412342',
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Laudantium quidem non et saepe vel sequi accusamus consequatur et. Saepe inventore veniam incidunt cumque et laborum nemo blanditiis rerum. A unde et molestiae autem ad. Architecto dolor ex accusantium maxime cumque laudantium itaque aut perferendis.',
    date: '2d ago',
    dateTime: '2023-03-03T14:02Z',
    rank: 'Top Choice',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Quia animi harum in quis quidem sint. Ipsum dolorem molestias veritatis quis eveniet commodi assumenda temporibus. Dicta ut modi alias nisi. Veniam quia velit et ut. Id quas ducimus reprehenderit veniam fugit amet fugiat ipsum eius. Voluptas nobis earum in in vel corporis nisi.',
    date: '2d ago',
    dateTime: '2023-03-03T13:23Z',
  },
  {
    id: 4,
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Unde dolore exercitationem nobis reprehenderit rerum corporis accusamus. Nemo suscipit temporibus quidem dolorum. Nobis optio quae atque blanditiis aspernatur doloribus sit accusamus. Sunt reiciendis ut corrupti ab debitis dolorem dolorem nam sit. Ducimus nisi qui earum aliquam. Est nam doloribus culpa illum.',
    date: '3d ago',
    dateTime: '2023-03-02T21:13Z',
  },
]

export default function Example() {
  return (
    <div>
      <div className="mb-4 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Our Choices for You
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            We interviewed 8 lawyers, and these are our top choices for you.
          </p>
        </div>
        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
      <button
        type="button"
        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add user
      </button>
    </div> */}
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {comments.map((comment) => (
          <Link href={`/app/cases/lawyer/${comment.caseId}`}>
            <li
              key={comment.id}
              className="-mx-3 flex cursor-pointer gap-x-4 rounded-sm px-3 py-5 hover:bg-gray-50"
            >
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={comment.imageUrl}
                alt=""
              />
              <div className="flex-auto">
                <div className="flex items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {comment.name}
                  </p>
                  <p className="flex-none text-xs text-gray-600">
                    {comment.rank}
                  </p>
                </div>
                <p className="mt-1 line-clamp-4 text-sm leading-6 text-gray-600">
                  {comment.content}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
