import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

// create POST method
export async function POST(request: Request) {
  const verificationData = await request.json()

  // model LawyerVerificationRequest {
  //   id        String   @id @default(uuid())
  //   barNumber String
  //   jurisdiction String
  //   lawyer    Lawyer   @relation(fields: [lawyerId], references: [id])
  //   lawyerId  String
  //   createdAt  DateTime @default(now())
  //   updatedAt  DateTime @updatedAt
  // }

  // Update the user profile db entry in Supabase either way
  const { data, error } = await supabase
    .from('LawyerVerificationRequest')
    .insert({
      barNumber: verificationData.bar_number,
      jurisdiction: verificationData.jurisdiction,
      lawyerId: verificationData.id,
      updatedAt: new Date(),
      createdAt: new Date(),
      id: uuidv4(),
    })
    .select()
    .then(({ data, error }) => {
      if (error?.code === '23503') {
        console.error('User not found')
        return { data, error }
      }

      console.log(data, error)
    })

  console.log(data)
  console.log(error)

  return new Response(JSON.stringify({ data, error }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
