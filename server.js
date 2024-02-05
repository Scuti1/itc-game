// server.js
const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 3001 })

// baaz ruu hereglegch burtgeh service
// baazaas hereglegch tatah service
// asuultand hariulah uyd onoonii jagsaalt uurchluh
// asuultaa baaz ruu hadgalaad tatah service

const questions = [
  {
    question: '1 Дөрвөн ханатай гэр хэдэн уньтай байдаг вэ?',
    type: 'normal',
    choose: [],
    answer: 'a',
  },
  {
    question: '1 Таван ханатай гэр хэдэн уньтай байдаг вэ?',
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
    question: '1 Зургаан ханатай гэр хэдэн уньтай байдаг вэ?',
    type: 'choose',
    choose: [
      { key: 'a', value: '66' },
      { key: 'b', value: '75' },
      { key: 'c', value: '84' },
      { key: 'd', value: '80' },
    ],
    answer: 'a',
  },
]

function sendToClients(message) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ message }))
    }
  })
}

let count = 10 // Change initial count to 10

function sendTime(num) {
  if (count > 0) {
    sendToClients(num)
    console.log('num => ', num)
    count -= 1
    setTimeout(() => {
      sendTime(count)
    }, 1000)
  }
}

async function startAskingQuestions() {
  for (let question of questions) {
    sendToClients(question)
    console.log('question => ', question)
    await sendTime(10)
  }
}

server.on('connection', (socket) => {
  console.log('Client connected')
  socket.send(JSON.stringify({ count }))

  socket.on('close', () => {
    console.log('Client disconnected')
  })
})

sendTime(count)
startAskingQuestions()

console.log('WebSocket server is running on ws://localhost:3001')
