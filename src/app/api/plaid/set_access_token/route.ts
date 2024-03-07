import { supabase } from '@/lib/supabaseClient'
import { NextRequest } from 'next/server'
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
})

const plaidClient = new PlaidApi(configuration)

const updateUserRecordForIDVSession = async (idvSession, lawyerId) => {
  const IDVResult = await plaidClient.identityVerificationGet({
    identity_verification_id: idvSession,
  })
  const IDVData = IDVResult.data
  if (IDVData.status === 'success') {
    console.log('success')
    console.log("updating user's plaidUserId", lawyerId)
    const { data, error } = await supabase
      .from('Lawyer')
      .update({
        plaidVerificationId: idvSession,
      })
      .eq('id', lawyerId)
      .select()
    console.log(data, error)
    console.log("successfully updated user's plaidUserId")
  }
}

export async function POST(request: NextRequest) {
  const { link_session_id, lawyerId } = await request.json()

  if (!link_session_id) {
    return new Response(
      JSON.stringify({ error: 'link_session_id is required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  if (!lawyerId) {
    return new Response(JSON.stringify({ error: 'lawyerId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const idvData = await updateUserRecordForIDVSession(link_session_id, lawyerId)

  console.log(idvData)

  // const { data, error } = await supabase
  //   .from('PlaidAccessToken')
  //   .insert({
  //     access_token,
  //     item_id,
  //     lawyerId: request.locals.lawyer.id,
  //   })
  //   .select()

  return new Response(JSON.stringify({ data: idvData }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
