import { supabase } from '@/lib/supabaseClient'
import { redirect } from 'next/navigation'

export async function signOut() {
  await supabase.auth.signOut()
  return redirect('/sign-in')
}

export default function SignOutButton() {
  // Render a button that, when clicked, triggers the server action to sign out
  return (
    <form method="post">
      <button type="submit">Sign Out</button>
    </form>
  )
}
