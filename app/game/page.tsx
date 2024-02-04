import UserEvent from '@/app/components/UserEvent'
import Question from '@/app/components/Question'
import { questionsList } from '@/data'
import UserList from '@/app/components/UserList'
import QuestionTime from '@/app/components/Progress'

export default function Game() {
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-3/12 pl-10">
          <UserEvent />
        </div>
        <div className="basis-5/12 p-20">
          <QuestionTime value={40} />
          <Question item={questionsList[0]} />
        </div>
        <div className="basis-4/12 pr-10">
          <UserList />
        </div>
      </div>
    </>
  )
}
