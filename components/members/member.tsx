import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { IMember, IProject, IUser } from '../../library/schemas/interfaces'
import Icon from '../icon/icon'
import Linker from '../link/link'
import Role from '../role/role'
import Profile from './profile'
import useClientStore from '../../library/stores/client'
import GiveAuthorization from '../modals/create-authorization'
import CreatePermissionModal from '../modals/create-permission'

interface IProps {
  user: IUser
  project: IProject
  member: IMember
  memberId: string
  lastName: string
  firstName: string
}
const Member = ({
  user,
  project,
  member,
  memberId,
  lastName,
  firstName,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [giveAuthorization, setGiveAuthorization] = useState(false)
  const [givePermission, setGivePermission] = useState(false)
  const kickMember = useClientStore((state) => state.update.member.active)

  return (
    <div className="bg-white shadow-md shadow-violet grid gap-5 hover:-translate-y-2 transition-all duration-500 px-5 py-4">
      <div className="grid grid-cols-[1fr,auto] items-center ">
        {/* pic and name */}
        <div className="flex items-center gap-3 ml-6">
          <Profile />
          <h1 className="font-semibold tracking-wide">
            {firstName} {lastName}
          </h1>
        </div>

        {/* option button */}
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Icon icon={<DotsHorizontalIcon />} />
          </button>

          {isOpen && (
            <div className="absolute top-6 right-0 bg-white shadow-md shadow-violet">
              {/* Edit Authorization */}
              <button onClick={() => setGiveAuthorization(!giveAuthorization)}>
                <Linker
                  name={'Edit Roles'}
                  link={'#'}
                  style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                />
              </button>

              {giveAuthorization && (
                <GiveAuthorization
                  project={project}
                  cancelBtn={() => setGiveAuthorization(!giveAuthorization)}
                  memberId={memberId}
                  authorizations={member.authorizations!}
                />
              )}

              {/* Edit Permission */}
              <button onClick={() => setGivePermission(!givePermission)}>
                <Linker
                  name={'Edit Permission'}
                  link={'#'}
                  style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                />
              </button>

              {givePermission && (
                <CreatePermissionModal handler={() => setGivePermission(!givePermission)}/>
              )}

              {/* Kick Member */}
              <button
                onClick={() =>
                  kickMember({
                    id: memberId,
                    key: 'active',
                    value: false,
                  })
                }
              >
                <Linker
                  name={'Kick Member'}
                  link={'#'}
                  style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* roles */}
      <div className="flex items-center">
        {member.authorizations?.map((authorization) => (
          <Role key={authorization.id} role={authorization.role?.name} />
        ))}
      </div>
    </div>
  )
}

export default Member
