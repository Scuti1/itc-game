'use client'
import React from 'react'
import {
  Button,
  Checkbox,
  Chip,
  Input,
  Radio,
  RadioGroup,
} from '@nextui-org/react'
import { Choose } from '@/data'
import { Card, CardBody } from '@nextui-org/card'
import { SendFilledIcon } from '@nextui-org/shared-icons'

const Question = (props: any) => {
  const { question, choose } = props.item
  const active = props.active
  return (
    <>
      <div className="flex flex-col h-96">
        <Card>
          <CardBody>
            <p>{question}</p>
          </CardBody>
        </Card>
        <RadioGroup color="warning" className="p-5">
          {choose.map((item: Choose) => (
            <Radio key={item.key} value={item.key}>
              {item.value}
            </Radio>
          ))}
        </RadioGroup>
        <Button
          color="warning"
          size="lg"
          disabled={!active}
          startContent={<SendFilledIcon />}
        >
          Хариулт илгээх
        </Button>
      </div>
    </>
  )
}

export default Question
