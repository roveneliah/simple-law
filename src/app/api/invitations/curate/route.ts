import { supabase } from '@/lib/supabaseClient'
import { selectRandomCase } from './selectRandomCase'

// given case data, curate a list of N lawyers to invite to the case
const listLawyers = async () => {
  const { data, error } = await supabase.from('Lawyer').select('*')
  if (error) {
    console.log(error)
    return []
  }
  return data
}

const curateLawyers = ({ caseData, lawyers }: any) => {
  // pick N lawyers to invite to the case
  const N = 3
  return lawyers.slice(0, N)
}

export async function POST(request: Request) {
  // const { caseData } = await request.json()
  const caseData = await selectRandomCase()
  const lawyers = await listLawyers()

  // given lawyers, curate a list of N lawyers to invite to the case
  const curatedLawyers = curateLawyers({ caseData, lawyers })

  return new Response(JSON.stringify({ data: curatedLawyers }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
