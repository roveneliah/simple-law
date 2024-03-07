'use client'

export const hoursLeft = (date: Date) => {
  const now = Date.now()
  const expiry = new Date(date + 'Z') // Append 'Z' if not already part of the date string  console.log(new Date(now), expiry)
  const hoursLeft = Math.floor((expiry - now) / (1000 * 60 * 60))
  return hoursLeft
}
