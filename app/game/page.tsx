'use client'
import UserEvent from '@/app/components/UserEvent'
import Question from '@/app/components/Question'
import { questionsList } from '@/data'
import UserList from '@/app/components/UserList'
import QuestionTime from '@/app/components/Progress'
import React, { useEffect, useState } from 'react'

export default function Game() {
  const [data, setData] = useState<number | string | null>(null)
  const [connecting, setConnecting] = useState(true)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001')

    socket.onmessage = async (event) => {
      const parsedData = JSON.parse(event.data)
      setData(parsedData.message)
    }

    socket.onclose = () => {
      setConnecting(false)
    }

    return () => {
      socket.close()
    }
  }, [])
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-3/12 pl-10">
          <UserEvent />
        </div>
        <div className="basis-5/12 p-20">
          <QuestionTime value={40} />
          <Question item={questionsList[0]} />
          {/*{connecting ? (*/}
          {/*  <p>Connecting...</p>*/}
          {/*) : data != null && data != undefined ? (*/}
          {/*  // <Question item={data} />*/}
          {/*  data*/}
          {/*) : (*/}
          {/*  <p>No data received</p>*/}
          {/*)}*/}
        </div>
        <div className="basis-4/12 pr-10">
          <UserList />
        </div>
      </div>
      <div className="h-8"></div>
      <div className="banner h-60"></div>
    </>
  )
}
