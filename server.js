const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3001 })
const clients = []

// static data
const ami = 1
const questions = [
  {
    id: 1,
    question: '1 Дөрвөн ханатай гэр хэдэн уньтай байдаг вэ?',
    choose: [
      { key: 'a', value: '12' },
      { key: 'b', value: '42' },
      { key: 'c', value: '22' },
      { key: 'd', value: '123' },
    ],
    answer: 'a',
  },
  {
    id: 2,
    question: '2 Таван ханатай гэр хэдэн уньтай байдаг вэ?',
    choose: [
      { key: 'a', value: '12' },
      { key: 'b', value: '42' },
      { key: 'c', value: '22' },
      { key: 'd', value: '123' },
    ],
    answer: 'a',
  },
  {
    id: 3,
    question: '3 Зургаан ханатай гэр хэдэн уньтай байдаг вэ?',
    choose: [
      { key: 'a', value: '66' },
      { key: 'b', value: '75' },
      { key: 'c', value: '84' },
      { key: 'd', value: '80' },
    ],
    answer: 'a',
  },
]

var userList = []

var eventList = []

var checkAnswerList = []

function sendQuestion() {
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
  clients.forEach((client) => {
    clearAnswer()
    clearEvent()
    client.send(JSON.stringify({ question: randomQuestion }))
  })
}

function sendEvent() {
  clients.forEach((client) => {
    client.send(JSON.stringify({ event: eventList }))
  })
}

function sendUser() {
  clients.forEach((client) => {
    client.send(JSON.stringify({ users: userList }))
  })
}

function clearEvent() {
  eventList = []
}

function checkAnswer(answer) {
  let correct =
    questions.find((x) => x.id === answer.questionId).answer === answer.answer
  userList.forEach((x) => {
    if (x.id === answer.userId) {
      if (!correct) {
        x.check -= 1
      } else {
        x.score += 1
      }
    }
  })
  checkAnswerList.push({
    questionId: answer.questionId,
    userId: answer.userId,
    correct: correct,
  })
  changeEvent(answer)
  sendCheckAnswer()
  sendEvent()
}

function changeEvent(answer) {
  let user = userList.find((x) => x.id === answer.userId)
  eventList.push({
    id: answer.questionId,
    userId: user.id,
    name: user.name,
    time: 12,
  })
}

function clearAnswer() {
  checkAnswerList = []
}

function sendCheckAnswer() {
  clients.forEach((client) => {
    client.send(JSON.stringify({ checkAnswer: checkAnswerList }))
  })
}

wss.on('connection', function connection(ws) {
  console.log('Client connected')
  clients.push(ws)

  sendUser()
  sendQuestion()

  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
    handleClient(message, ws)
  })

  ws.on('close', function () {
    console.log('Client disconnected')
    const index = clients.indexOf(ws)
    if (index > -1) {
      clients.splice(index, 1)
    }
  })
})

function handleClient(message, ws) {
  const data = JSON.parse(message)

  if (data.type === 'register') {
    userList.unshift({
      id: data.model.id,
      name: data.model.name,
      score: 0,
      check: ami,
    })
    console.log('userList', userList)
  } else if (data.type === 'answer') {
    checkAnswer(data.model)
  }
}

setInterval(() => {
  sendQuestion()
}, 5000)

setInterval(() => {
  sendEvent()
}, 1000)
setInterval(() => {
  sendUser()
}, 1000)

console.log('WebSocket server is running on ws://localhost:3001')
