import Image from 'next/image'
import Question from '@/app/components/Question'
import { questionsList } from '@/data'
import UserList from '@/app/components/UserList'
import UserEvent from '@/app/components/UserEvent'
export default function Home() {
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-3/12 pl-10">
          <UserEvent />
        </div>
        <div className="basis-5/12 p-20">
          <Question item={questionsList[0]} />
          <Question item={questionsList[1]} />
        </div>
        <div className="basis-4/12 pr-10">
          <UserList />
        </div>
      </div>
    </>
  )
}
