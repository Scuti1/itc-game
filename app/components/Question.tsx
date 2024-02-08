'use client'
import React, { useState } from 'react'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
} from '@nextui-org/react'
import { Choose } from '@/data'
import { Card, CardBody } from '@nextui-org/card'
import { SendFilledIcon } from '@nextui-org/shared-icons'

const Question = (props: any) => {
  const { id, question, choose } = props.item
  const user = props.user
  const [answer, setAnswer] = useState('')

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
        {user.check > 0 ? (
          <Button
            color="warning"
            size="lg"
            disabled={user.check == 0 || answer == ''}
            startContent={<SendFilledIcon />}
            onClick={() => props.send({ id: id, answer: answer })}
          >
            Хариулт илгээх
          </Button>
        ) : (
          <Popover
            key={'popover'}
            showArrow
            offset={10}
            placement="bottom"
            backdrop={'blur'}
          >
            <PopoverTrigger>
              <Button
                color="warning"
                size="lg"
                startContent={<SendFilledIcon />}
              >
                Хариулт илгээх
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
              <h2>Уучлаарай</h2>
              <br />
              <p>Танай баг хожигдсон😓</p>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  )
}

export default Question
