import Icon from '../icon/icon'
import { UserIcon } from '@heroicons/react/outline'
import { CalendarIcon } from '@heroicons/react/outline'
import Button from '../button/button'
import useClientStore from '../../library/stores/client'
import useFieldStore from '../../library/stores/field'
import Priority from '../priority/priority'
import Member from '../members/select-member'
import { useState } from 'react'

interface IProps {
  handler: any
  projectId: string
}

const CreateRoleModal = ({ handler, projectId }: IProps) => {
  const project = useClientStore((state) => state.project)
  const createRole = useClientStore((state) => state.create.role)
  const roleField = useFieldStore((state) => state.role)

  return (
    <div className="fixed inset-0">
      <div className="bg-white max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<UserIcon />} />
          <h1 className="text-md font-semibold">Create New Role</h1>
        </div>

        <div className="grid gap-6 mt-10">
          <div className="grid grid-flow-col items-start">
            {/* role name */}
            <div>
              <h1 className="text-sm leading-relaxed">Role Name</h1>
              <input
                type="text"
                className="bg-snow py-2 pl-4 outline-none w-full"
                value={roleField?.value?.name}
                onChange={(e) =>
                  roleField.set({
                    ...roleField?.value,
                    name: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* role description */}
          <div className="grid gap-2">
            <h1 className="text-sm leading-relaxed">Role Description</h1>
            <textarea
              className="bg-snow py-2 pl-4 outline-none w-full"
              value={roleField?.value?.description}
              onChange={(e) =>
                roleField.set({
                  ...roleField?.value,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>

          {/* buttons */}
          <div className="flex items-center gap-3 ml-auto mt-8">
            <button
              onClick={handler}
              className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
            <Button
              name="Create New Role"
              color={'bg-blue'}
              handler={() => {
                createRole({
                  name: roleField.value.name,
                  description: roleField.value.description,
                  projectId: projectId,
                })
                roleField.clear()
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRoleModal
