const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
export const mailgunClient = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  // domain: 'mail.impossiblelaw.com',
})
