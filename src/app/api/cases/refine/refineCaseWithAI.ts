import { Case } from '@prisma/client'
import { getTitleAndDescription } from './getTitleAndDescription'

export const refineCaseWithAI = async (caseData: Case) => {
  const { title, description, caseType } =
    await getTitleAndDescription(caseData)

  // parse message
  // given: whatUp, goals, dates, documents
  // return: title, description

  return {
    ...caseData,
    title,
    description,
    caseType,
  }
}
