import { Button, Input } from '@nextui-org/react'
import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="max-w-sm mx-auto">
        <div className="mb-5">
          <Input className="flex-initial" type="text" label="Тоглоомын нэр" />
        </div>
        <div className="mb-5">
          <Input className="flex-initial" type="text" label="Нэр" />
        </div>
        <Link href="/game">
          <Button color="warning" size="lg" className="w-full">
            Тоглоом эхлүүлэх
          </Button>
        </Link>
      </div>
    </>
  )
}
