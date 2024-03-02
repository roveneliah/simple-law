import { NextRequest } from 'next/server'

const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SKEY)

export async function GET(req: NextRequest) {
  try {
    const customerId = req.nextUrl.searchParams.get('customerId')
    const customer = await stripe.customers.retrieve(customerId)
    return new Response(JSON.stringify({ data: { customer } }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
