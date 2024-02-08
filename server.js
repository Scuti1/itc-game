const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3001 })
const clients = []

// static data
const ami = 3
const questions = [
  {
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

function sendQuestion() {
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
  clients.forEach((client) => {
    client.send(JSON.stringify({ question: randomQuestion }))
    console.log('Question sent', randomQuestion)
  })
}

function sendEvent() {
  clients.forEach((client) => {
    client.send(JSON.stringify({ event: eventList }))
    console.log('Event sent', eventList)
  })
}

function sendUser() {
  clients.forEach((client) => {
    client.send(JSON.stringify({ users: userList }))
    console.log('User sent', userList)
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
    console.log(`Client ${ws.name} answered: ${data.answer}`)
  }
}

setInterval(() => {
  sendQuestion()
}, 3000)

setInterval(() => {
  sendEvent()
}, 1000)
setInterval(() => {
  sendUser()
}, 1000)

console.log('WebSocket server is running on ws://localhost:3001')
