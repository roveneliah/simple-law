import { LawyerProfile } from '@/app/lawyers/profile/[id]/page'
import AppLayout from '@/components/Layout/AppLayout/AppLayout'

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
    <AppLayout>
      <LawyerProfile lawyer={data} />
    </AppLayout>
  )
}
