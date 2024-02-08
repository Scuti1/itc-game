'use client'
import { Progress } from '@nextui-org/react'

const QuestionTime = (props: any) => {
  return (
    <Progress color="warning" aria-label="Loading..." value={props.value} />
  )
}

export default QuestionTime
