import Image from 'next/image'
import Question from '@/app/components/Question'
import { data } from '@/data'
export default function Home() {
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-1/4">01</div>
        <div className="basis-1/2">
          <Question item={data[0]} />
        </div>
        <div className="basis-1/4">02</div>
      </div>
    </>
  )
}
