import Icon from '../icon/icon'
import { CollectionIcon } from '@heroicons/react/outline'
import { CalendarIcon } from '@heroicons/react/outline'
import Button from '../button/button'
import useClientStore from '../../library/stores/client'
import useFieldStore from '../../library/stores/field'
import TodoPriority from '../priority/todo-priority'

interface IProps {
  taskId:string
  handler: any
}

const CreateTodoModal = ({ handler, taskId }: IProps) => {
  const member = useClientStore((state) => state.member)
  const createTodo = useClientStore((state) => state.create.todo)
  const todoField = useFieldStore((state) => state.todo)


  const handleCreateTodoButton = () => {
    createTodo({
      name: todoField?.value?.name,
      description: todoField?.value?.description,
      dueAt: String(todoField?.value?.dueAt),
      memberId: member.id,
      priority: todoField?.value?.priority,
      taskId:taskId
    })
    todoField.clear()
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-white max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<CollectionIcon />} />
          <h1 className="text-md font-semibold">Create New Todo</h1>
        </div>

        <div className="grid gap-6 mt-10">
          <div className="grid grid-flow-col items-start">
            {/* task name */}
            <div>
              <h1 className="text-sm leading-relaxed">Todo Name</h1>
              <input
                type="text"
                className="bg-snow py-2 pl-4 outline-none w-full"
                value={todoField?.value?.name}
                onChange={(e) =>
                  todoField.set({ ...todoField?.value, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* task description */}
          <div className="grid gap-2">
            <h1 className="text-sm leading-relaxed">Todo Description</h1>
            <textarea
              className="bg-snow py-2 pl-4 outline-none w-full"
              value={todoField?.value?.description}
              onChange={(e) =>
                todoField.set({
                  ...todoField?.value,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>

          {/* task due date */}
          <div className="flex flex-col gap-2">
            <h1 className="text-sm leading-relaxed">Due Date</h1>
            <div className="grid grid-cols-[1fr,auto] gap-5 items-center">
              <input
                type="date"
                className="relative bg-snow py-2 pl-4 outline-none"
                value={String(todoField?.value?.dueAt)}
                onChange={(e) =>
                  todoField.set({ ...todoField?.value, dueAt: e.target.value })
                }
              />
              <Icon icon={<CalendarIcon />} />
            </div>
          </div>

          {/* task priority */}
          <div className="grid gap-2">
            <h1 className="text-sm leading-relaxed">Priority</h1>
            <TodoPriority />
          </div>

          {/* buttons */}
          <div className="flex items-center gap-3 ml-auto mt-8">
            <button
              onClick={handler}
              className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
            <Button name="Create New Todo" color={'bg-blue'} handler={handleCreateTodoButton}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTodoModal
