import { NextRequest } from 'next/server'

const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SKEY)

export async function createCustomer({ email, name, id }: any) {
  return await stripe.customers.create({
    email,
    name,
    metadata: { id },
  })
}

export async function createSubscription(customerId: string) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: 'price_1OpxtZKs7RoIYH0SVAo08XNH',
      },
    ],
  })
  return subscription
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, id } = await req.json()

    const customer = await createCustomer({ email, name, id })
    const subscription = await createSubscription(customer.id)
    return new Response(JSON.stringify({ data: { customer, subscription } }), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
