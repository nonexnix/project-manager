import { DotsHorizontalIcon} from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { IMember, IProject, IUser } from '../../library/schemas/interfaces'
import Icon from '../icon/icon'
import Linker from '../link/link'
import Role from '../role/role'
import Profile from './profile'
import type { GetStaticPaths, GetStaticProps} from 'next'
import objectified from '../../library/utilities/objectified'
import useClientStore from '../../library/stores/client'

interface IProps {
  user:IUser
  project: IProject
}
const Member = ({user, project}: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className='bg-white shadow-md shadow-violet grid gap-5 hover:-translate-y-2 transition-all duration-500 px-5 py-4'>
      <div className='grid grid-cols-[1fr,auto] items-center '>
      {/* pic and name */}
        <div className="flex items-center gap-3 ml-6">
          <Profile />
          <h1 className="font-semibold tracking-wide">
            {user.firstName[0].toUpperCase() + user.firstName.slice(1)}{' '}
            {user.lastName[0].toUpperCase() + user.lastName.slice(1)}
          </h1>
        </div>

        {/* option button */}
        {project?.members!.map((member) => {
          return member?.authorizations!.map((authorization) => {
            console.log(authorization.role?.permission)
            if(authorization.role?.permission?.everything === true) {
              return (
                <div className='relative'>
                  <button onClick={() => setIsOpen(!isOpen)}>
                    <Icon icon={<DotsHorizontalIcon />} />
                  </button>

                  {isOpen && 
                    <div className='absolute top-6 right-0 bg-white shadow-md shadow-violet'>
                      {/* Edit roles */}
                      <Linker
                        name={'Edit Roles'}
                        link={'#'}
                        style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                      />

                      {/* Edit Permission */}
                      <Linker
                        name={'Edit Permission'}
                        link={'#'}
                        style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                      />

                      {/* Kick Member */}
                      <Linker
                        name={'Kick Member'}
                        link={'#'}
                        style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                      />
                    </div>
                  }
                </div>
              )
            }
          })
        })}  
      </div>
      
      {/* roles */}
      <div className='flex items-center'>
        {project?.members!.map((member) => {
          return member?.authorizations!.map((authorization) => {
            console.log(authorization)
            return <Role key={authorization.id} role={authorization?.role?.name!}/>
          })
        })}
      </div>
    </div>
  )
}

export default Member

