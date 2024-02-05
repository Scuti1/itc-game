'use client'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from '@nextui-org/react'
import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { userList } from '@/data'
import { User } from '@nextui-org/user'

export default function Home() {
  const initialState = {
    playerId:
      typeof window !== 'undefined'
        ? window.localStorage.getItem('playerId')
        : false,
  }
  const register = (playerId: number) => {
    // window.localStorage.setItem('playerId', playerId.toString())
  }

  return (
    <>
      {initialState.playerId ? (
        redirect('/game')
      ) : (
        <>
          <div className=" p-20 w-full h-80 banner">
            <div className="max-w-sm mx-auto">
              <div className="mb-5">
                <Input
                  className="flex-initial"
                  type="text"
                  label="Тоглоомын нэр"
                />
              </div>
              <div className="mb-5">
                <Autocomplete label="Нэр" className="w-full">
                  {userList.map((user) => (
                    <AutocompleteItem key={user.id} value={user.id}>
                      <User
                        avatarProps={{
                          radius: 'lg',
                          src: user.sex == 'female' ? '/women.png' : '/man.png',
                        }}
                        name={user.name}
                      ></User>
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <Link href="/game">
                <Button
                  color="warning"
                  size="lg"
                  className="w-full"
                  onClick={() => register(1)}
                >
                  Тоглоом эхлүүлэх
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
