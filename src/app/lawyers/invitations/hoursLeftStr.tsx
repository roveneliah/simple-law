'use client'
// get the time left from now to date as hours

export const hoursLeftStr = (date) => {
  const now = Date.now()
  const expiry = new Date(date + 'Z') // Append 'Z' if not already part of the date string  console.log(new Date(now), expiry)
  const hoursLeft = Math.floor((expiry - now) / (1000 * 60 * 60))
  return `${hoursLeft} hrs`
}
