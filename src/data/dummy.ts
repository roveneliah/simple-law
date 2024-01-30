export const CASES = [
  {
    name: 'Car Accident',
    clientFirst: 'John',
    clientLast: 'Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    id: 123412342,
    handle: 'yo',
    href: '/app/cases/case/123412342',
  },
  {
    name: 'Slip and Fall',
    clientFirst: 'Jane',
    clientLast: 'Smith',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    id: 423412342,
    handle: 'yo',
    href: '/app/cases/case/423412342',
  },
]

export const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

export const CANDIDATES = [
  {
    first: 'Paula',
    last: 'Smith',
    firm: "Smith's Law",
    note: 'Hi Eli, I have 10 years of experience in personal injury law with over 100 wins in court.  I would love to work with you on this case.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    interview: [
      {
        question: 'Can you describe some experience with personal injury law?',
        answer:
          'Sure, I have been working in personal injury law for 10 years. I have worked on a variety of cases, including car accidents, slip and falls, and medical malpractice.',
      },
      {
        question:
          'What makes your practice unique?  What can you offer in this case?',
        answer: '',
      },
      {
        question: 'What is your fee structure?',
        answer:
          'I work on a contingency basis.  I will take 30% of the settlement.  This makes sure that your win or loss is my win or loss.  This also means your case is my priority.',
      },
    ],
  },
]
