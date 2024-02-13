import { FALLBACK_AVATAR } from '@/data/dummy'
import { Service } from '@prisma/client'

const getLawyerById = async (id: string) => {
  const { data, error } = await fetch(
    `http:localhost:3000/api/lawyers?id=${id}`,
    {
      method: 'GET',
    },
  ).then((res) => res.json())

  return { data, error }
}

export default async function LawyerPage({ params }) {
  const { data, error } = await getLawyerById(params.id)

  return (
    <div>
      <div>
        <img
          src={data.avatar}
          className="h-10 w-10 rounded-full bg-gray-800"
          alt="avatar"
        />
        <p>
          {data.first} {data.last}
        </p>
        <p>{data.bio}</p>
        <p>{data.firm}</p>
      </div>
      <div>
        {data.Service.map((service: Service) => (
          <div key={service.id}>
            <p>{service.type}</p>
            <p>{service.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
