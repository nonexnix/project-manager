import Icon from '../icon/icon'
import { CollectionIcon } from '@heroicons/react/outline'
import { CalendarIcon } from '@heroicons/react/outline'
import Button from '../button/button'
import useClientStore from '../../library/stores/client'
import useFieldStore from '../../library/stores/field'
import Priority from '../priority/priority'
import Member from '../members/select-member'
import { useState } from 'react'

interface IProps {
  handler: any
}

const CreateTaskModal = ({ handler }: IProps) => {
  const project = useClientStore((state) => state.project)
  const member = useClientStore((state) => state.member)
  const createTask = useClientStore((state) => state.create.task)
  const taskField = useFieldStore((state) => state.task)

  console.log(project)

  const handleCreateButton = () => {
    const minifiedParticipants = taskField.value.participants!.map((participant) => {
      return {
        memberId:participant.memberId
      }
    })

    createTask({
      name: taskField?.value?.name,
      description: taskField?.value?.description,
      dueAt: String(taskField?.value?.dueAt),
      memberId: member.id,
      projectId: project?.id,
      priority: taskField?.value?.priority,
      participants: minifiedParticipants
    })
    taskField.clear()
  }

  return (
    <div className="fixed inset-0">
      <div className="bg-white max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<CollectionIcon />} />
          <h1 className="text-md font-semibold">Create New Task</h1>
        </div>

        <div className="grid gap-6 mt-10">
          <div className="grid grid-flow-col items-start">
            {/* task name */}
            <div>
              <h1 className="text-sm leading-relaxed">Task Name</h1>
              <input
                type="text"
                className="bg-snow py-2 pl-4 outline-none w-full"
                value={taskField?.value?.name}
                onChange={(e) =>
                  taskField.set({ ...taskField?.value, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* task description */}
          <div className="grid gap-2">
            <h1 className="text-sm leading-relaxed">Task Description</h1>
            <textarea
              className="bg-snow py-2 pl-4 outline-none w-full"
              value={taskField?.value?.description}
              onChange={(e) =>
                taskField.set({
                  ...taskField?.value,
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
                value={String(taskField?.value?.dueAt)}
                onChange={(e) =>
                  taskField.set({ ...taskField?.value, dueAt: e.target.value })
                }
              />
              <Icon icon={<CalendarIcon />} />
            </div>
          </div>

          {/* task priority */}
          <div className="grid gap-2">
            <h1 className="text-sm leading-relaxed">Priority</h1>
            <Priority />
          </div>

          {/* Task Members */}
          <div className="grid gap-3">
            <h1 className="text-sm leading-relaxed">Task Members</h1>

            <div className="bg-white h-56 border-2 border-gray-200 flex flex-col gap-2 py-3 px-4 overflow-y-scroll">
              {project?.members?.map((member) => (
                <Member
                  key={member?.id}
                  firstName={member?.user!.firstName}
                  lastName={member?.user!.lastName}
                  memberId={member.id}
                />
              ))}
            </div>
          </div>

          {/* buttons */}
          <div className="flex items-center gap-3 ml-auto mt-8">
            <button
              onClick={handler}
              className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
            <Button name="Create New Task" color={'bg-blue'} handler={handleCreateButton}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskModal
