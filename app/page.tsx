'use client'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/navigation'

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

export default function Home() {
  const [teamName, setTeamName] = React.useState('' as string)
  const router = useRouter()
  const initialState = {
    playerId:
      typeof window !== 'undefined'
        ? window.localStorage.getItem('playerId')
        : false,
  }
  function register() {
    registerWebSocket()
      .then((ws) => {
        let playerId = Math.floor(Math.random() * 9000) + 1000
        let model = {
          id: playerId,
          name: teamName,
        }
        ws.send(JSON.stringify({ type: 'register', model }))
        window.localStorage.setItem('playerId', playerId.toString())
        router.push('/game')
      })
      .catch((error) => {
        console.error('Failed to register WebSocket:', error)
      })
  }

  return (
    <>
      {initialState.playerId ? (
        router.push('/game')
      ) : (
        <>
          <div className=" p-20 w-full h-80 banner">
            <div className="max-w-sm mx-auto">
              <div className="mb-5">
                <Input
                  className="flex-initial"
                  type="text"
                  label="Багийн нэр"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <Button
                color="warning"
                size="lg"
                className="w-full"
                disabled={teamName == ''}
                onClick={() => register()}
              >
                Тоглоом эхлүүлэх
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
