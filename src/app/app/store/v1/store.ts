import lawyers1 from '@/images/resources/lawyers1.png'
import lawyers2 from '@/images/resources/lawyers2.png'

const STORE = {
  sanity: {
    name: 'Sanity Check',
    href: '#',
    price: '$99',
    description:
      'Get 2 opinions on an existing legal issue, plan, or strategy.',
    imageSrc: lawyers2,
    imageAlt:
      'Light green canvas bag with black straps, handle, front zipper pouch, and drawstring top.',
    breadcrumbs: [
      { id: 1, name: 'Travel', href: '#' },
      { id: 2, name: 'Bags', href: '#' },
    ],
    sizes: [
      {
        name: 'Lite',
        description: 'Perfect ideal for research.',
      },
      {
        name: 'Standard',
        description: 'Second opinion included.',
      },
      {
        name: 'Solid',
        description: '3 opinions to help you sleep at night.',
      },
    ],
  },
  shotgun: {
    name: 'Shotgun Strategy',
    href: '#',
    price: '$99',
    description:
      'Get 2 opinions on an existing legal issue, plan, or strategy.',
    imageSrc: lawyers1,
    imageAlt:
      'Light green canvas bag with black straps, handle, front zipper pouch, and drawstring top.',
    breadcrumbs: [
      { id: 1, name: 'Travel', href: '#' },
      { id: 2, name: 'Bags', href: '#' },
    ],
    sizes: [
      {
        name: 'Lite',
        description: 'Perfect ideal for research.',
      },
      {
        name: 'Standard',
        description: 'Second opinion included.',
      },
      {
        name: 'Solid',
        description: '3 opinions to help you sleep at night.',
      },
    ],
  },
  interview: {
    name: 'Lawyer Interviewer',
    href: '#',
    price: '$50',
    description: 'Get a custom interview to vet lawyers.',
    imageSrc: lawyers1,
    imageAlt:
      'Light green canvas bag with black straps, handle, front zipper pouch, and drawstring top.',
    breadcrumbs: [
      { id: 1, name: 'Travel', href: '#' },
      { id: 2, name: 'Bags', href: '#' },
    ],
    sizes: [
      {
        name: 'Lite',
        description: 'Perfect ideal for research.',
      },
      {
        name: 'Standard',
        description: 'Second opinion included.',
      },
      {
        name: 'Solid',
        description: '3 opinions to help you sleep at night.',
      },
    ],
  },
}

export default STORE
