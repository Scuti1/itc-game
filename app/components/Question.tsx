'use client'
import React from 'react'
import { Button, Checkbox, Chip, Input } from '@nextui-org/react'
import { Choose } from '@/data'

const Question = (props: any) => {
  const { question, type, choose } = props.item

  if (type == 'normal') {
    return (
      <>
        <Chip>{question}</Chip>
        <Input size="lg" type="text" label="Хариулт бичих" />
      </>
    )
  } else {
    return (
      <>
        <div className="flex flex-col">
          <Chip>{question}</Chip>
          {choose.map((item: Choose) => (
            <Checkbox key={item.key} radius="lg">
              {item.value}
            </Checkbox>
          ))}
          <Button color="primary">Хариулт илгээх</Button>
        </div>
      </>
    )
  }
}

export default Question
