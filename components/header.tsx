import { MenuIcon } from '@heroicons/react/outline'
import Icon from './icon/icon'
import Linker from './link/link'
import { useState } from 'react'
import Button from './button/button'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'

interface IProps {
  fullname?: string
  firstName?: string
  lastName?: string
  image?: string
  id: string
}

const Header = ({ fullname, image }: IProps) => {
  const router = useRouter()

  return (
    <header>
      <div className="area bg-white shadow-md shadow-violet grid grid-flow-col items-center">
        <h1 className="font-bold text-blue text-sm md:text-lg whitespace-nowrap">
          PCU Teams
        </h1>

        <div className="hidden md:block md:ml-auto">
          <div className="grid grid-flow-col gap-6 items-center ">
            <div className="group relative text-blue font-semibold">
              <Linker name={'All Projects'} link={'/'} />
              <div className="absolute w-0 h-1 bg-blue group-hover:w-full transition-all duration-500 ease-in-out"></div>
            </div>

            {/* name */}
            <h1 className="text-sm text-blue font-semibold">
              Hi! <span className="font-bold">{fullname}</span>
            </h1>

            {/* user profile */}
            <div className="w-10 h-10 border-[1px] border-gray-200 rounded-full grid items-center justify-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                <img className="w-full" src={image} alt="" />
              </div>
            </div>

            <Button
              name={'Logout'}
              color={'bg-pink'}
              handler={() => {
                signOut()
                router.push('/')
              }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
