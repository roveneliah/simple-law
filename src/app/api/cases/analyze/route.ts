import { supabase } from '@/lib/supabaseClient'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { getCaseData } from '../review/parse/route'
import { v4 as uuidv4 } from 'uuid'

export const caseAnalysis = z.object({
  // string of max length 32
  freeOptions: z.string().max(256),
  oddsOfSuccess: z.string().max(256),
  strategy: z.string().max(256),
  costEstimate: z.string().max(256),
})

const analyzeCase = async (caseData: any) => {
  // analyze the case
  return {
    freeOptions: '...',
    oddsOfSuccess: '...',
    strategy: '...',
    costEstimate: '...',
  }
}

// Given case Id, analyze the case and return the result.
export async function GET(req: NextRequest) {
  const caseId = req.nextUrl.searchParams.get('caseId')
  if (!caseId) return new Response('caseId is required.', { status: 400 })

  const { data: caseData, error } = await getCaseData(caseId)

  // create analysis of the case
  const caseAnalysis = await analyzeCase(caseData)

  // if case analysis not found on Case, create it with reference to caseId
  if (!caseData.analysisId) {
    console.log('creating case analysis...')
    await supabase.from('CaseAnalysis').insert({
      id: uuidv4(),
      caseId,
      ...caseAnalysis,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  } else {
    // update the case analysis
    console.log('updating case analysis...')
    await supabase
      .from('CaseAnalysis')
      .update({
        ...caseAnalysis,
        updatedAt: new Date(),
      })
      .eq('id', caseData.analysisId)
  }

  // Analyze the case and return the result.
  // write to supabase fields

  // model CaseAnalysis {
  //   id        String   @id @default(uuid())
  //   case      Case     @relation(fields: [caseId], references: [id])
  //   caseId    String   @unique
  //   createdAt DateTime @default(now())
  //   updatedAt DateTime @updatedAt

  //   // analysis fields
  //   freeOptions String?
  //   oddsOfSuccess String?
  //   strategy String?
  //   costEstimate String?
  // }

  return new Response(`Case ${caseId} is analyzed.`)
}
