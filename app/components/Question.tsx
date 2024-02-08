'use client'
import React, { useState } from 'react'
import { Button, Radio, RadioGroup } from '@nextui-org/react'
import { Choose } from '@/data'
import { Card, CardBody } from '@nextui-org/card'
import { SendFilledIcon } from '@nextui-org/shared-icons'

const Question = (props: any) => {
  const { id, question, choose } = props.item
  const active = props.active
  const [answer, setAnswer] = useState('' as string)

  return (
    <>
      <div className="flex flex-col h-96">
        <Card>
          <CardBody>
            <p>{question}</p>
          </CardBody>
        </Card>
        <RadioGroup
          color="warning"
          className="p-5"
          value={answer}
          onValueChange={setAnswer}
        >
          {choose.map((item: Choose) => (
            <Radio key={item.key} value={item.key}>
              {item.value}
            </Radio>
          ))}
        </RadioGroup>
        <Button
          color="warning"
          size="lg"
          disabled={!active || answer == ''}
          startContent={<SendFilledIcon />}
          onClick={() => props.send({ id: id, answer: answer })}
        >
          Хариулт илгээх
        </Button>
      </div>
    </>
  )
}

export default Question
