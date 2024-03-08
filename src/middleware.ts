import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseLawyers } from './lib/supabaseClient'

const log = (x: any = '') => {
  console.log('|| ' + x)
  return x
}

/**
 * Middleware function to handle authentication and authorization for different routes.  This function is called for all requests to the API and the /app and /lawyers paths.  It checks for a valid session and user, and blocks the request if none is found.  It also checks for a valid API key for requests to the /api path.  If no valid session or user is found, or if there is an error, the request is blocked.  If a valid API key is found, the request is allowed to proceed.  If no valid API key is found, a 401 Unauthorized response is returned.
 * @param req - The NextRequest object representing the incoming request.
 * @returns The NextResponse object representing the response to be sent.
 */
export async function middleware(req: NextRequest) {
  console.log('\n-------------------------')
  log()
  log('MIDDLEWARE...')
  log()
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

  if (req.nextUrl.pathname.startsWith('/app')) {
    if (session && user) {
      log('USER: AUTHENTICATED')
      return res
    } else {
      log('USER: NO SESSION FOUND.')
      return new NextResponse.redirect('/app/login')
    }
  }

  if (req.nextUrl.pathname.startsWith('/lawyers')) {
    log('Lawyers request detected.')
    if (lawyerSession && lawyerUser) {
      log('Authneticated Lawyer Session. Proceeding with request...')
      return res
    } else {
      log('No lawyer session found.')
      return new NextResponse.redirect('/lawyers/login')
    }
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
    // If there's no session or user, or if there's an error, block the request
    if ((!session && !lawyerSession) || sessionError || lawyerSessionError) {
      // You can customize this response based on your needs
      // E.g., redirect to login, return a 401 Unauthorized response, etc.
      log('No user auth found.')

      // Define your secret API key (this should be stored securely, e.g., in environment variables)
      const SECRET_API_KEY = process.env.SECRET_API_KEY

      // Retrieve the API key from the request headers
      const apiKey = req.headers.get('x-api-key')

      // Check if the API key matches the secret key
      if (apiKey === SECRET_API_KEY) {
        log('API Key validated. Proceeding with request...')
        return NextResponse.next() // Proceed with the request
      } else {
        log('Invalid API Key. Blocking request.')
        // Return a 401 Unauthorized response if the API key is missing or incorrect
        return new NextResponse('Unauthorized: Invalid API Key', {
          status: 401,
        })
      }
    }

    log('Authenticated. Proceeding with API request...')
    return res
  }
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ['/api/:pathname*', '/app/:pathname*', '/lawyers/:pathname*'],
}
