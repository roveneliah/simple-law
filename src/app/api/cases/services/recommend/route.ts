import { supabase } from '@/lib/supabaseClient'
import { Case, ServiceType } from '@prisma/client'
import { NextRequest } from 'next/server'

const recommendedService = async (caseData: any, serviceType: ServiceType) => {
  // get all services of
  const { data: services, error } = await supabase
    .from('Service')
    .select()
    .eq('type', serviceType)

  // pick up to 3 random recommended services
  const recommendedServices = services
    ?.sort(() => 0.5 - Math.random())
    .slice(0, 3)

  return recommendedServices
}

// write recommendations to Case in db
export async function GET(request: NextRequest) {
  try {
    // nexturl params caseId
    const caseId = request.nextUrl.searchParams.get('caseId')

    // get the case, and then update the recommendations
    const { data: caseData, error: caseError } = await supabase
      .from('Case, Document(*)')
      .select()
      .eq('id', caseId)

    // recommend services based on the case, random for now
    const recommendations = await recommendedService(caseData, 'attorney')

    // const { data, error } = await supabase
    //   .from('Case')
    //   .update({
    //     recommendations,
    //     updatedAt: new Date(),
    //   })
    //   .eq('id', caseId)
    return new Response(
      JSON.stringify({
        data: recommendations,
      }),
      {
        status: 201,
      },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
