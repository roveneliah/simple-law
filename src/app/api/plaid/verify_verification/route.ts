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

export async function POST(request: NextRequest) {
  const { verificationId } = await request.json()

  if (!verificationId) {
    return new Response(
      JSON.stringify({ error: 'verificationId is required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  try {
    const { data } = await plaidClient.identityVerificationGet({
      identity_verification_id: verificationId,
    })

    return new Response(
      JSON.stringify({ verified: data.status === 'success' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
