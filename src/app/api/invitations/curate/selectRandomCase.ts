import { supabase } from '@/lib/supabaseClient'

export const selectRandomCase = async () => {
  const { data, error } = await supabase.from('Case').select('*')
  if (error) {
    console.log(error)
    return {}
  }
  return data[Math.floor(Math.random() * data.length)]
}
