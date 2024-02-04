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

export const data: QuestionType[] = [
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
