import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseLawyers } from './lib/supabaseClient'

export async function middleware(req: NextRequest) {
  console.log('calling middleware...')
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  const { data: session, error: sessionError }: any =
    await supabase.auth.getSession()
  const { data: user, error: userError } = await supabase.auth.getUser()
  const { data: lawyerSession, error: lawyerSessionError }: any =
    await supabaseLawyers.auth.getSession()
  const { data: lawyerUser, error: lawyerUserError } =
    await supabaseLawyers.auth.getUser()

  // If there's no session or user, or if there's an error, block the request
  if ((!session && !lawyerSession) || sessionError || lawyerSessionError) {
    // You can customize this response based on your needs
    // E.g., redirect to login, return a 401 Unauthorized response, etc.
    console.log('No user auth found.')

    // Define your secret API key (this should be stored securely, e.g., in environment variables)
    const SECRET_API_KEY = process.env.SECRET_API_KEY

    // Retrieve the API key from the request headers
    const apiKey = req.headers.get('x-api-key')

    // Check if the API key matches the secret key
    if (apiKey === SECRET_API_KEY) {
      console.log('API Key validated. Proceeding with request...')
      return NextResponse.next() // Proceed with the request
    } else {
      console.log('Invalid API Key. Blocking request.')
      // Return a 401 Unauthorized response if the API key is missing or incorrect
      return new NextResponse('Unauthorized: Invalid API Key', { status: 401 })
    }
  }

  console.log('Authenticated. Proceeding with request...', res)
  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: '/api/:pathname*',
}
