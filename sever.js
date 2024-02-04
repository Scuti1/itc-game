// server.js
const WebSocket = require('ws')
const { questionsList } = require('./data')

const server = new WebSocket.Server({ port: 3001 })

function sendToClients(message) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ message }))
    }
  })
}

let count = 10
let correctAnswers = 0
let questionIndex = 0

function startCounting() {
  const countInterval = setInterval(() => {
    if (count === 1) {
      clearInterval(countInterval)
      startAskingQuestions()
    } else {
      count -= 1
      sendToClients({ count })
    }
  }, 1000)
}

function startAskingQuestions() {
  const questions = questionsList

  const questionInterval = setInterval(() => {
    if (questionIndex === questions.length) {
      clearInterval(questionInterval)
      sendToClients('Quiz finished!')
    } else {
      sendToClients({ question: questions[questionIndex].text })
      questionIndex += 1
    }
  }, 10000) // 10 seconds interval
}

server.on('connection', (socket) => {
  console.log('Client connected')
  socket.send(JSON.stringify({ count }))

  socket.on('message', (answer) => {
    const currentQuestion = questions[questionIndex - 1]
    if (currentQuestion && answer === currentQuestion.answer) {
      correctAnswers += 1
      sendToClients(`Correct! Total correct answers: ${correctAnswers}`)
    } else {
      sendToClients('Incorrect. Try the next question.')
    }
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

startCounting()

console.log('WebSocket server is running on ws://localhost:3001')
