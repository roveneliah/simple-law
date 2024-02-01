'use client'
import AppLayout from '@/components/Layout/AppLayout'
import { useUser } from '@/lib/useUser'

export default function App() {
  const user = useUser()
  console.log(user)
  return (
    <AppLayout>
      <p>FIRST IMPRESSION ON LOGIN, HOW DO WE INTRODUCE OURSELVES?</p>
      <p>NO READING JUST GO</p>
      <p>{JSON.stringify(user)}</p>
    </AppLayout>
  )
}
