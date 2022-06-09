import { UserIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import {
  IAuthorization,
  IMember,
  IProject,
} from '../../library/schemas/interfaces'
import useClientStore from '../../library/stores/client'
import Icon from '../icon/icon'

interface IProps {
  project: IProject
  cancelBtn: any
  memberId: string
  authorizations: IAuthorization[]
}
const GiveAuthorization = ({
  project,
  cancelBtn,
  memberId,
  authorizations,
}: IProps) => {
  const createAuthorization = useClientStore(
    (state) => state.create.authorization
  )

  const deleteAuthorization = useClientStore(
    (state) => state.delete.authorization
  )

  const modifiedRoles = (authorizations: IAuthorization[]) => {
    const updatedRoles = project.roles!.map((role) => {
      for (const authorization of authorizations) {
        if (authorization.role?.name === role.name) {
          return { ...role, checked: true, authorization}
        }
      }
      
      for (const authorization of authorizations) {
        if (authorization.role?.name !== role.name) {
          return { ...role, checked: false, authorization}
        }
      }

      return { ...role, checked: false, authorization:{id:"", memberId:"", roleId: ""}}
    })
    return updatedRoles
  }

  const [roles, setRoles] = useState(modifiedRoles(authorizations))

  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-white max-w-5xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50 grid">
        {/* title logo*/}
        <div className="flex items-center gap-3">
          <Icon icon={<UserIcon />} />
          <h1 className="text-md font-semibold">Member Roles</h1>
        </div>

        {/* PROJECT ROLES */}
        <div className="grid gap-3 mt-6">
          {roles.map((role) => {
            if (role.name !== 'Member') {
              return (
                <div
                  key={role.id}
                  className="flex items-center gap-5 py-4 px-6 border-[1px] border-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={role.checked}
                    onChange={() => {
                      const updatedRoles = roles.map((r) => {
                        if (r.checked) {
                          if (role.id === r.id) {
                            deleteAuthorization({id: role.authorization.id})
                            return { ...r, checked: false }
                          }
                        }
                        if (role.id === r.id) {
                          createAuthorization({memberId:memberId, roleId:role.id})
                          return { ...r, checked: true }
                        } 
                        return r
                      })
                      setRoles(updatedRoles!)
                    }}
                  />
                  <h1 className="text-sm">{role!.name}</h1>
                </div>
              )
            }
          })}
        </div>

        {/* buttons */}
        <div className="flex gap-3 ml-auto mt-6">
          <button
            onClick={cancelBtn}
            className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2  hover:text-red-500 transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>

          <button
            onClick={cancelBtn}
            className="bg-blue text-white rounded-md px-4 py-2 transition-all duration-300 hover:scale-105"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default GiveAuthorization
