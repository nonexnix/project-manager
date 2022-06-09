import { UsersIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { IRole } from '../../library/schemas/interfaces'
import useClientStore from '../../library/stores/client'
import Icon from '../icon/icon'
import Member from '../role/member'

interface IProps {
  handler: any
  roleName:string
}

const UpdateRoleMembers = ({ handler, roleName }: IProps) => {
  const project = useClientStore((state) => state.project)
  const [roles, setRoles] = useState(project.roles)

  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-white max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50 grid">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<UsersIcon />} />
          <h1 className="text-md font-semibold">Role Members</h1>
        </div>

        {/* members */}
        <div className="grid gap-3 mt-6">
          {roles!.map((role) => {
            return role.authorizations!.map((authorization) => {
              if (role.name === roleName) {
                return (
                  <Member authorization={authorization}/>
                )
              }
            })
          })}
        </div>

        {/* buttons */}
        <div className="flex items-center gap-3 ml-auto mt-8">
          <button
            onClick={handler}
            className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>

          <button
            onClick={handler}
            className="bg-blue text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:scale-105"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateRoleMembers
