import LawyerAppLayout from '@/components/Layout/LawyerAppLayout/LawyerAppLayout'
import { supabase } from '@/lib/supabaseClient'

export function LawyerProfile({ lawyer }) {
  return (
    <div>
      <h3 className="text-7xl font-bold tracking-tighter">
        {lawyer.first} {lawyer.last}
      </h3>
    </div>
  )
}

export default async function LawyerProfilePage({ params: { id } }) {
  const { data: lawyer, error } = await supabase
    .from('Lawyer')
    .select('*')
    .eq('id', id)
    .single()

  return (
    <LawyerAppLayout>
      <LawyerProfile lawyer={lawyer} />
    </LawyerAppLayout>
  )
}
