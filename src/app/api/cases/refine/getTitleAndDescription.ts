import { Case } from '@prisma/client'
import { openai } from './route'

export const getTitleAndDescription = async (caseData: Case) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are a legal assistant designed to annotate client notes about their case into digestable JSON data for the lawyer to review. Please annotate the following case data into a JSON object with the following fields: title (under 30 chars), description (under 256 chars), caseType ('criminal','civil', 'family', 'business', 'immigration', 'other').  This title and description will be used in a view to list out the user's cases, and should be natural language fields.  Output will be read by a Javascript program, and must compile.",
        },
        {
          role: 'user',
          content: JSON.stringify(caseData),
        },
      ],
    })

    console.log(completion.choices[0].message.content)

    const { title, description, caseType } = JSON.parse(
      completion.choices[0].message.content,
    )

    return { title, description, caseType }
  } catch (error) {
    console.log(error)
    return {}
  }
}
