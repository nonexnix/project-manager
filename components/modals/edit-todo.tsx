import Icon from '../icon/icon'
import { CollectionIcon } from '@heroicons/react/outline'
import { CalendarIcon } from '@heroicons/react/outline'
import Button from '../button/button'
import EditTextField from '../edit-input-field'
import phase from '../../library/utilities/phase'
import TodoPriority from '../priority/todo-priority'
import { ITodo } from '../../library/schemas/interfaces'
import useFieldStore from '../../library/stores/field'
import useClientStore from '../../library/stores/client'

interface IProps {
  todo: ITodo
  cancelBtn: any
}

const EditTodoModal = ({ todo, cancelBtn }: IProps) => {
  const todoField = useFieldStore((state) => state.todo)
  const updateTodoName = useClientStore((state) => state.update.todo.name)
  const updateTodoDue = useClientStore((state) => state.update.todo.dueAt)
  const updateTodoPriority = useClientStore(
    (state) => state.update.todo.priority
  )
  const updateTodoDescription = useClientStore(
    (state) => state.update.todo.description
  )

  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-snow max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<CollectionIcon />} />
          <h1 className="text-md font-semibold">Edit Todo</h1>
        </div>

        <div className="grid gap-10 mt-8">
          {/* task name */}
          <EditTextField
            inputLabel="Name"
            inputType="input"
            onChange={(e: any) =>
              todoField.set({ ...todoField.value, name: e.target.value })
            }
            btnLabel="Save"
            defaultText={todo.name}
            btnHandler={() =>
              updateTodoName({
                id: todo.id,
                key: 'name',
                value: todoField.value.name,
              })
            }
          />

          {/* todo description */}
          <EditTextField
            inputLabel="Description"
            inputType="textArea"
            onChange={(e: any) =>
              todoField.set({ ...todoField.value, description: e.target.value })
            }
            btnLabel="Save"
            defaultText={todo.description}
            btnHandler={() =>
              updateTodoDescription({
                id: todo.id,
                key: 'description',
                value: todoField.value.description,
              })
            }
          />

          {/* task due date */}
          <div className="grid gap-3">
            <h1 className="text-sm tracking-wide text-gray-500 text-left">
              Due Date
            </h1>

            <div className="grid grid-cols-[1fr,auto] items-center gap-10">
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  className="relative bg-white py-3 pl-6 outline-none w-[80%]"
                  defaultValue={String(phase(todoField.value.dueAt, 'LL'))}
                  onChange={(e) =>
                    todoField.set({
                      ...todoField.value,
                      dueAt: e.target.value,
                    })
                  }
                />
                <Icon icon={<CalendarIcon />} />
              </div>

              <Button
                name="Save"
                color="bg-blue"
                handler={() =>
                  updateTodoDue({
                    id: todo.id,
                    key: 'dueAt',
                    value: String(phase(todoField.value.dueAt)),
                  })
                }
              />
            </div>
          </div>

          {/* task priority */}
          <div className="grid grid-cols-[1fr,auto] items-center gap-10">
            <div className="grid items-center gap-3">
              <h1 className="text-sm text-left text-gray-500">Priority</h1>
              <TodoPriority />
            </div>

            <Button
              name="Save"
              color="bg-blue"
              handler={() =>
                updateTodoPriority({
                  id: todo.id,
                  key: 'priority',
                  value: todoField.value.priority,
                })
              }
            />
          </div>

          {/* buttons */}
          <div className="flex ml-auto">
            <button
              onClick={cancelBtn}
              className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2  hover:text-red-500 transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTodoModal
