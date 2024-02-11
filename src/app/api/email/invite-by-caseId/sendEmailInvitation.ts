import { mailgunClient } from './mailgunClient'

export interface InvitationTemplateParams {
  to: string
  title: string
  subject: string
  interviewLink: string
  comment: string
  dueBy: string
}

export default async function sendEmailInvitation({
  to,
  title,
  subject,
  interviewLink,
  comment,
}: InvitationTemplateParams) {
  const data = await mailgunClient.messages
    .create('sandbox1ab646035ab642f5b65ee458f327380a.mailgun.org', {
      from: 'ImpossibleLaw <postmaster@sandbox1ab646035ab642f5b65ee458f327380a.mailgun.org>',
      to,
      subject,
      // text,
      template: 'invitation',
      'h:X-Mailgun-Variables': JSON.stringify({
        title,
        interviewLink,
        comment,
      }),
    })
    .catch((error: any) => {
      console.error(error)
      return { data: null, error }
    })

  return { data, error: null }
}
