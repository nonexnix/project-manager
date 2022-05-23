import phase from '../../library/utilities/phase'
import WhiteCard from '../card/white-card'
import Profile from '../members/profile'

interface IProps {
  task: any
  index: number
}
const Task = ({ task, index }: IProps) => {
  return (
    <div>
      {/* for smaller screen */}
      <div className="lg:hidden">
        <div className="cursor-pointer hover:-translate-y-2 transiton-all duration-500">
          <WhiteCard>
            <div className="grid gap-4">
              {/* task name and due date */}
              <div className="grid gap-1">
                {/* name, priority */}
                <div className="grid grid-cols-[1fr,auto] items-center">
                  <div className="text-lg lg:text-xl leading-relaxed font-semibold">
                    {task?.name}
                  </div>
                  <div className="text-pink font-semibold text-center">
                    {task?.priority}
                  </div>
                </div>
                {/* due date */}
                <div className="text-sm leading-relaxed">
                  {String(phase(task?.dueAt, 'LL'))}
                </div>
              </div>

              {/* members */}
              <div className="flex items-center gap-10 ml-3">
                {/* head member  */}
                <Profile />

                {/* task members */}
                <div className="flex items-center gap-3 ml-3">
                  <Profile />
                  <Profile />
                  <Profile />
                  <Profile />
                  <Profile />
                  {task?.members?.length > 5 && (
                    <h1 className="text-sm ml-5 text-gray-500 whitespace-nowrap">
                      + {task?.members?.length - 5} more
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </WhiteCard>
        </div>
      </div>

      {/* for laptops */}
      <div className="hidden lg:block">
        <div className="bg-white shadow-md shadow-violet py-3 px-6 grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr] gap-10 items-center hover:bg-snow hover:-translate-y-1 taransition-all duration-300 cursor-pointer">
          {/* number */}
          <h1 className="font-semibold">{index}</h1>

          {/* task name */}
          <h1 className="leading-relaxed whitespace-nowrap">{task?.name}</h1>

          {/* head task */}
          <Profile />

          {/* Task Members */}
          <div className="flex items-center gap-3 ml-3">
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <h1 className="text-sm ml-5 text-gray-500 whitespace-nowrap">
              + 5 more
            </h1>
          </div>

          {/* Task Priority */}
          <div className="text-pink font-semibold text-center">
            {task?.priority}
          </div>

          {/* Task Due Date */}
          <div className="text-sm leading-relaxed whitespace-nowrap">
            {String(phase(task?.dueAt, 'LL'))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Task
