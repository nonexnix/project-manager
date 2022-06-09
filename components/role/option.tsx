import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { IRole } from '../../library/schemas/interfaces'
import Icon from '../icon/icon'
import Linker from '../link/link'
import UpdatePermissionModal from '../modals/update-permission'
import UpdateRoleMembers from '../modals/update-role-members'

interface IProps {
  role: IRole
}

const Option = ({ role }: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [updatePermission, setUpdatePermission] = useState(false)
  const [updateRoleMembers, setUpdateRoleMembers] = useState(false)
  
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Icon icon={<DotsHorizontalIcon />} />
      </button>

      {isOpen && (
        <div className="absolute top-6 right-0 bg-white shadow-md shadow-violet">
          {/* Edit permission */}
          <button onClick={() => setUpdatePermission(!updatePermission)}>
            <Linker
              name={'Edit Permission'}
              link={'#'}
              style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
            />
          </button>

          {updatePermission && (
            <UpdatePermissionModal
              handler={() => setUpdatePermission(!updatePermission)}
              initialPermission={role.permission!}
            />
          )}

          {/* See Members */}
          <button onClick={() => setUpdateRoleMembers(!updateRoleMembers)}>
            <Linker
              name={'See Members'}
              link={'#'}
              style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
            />
          </button>

          {updateRoleMembers && (
            <UpdateRoleMembers
              handler={() => setUpdateRoleMembers(!updateRoleMembers)}
              roleName={role.name}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Option
