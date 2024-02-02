const FILES = [
  {
    id: 1,
    name: 'Email screenshots',
    description: "Them telling me they're going to sue me.",
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
  },
  {
    id: 2,
    name: 'Contract',
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
  },
  {
    id: 3,
    name: 'Product pictures',
    href: '#',
    size: '3.9 MB',
    lastModified: 'March 16, 2020',
  },
]

export const CASES = [
  {
    name: 'Car Accident',
    clientFirst: 'John',
    clientLast: 'Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    id: 123412342,
    handle: 'yo',
    href: '/app/cases/status/123412342',
    whatsUp: 'I was in a car accident.',
    goals: 'I want to get my medical bills paid.',
    dates: 'I was in the accident on 1/1/2020.',
    files: FILES,
  },
  {
    name: 'Slip and Fall',
    clientFirst: 'Jane',
    clientLast: 'Smith',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    id: 423412342,
    handle: 'yo',
    href: '/app/cases/status/423412342',
    whatsUp: 'I was in a car accident.',
    goals: 'I want to get my medical bills paid.',
    dates: 'I was in the accident on 1/1/2020.',
    files: FILES,
    questions: [
      {
        question: "What's going on?",
        answer: 'I slipped and fell at the grocery store.',
      },
      {
        question: 'What are your injuries?',
        answer: 'I broke my arm and my leg.',
      },
      {
        question: 'What are your medical bills?',
        answer: 'I have $10,000 in medical bills.',
      },
    ],
  },
]

export const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

export const AVATARS = [
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
]

export const CANDIDATES = [
  {
    first: 'Paula',
    last: 'Smith',
    firm: "Smith's Law",
    note: 'Hi Eli, I have 10 years of experience in personal injury law with over 100 wins in court.  I would love to work with you on this case.',
    avatar: AVATARS[1],
    interview: [
      {
        question: 'Can you describe some experience with personal injury law?',
        answer:
          'Sure, I have been working in personal injury law for 10 years. I have worked on a variety of cases, including car accidents, slip and falls, and medical malpractice.',
        notes: '10 years is solid, definitely enough for your case.',
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
