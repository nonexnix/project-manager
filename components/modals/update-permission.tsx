import { KeyIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import useClientStore from '../../library/stores/client'
import Icon from '../icon/icon'
import Permission from '../permission'
import IAuthorization from '../../library/schemas/interfaces/authorization'
import { IPermission, IRole } from '../../library/schemas/interfaces'

interface IProps {
  handler: any
  initialPermission: IPermission
}

const UpdatePermissionModal = ({ handler, initialPermission }: IProps) => {
  const [permission, setPermission] = useState(initialPermission)
  console.log(permission)
  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-white max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50 grid">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<KeyIcon />} />
          <h1 className="text-md font-semibold">Give Permission</h1>
        </div>

        {/* checkboxes */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Permission
            label="Project"
            isCheck={permission.project}
            onChange={() =>
              setPermission({ ...permission, project: !permission.project })
            }
          />
          <Permission
            label="Task"
            isCheck={permission.task}
            onChange={() =>
              setPermission({ ...permission, task: !permission.task })
            }
          />
          <Permission
            label="File"
            isCheck={permission.task}
            onChange={() =>
              setPermission({ ...permission, task: !permission.task })
            }
          />
          <Permission
            label="Suggestion"
            isCheck={permission.suggestion}
            onChange={() =>
              setPermission({ ...permission, suggestion: !permission.suggestion })
            }
          />
          <Permission
            label="Announcement"
            isCheck={permission.announcement}
            onChange={() =>
              setPermission({ ...permission, announcement: !permission.announcement })
            }
          />
          <Permission
            label="Everything"
            isCheck={permission.everything}
            onChange={() =>
              setPermission({ ...permission, everything: !permission.everything })
            }
          />
          <Permission
            label="Message"
            isCheck={permission.message}
            onChange={() =>
              setPermission({ ...permission, message: !permission.message })
            }
          />
          <Permission
            label="Todo"
            isCheck={permission.todo}
            onChange={() =>
              setPermission({ ...permission, todo: !permission.todo })
            }
          />
          <Permission
            label="Ticket"
            isCheck={permission.ticket}
            onChange={() =>
              setPermission({ ...permission, ticket: !permission.ticket })
            }
          />
        </div>

        {/* buttons */}
        <div className="flex items-center gap-3 ml-auto mt-8">
          <button
            onClick={handler}
            className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>

          <button onClick={handler} className="bg-blue text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:scale-105">
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdatePermissionModal
