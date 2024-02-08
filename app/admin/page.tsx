'use client'
import UserEvent from '@/app/components/UserEvent'
import Question from '@/app/components/Question'
import UserList from '@/app/components/UserList'
import QuestionTime from '@/app/components/Progress'
import React, { useEffect, useState } from 'react'
import Win from '@/app/components/Win'
import Lose from '@/app/components/Lose'
import { SendFilledIcon } from '@nextui-org/shared-icons'
import { Button } from '@nextui-org/react'

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

export default function Admin() {
  const [question, setQuestion] = useState('')
  const [userEventList, setUserEventList] = useState([])
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
          // console.log('data', data)
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

  const start = () => {
    registerWebSocket()
      .then((ws) => {
        ws.send(JSON.stringify({ type: 'start' }))
      })
      .catch((error) => {
        console.error('Failed to register WebSocket:', error)
        // Handle registration failure
      })
  }

  return (
    <>
      <div className="flex flex-row">
        {/*Асуулт явж буй үед*/}
        <div className="basis-3/12 pl-10">
          <UserEvent eventList={userEventList} />
        </div>
        <div>{timer}</div>

        {/*Асуулт явж буй үед*/}
        <div className="basis-5/12 p-20">
          {timer != 0 && <QuestionTime value={timer} />}
          {question != '' && (
            <Question
              item={question}
              admin={true}
              user={userList.find((it: any) => it.id == initialState.playerId)}
              send={(value: any) => {
                console.log(value)
              }}
            />
          )}
        </div>

        <Button
          color="warning"
          size="lg"
          startContent={<SendFilledIcon />}
          onClick={() => start()}
        >
          Эхлүүлэх
        </Button>
        {/*Асуулт явж буй үед*/}
        <div className="basis-4/12 pr-10">
          <UserList users={userList} />
        </div>

        {/*Тэмцээн дууссан үед*/}
        {userList.length != 1 &&
          userList.filter((it: any) => it.check > 0).length == 1 && (
            <Win winnerInfo={userList.find((it: any) => it.check > 0)} />
          )}
      </div>
      <div className="h-8"></div>
      <div className="banner h-60"></div>
    </>
  )
}
