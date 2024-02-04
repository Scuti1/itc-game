'use client'
import React from 'react'
import { Button, Checkbox, Chip, Input } from '@nextui-org/react'
import { Choose } from '@/data'
import { Card, CardBody } from '@nextui-org/card'
import { SendFilledIcon } from '@nextui-org/shared-icons'

const Question = (props: any) => {
  const { question, type, choose } = props.item

  if (type == 'normal') {
    return (
      <>
        <div className="flex flex-col gap-10">
          <Card>
            <CardBody>
              <p>{question}</p>
            </CardBody>
          </Card>
          <div className="flex items-center gap-4">
            <Input className="flex-initial" type="text" label="Хариулт" />
            <Button
              color="warning"
              size="lg"
              startContent={<SendFilledIcon />}
            ></Button>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="flex flex-col">
          <Card>
            <CardBody>
              <p>{question}</p>
            </CardBody>
          </Card>
          {choose.map((item: Choose) => (
            <Checkbox
              key={item.key}
              radius="lg"
              color="warning"
              size="lg"
              className="p-5"
            >
              {item.value}
            </Checkbox>
          ))}
          <Button color="warning" size="lg" startContent={<SendFilledIcon />}>
            Хариулт илгээх
          </Button>
        </div>
      </>
    )
  }
}

export default Question
