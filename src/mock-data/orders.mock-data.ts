export const ordersMockData = [
  {
    id: '1',
    timestamp: '2023-07-30T12:00:00Z',
    username: 'user1',
    products: [
      {
        id: '202',
        quantity: 1,
        additions: ['pepperoni', 'cheese'],
        deletions: ['garlic'],
        comments: 'No garlic, please.',
        price: 12,
      },
      {
        id: '302',
        quantity: 3,
        additions: [],
        deletions: [],
        comments: '',
        price: 15,
      },
    ],
    totalCost: 57,
  },
  {
    id: '2',
    timestamp: '2023-07-30T12:01:00Z',
    username: 'user2',
    products: [
      {
        id: '201',
        quantity: 1,
        additions: [],
        deletions: [],
        comments: '',
        price: 10,
      },
    ],
    totalCost: 10,
  },
  {
    id: '3',
    timestamp: '2023-07-30T12:02:00Z',
    username: 'user1',
    products: [
      {
        id: '203',
        quantity: 1,
        additions: [],
        deletions: [],
        comments: '',
        price: 15,
      },
    ],
    totalCost: 15,
  },
];
