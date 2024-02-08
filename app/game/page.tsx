'use client'
import UserEvent from '@/app/components/UserEvent'
import Question from '@/app/components/Question'
import UserList from '@/app/components/UserList'
import QuestionTime from '@/app/components/Progress'
import React, { useEffect, useState } from 'react'

const registerWebSocket = (): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('ws://localhost:3001')

    ws.onopen = () => {
      resolve(ws) // Resolve the promise with the WebSocket instance
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      reject(error) // Reject the promise if an error occurs
    }
  })
}

export default function Game() {
  const [question, setQuestion] = useState('')
  const [useEventList, setUserEventList] = useState([])
  const [userList, setUserList] = useState([])
  const [timer, setTimer] = useState(0)

  const initialState = {
    playerId:
      typeof window !== 'undefined'
        ? window.localStorage.getItem('playerId')
        : false,
  }

  useEffect(() => {
    registerWebSocket()
      .then((ws) => {
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data)
          if (data.question) {
            setQuestion(data.question)
          }
          if (data.event) {
            setUserEventList(data.event)
          }
          if (data.users) {
            setUserList(data.users)
          }
          if (data.time) {
            setTimer(data.time)
          }
        }
      })
      .catch((error) => {
        console.error('Failed to register WebSocket:', error)
        // Handle registration failure
      })
  }, [])

  const sendAnswer = (question: any) => {
    console.log('Question', question)
    let model = {
      questionId: question.id,
      answer: question.answer,
      userId: Number(initialState.playerId),
      time: timer,
    }
    registerWebSocket()
      .then((ws) => {
        ws.send(JSON.stringify({ type: 'answer', model: model }))
      })
      .catch((error) => {
        console.error('Failed to register WebSocket:', error)
        // Handle registration failure
      })
  }

  const checkActive = () => {
    let player: any = userList.find((it: any) => it.id == initialState.playerId)
    return player != null && player.check > 0
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-3/12 pl-10">
          {useEventList.length > 0 && <UserEvent eventList={useEventList} />}
        </div>
        <div className="basis-5/12 p-20">
          {timer != 0 && <QuestionTime value={timer} />}
          {question != '' && (
            <Question
              item={question}
              active={checkActive}
              send={(value: any) => {
                sendAnswer(value)
              }}
            />
          )}
        </div>
        <div className="basis-4/12 pr-10">
          {userList.length > 0 && <UserList users={userList} />}
        </div>
      </div>
      <div className="h-8"></div>
      <div className="banner h-60"></div>
    </>
  )
}
