import { NextRequest } from 'next/server'

const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SKEY)

export async function addMatchToInvoice(
  customerId: string,
  priceId: string,
  description: string,
) {
  const invoiceItem = await stripe.invoiceItems.create({
    customer: customerId,
    price: priceId,
    description,
  })

  return invoiceItem
}

export const priceIds: any = { match: 'price_1Opx3aKs7RoIYH0SPHgy5Z6b' }

export async function POST(req: NextRequest) {
  try {
    const { customerId, product, description } = await req.json()

    if (priceIds[product] === undefined) {
      return new Response(JSON.stringify({ error: 'Invalid product' }), {
        status: 400,
      })
    }

    const customer = await addMatchToInvoice(
      customerId,
      priceIds[product],
      description,
    )
    return new Response(JSON.stringify({ data: customer }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
