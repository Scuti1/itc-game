export type Choose = {
  key: string
  value: string
}

export type QuestionType = {
  question: string
  type: 'normal' | 'choose'
  choose: Choose[]
  answer: string
}

export type UserListType = {
  id: number
  name: string
  displayName: string
  sex: string
  score: number
  check: number
}

export type UserEventType = {
  id: number
  name: string
  displayName: string
  sex: string
  time: number
  passed: boolean
}

export const questionsList: QuestionType[] = [
  {
    question: '1 Дөрвөн ханатай гэр хэдэн уньтай байдаг вэ?',
    type: 'normal',
    choose: [],
    answer: 'a',
  },
  {
    question: '1 Дөрвөн ханатай гэр хэдэн уньтай байдаг вэ?',
    type: 'choose',
    choose: [
      { key: 'a', value: '12' },
      { key: 'b', value: '42' },
      { key: 'c', value: '22' },
      { key: 'd', value: '123' },
    ],
    answer: 'a',
  },
  {
    question: '1 Дөрвөн ханатай гэр хэдэн уньтай байдаг вэ?',
    type: 'choose',
    choose: [
      { key: 'a', value: '12' },
      { key: 'b', value: '42' },
      { key: 'c', value: '22' },
      { key: 'd', value: '123' },
    ],
    answer: 'a',
  },
]

export const userList: UserListType[] = [
  {
    id: 1,
    name: 'Tony Reichert',
    displayName: 'DisplayName',
    sex: 'male',
    score: 12,
    check: 2,
  },
  {
    id: 2,
    name: 'Tony Red',
    displayName: 'DisplayName',
    sex: 'male',
    score: 0,
    check: 1,
  },
  {
    id: 2,
    name: 'Anna',
    displayName: 'DisplayName',
    sex: 'female',
    score: 8,
    check: 0,
  },
]

export const userEventList: UserEventType[] = [
  {
    id: 1,
    name: 'Tony Reichert',
    displayName: 'DisplayName',
    sex: 'male',
    time: 12,
    passed: true,
  },
  {
    id: 2,
    name: 'Tony Red',
    displayName: 'DisplayName',
    sex: 'male',
    time: 23,
    passed: false,
  },
  {
    id: 2,
    name: 'Anna',
    displayName: 'DisplayName',
    sex: 'female',
    time: 35,
    passed: true,
  },
]
