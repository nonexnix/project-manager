import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import useClientStore from '../../library/stores/client'
import phase from '../../library/utilities/phase'
import WhiteCard from '../card/white-card'
import Profile from '../members/profile'
import EditTodoModal from '../modals/edit-todo'

interface IProps {
  todo: any
  index: number
}
const Todo = ({ todo, index }: IProps) => {
  const todoComplete = useClientStore((state) => state.update.todo.over)
  const deleteTodo = useClientStore((state) => state.delete.todo)
  const [isEdit, setIsEdit] = useState(false)

  console.log(isEdit)
  return (
    <div>
      {/* for smaller screen */}
      <div className="lg:hidden">
        <div className="cursor-pointer hover:-translate-y-2 transiton-all duration-500">
          <WhiteCard>
            <div className="flex items-start gap-10">
              <input
                type="checkbox"
                onChange={() =>
                  todoComplete({ id: todo.id, key: 'over', value: true })
                }
              />

              <div className="grid gap-4">
                {/* name, priority */}
                <div className="grid grid-cols-[1fr,auto] items-center">
                  <div className="text-lg lg:text-xl font-semibold">
                    {todo?.name}
                  </div>
                  {todo?.priority === 'LOW' && (
                    <div className="text-pink font-semibold text-center ml-auto">
                      {todo?.priority}
                    </div>
                  )}

                  {todo?.priority === 'MEDIUM' && (
                    <div className="text-green-500 font-semibold text-center ml-auto">
                      {todo?.priority}
                    </div>
                  )}

                  {todo?.priority === 'HIGH' && (
                    <div className="text-red-600 font-semibold text-center ml-auto">
                      {todo?.priority}
                    </div>
                  )}
                </div>

                {/* due date */}
                <div className="text-sm leading-relaxed">
                  {String(phase(todo?.dueAt, 'LL'))}
                </div>

                {/* todo Completeness */}
                {todo?.over === true ? (
                  <h1 className="text-green-600 font-bold tracking-wide">
                    Completed
                  </h1>
                ) : (
                  <h1 className="text-red-600 font-bold tracking-wide">
                    Incomplete
                  </h1>
                )}
              </div>
            </div>
          </WhiteCard>
        </div>
      </div>

      {/* for laptops */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-[auto,1fr] items-center gap-10 relative ">
          <div className="flex items-center gap-6">
            <input
              type="checkbox"
              onChange={() =>
                todoComplete({ id: todo.id, key: 'over', value: true })
              }
            />
            <button onClick={() => setIsEdit(!isEdit)}>
              <PencilAltIcon  className='text-blue w-5 h-5 hover:scale-125 transition-all duration-300'/>
            </button>
              {isEdit && <EditTodoModal todo={todo} cancelBtn={() => setIsEdit(false)}/>}
          </div>

          <div className="bg-white shadow-md shadow-violet py-3 px-6 grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr] gap-10 items-center hover:bg-snow transition-all duration-300 cursor-pointer group">
            {/* number */}
            <h1 className="font-semibold">{index}</h1>

            {/* todo name */}
            <h1 className="leading-relaxed whitespace-nowrap">{todo?.name}</h1>

            {/* todo Priority */}
            {todo?.priority === 'LOW' && (
              <div className="text-pink font-semibold text-center">
                {todo?.priority}
              </div>
            )}

            {todo?.priority === 'MEDIUM' && (
              <div className="text-green-500 font-semibold text-center">
                {todo?.priority}
              </div>
            )}

            {todo?.priority === 'HIGH' && (
              <div className="text-red-600 font-semibold text-center">
                {todo?.priority}
              </div>
            )}

            {/* todo Due Date */}
            <div className="text-sm leading-relaxed whitespace-nowrap">
              {String(phase(todo.dueAt, 'LL'))}
            </div>

            {/* todo Completeness */}
            {todo?.over === true ? (
              <h1 className="text-green-600 font-bold tracking-wide">
                Completed
              </h1>
            ) : (
              <h1 className="text-red-600 font-bold tracking-wide">
                Incomplete
              </h1>
            )}

            <div className="absolute right-0 -inset-y-1/2 translate-y-[50%] bg-red-600 grid items-center justify-center h-full w-0 group-hover:w-24 transition-all duration-300">
              <button onClick={() => deleteTodo({ id: todo.id })}>
                <TrashIcon className="text-white w-6 h-6"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
