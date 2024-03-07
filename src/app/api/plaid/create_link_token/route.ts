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

export async function POST(request: NextRequest) {
  const { userId } = await request.json()
  const plaidClient = new PlaidApi(configuration)

  try {
    const { data } = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: userId,
      },
      client_name: 'ImpossibleLaw',
      products: ['identity_verification'],
      identity_verification: {
        template_id: process.env.PLAID_TEMPLATE_ID,
      },
      country_codes: ['US'],
      language: 'en',
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
