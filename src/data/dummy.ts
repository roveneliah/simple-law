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

export const dummyLawyers = (caseId) => [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Leslie has over 100 injury cases with similar settlements and has a 5 star rating. She is a top choice for this case.  Her responses to our interview questions were thorough, and she has agreed to provide weekly updates.',
    date: '1d ago',
    dateTime: '2023-03-04T15:54Z',
    rank: 'Top Choice',
    tag: 'Shortlist',
    caseId,
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Laudantium quidem non et saepe vel sequi accusamus consequatur et. Saepe inventore veniam incidunt cumque et laborum nemo blanditiis rerum. A unde et molestiae autem ad. Architecto dolor ex accusantium maxime cumque laudantium itaque aut perferendis.',
    date: '2d ago',
    dateTime: '2023-03-03T14:02Z',
    rank: 'Top Choice',
    tag: 'Declined',
    caseId,
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Quia animi harum in quis quidem sint. Ipsum dolorem molestias veritatis quis eveniet commodi assumenda temporibus. Dicta ut modi alias nisi. Veniam quia velit et ut. Id quas ducimus reprehenderit veniam fugit amet fugiat ipsum eius. Voluptas nobis earum in in vel corporis nisi.',
    date: '2d ago',
    dateTime: '2023-03-03T13:23Z',
    caseId,
  },
  {
    id: 4,
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Unde dolore exercitationem nobis reprehenderit rerum corporis accusamus. Nemo suscipit temporibus quidem dolorum. Nobis optio quae atque blanditiis aspernatur doloribus sit accusamus. Sunt reiciendis ut corrupti ab debitis dolorem dolorem nam sit. Ducimus nisi qui earum aliquam. Est nam doloribus culpa illum.',
    date: '3d ago',
    dateTime: '2023-03-02T21:13Z',
    caseId,
  },
]

export const CASES = [
  {
    stateIndex: 0,
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
    stateIndex: 1,
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
  {
    stateIndex: 2,
    name: 'Medical Malpractice',
    clientFirst: 'Eli',
    clientLast: 'Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    id: 523412342,
    handle: 'yo',
    href: '/app/cases/status/523412342',
    whatsUp: 'I was in a car accident.',
    goals: 'I want to get my medical bills paid.',
    dates: 'I was in the accident on 1/1/2020.',
    files: FILES,
  },
  {
    stateIndex: 2,
    name: 'Product Liability',
    clientFirst: 'Eli',
    clientLast: 'Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    id: 623412342,
    handle: 'yo',
    href: '/app/cases/status/623412342',
    whatsUp: 'I was in a car accident.',
    goals: 'I want to get my medical bills paid.',
    dates: 'I was in the accident on 1/1/2020.',
    files: FILES,
  },
  {
    stateIndex: 3,
    name: 'Dog Bite',
    clientFirst: 'Eli',
    clientLast: 'Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    id: 723412342,
    handle: 'yo',
    href: '/app/cases/status/723412342',
    whatsUp: 'I was in a car accident.',
    goals: 'I want to get my medical bills paid.',
    dates: 'I was in the accident on 1/1/2020.',
    files: FILES,
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
