## ImpossibleLaw

ImpossibleLaw is a marketplace for legal services. We connect clients with legal services, offering a new way to shop for legal services. Specifically, we are attempting to remove the uncertainty and insider knowledge required to navigate legal matters skillfully, and have assurance that one is getting good value. In doing so, we are attempting to make shopping for legal services more like the typical online shopping experience consumers are accustomed to.

From the business angle, we are like a Costco for lawyers, providing them insane value for their membership, and a steady stream of clients. We also remove the tediousness of online platforms and their rating systems, where client star reviews and comments can be unfair to lawyers. Instead, we align our incentives with lawyers by charging for matches, not leads. We charge a flat fee for each match.

The magic of our business is that leads can flow in from multiple sources, meaning we can spin up multiple brands and experiments to bring in leads. This means we can go after different markets with different brands. We can also go after consumers, businesses, and even general counsels differently. We can experiment at low cost under one specific brand. We can even partner with other platforms to bring in leads. This also allow us to better incentivize managers based on their platform alone.

## ImpossibleLaw Platform v1

## Product Offering

We offer a few legal products to start. Our priority is to provide customers with strong pricing clarity and strong guarantees, so they know exactly what they're getting.

### Shotgun Strategy

The shotgun strategy package allows users to get multiple written or video opinions on a matter in a 48 hour turnaround. This is meant for clients who are looking to assess their situation quickly and get a sense of their options. This is a great way to get a sense of the legal landscape and the potential costs of a case. This is also meant as a better way for lawyers to attract clients, since they actually get some revenue and know that their client serious enough to pay for an initial consult.

## Application Details

This repository is our initial matchmaking platform, built using Tailwind CSS and Next.js, and deployed in Vercel. We use Supabase for user and lawyer authentication (two different auth services), as well as for database storage. We use Stripe for payment processing. We use Mailgun for email services. We use Plaid to identify lawyers.

## Services

## Prisma Schema

You can find our prisma database schema above. Note, even with the below Prisma schema, we still use Supabase sdk not prisma so we can run in the client. Here is an example:

```javascript
const { data: user, error } = await supabase
  .from('User')
  .select('*')
  .eq('id', userId)
  .single()

const cases = user.Case // for some reason it is capitalized
```

### Other Codebase Considerations

Our app has a /app/... and /lawyers/... routing that is handled by Next.js. We use the /app/... routing for the user side of the app, and the /lawyers/... routing for the lawyer side of the app. Each has a different authentication service, and different views. We use the same database for both.

# Prompt

Use the above to fulfill the following request, and remember to develop using the services and architecture above:
