import { StarIcon } from '@heroicons/react/outline'
import { IMember } from '../../library/schemas/interfaces'
import Profile from '../members/profile'
import { useState } from 'react'

interface IProps {
  index: number
  member: IMember
}

const Rank = ({ index, member }: IProps) => {
  return (
    <div className="grid grid-cols-[auto,auto,1fr,auto] md:gap-10 items-center px-10 py-2 bg-white shadow-md shadow-violet cursor-pointer hover:bg-snow transition-colors duration-300">
      <span className="font-medium text-xs mr-10 md:mr-12">{index + 4}</span>
      <Profile />
      <h1 className="tracking-wide font-medium ml-6">
        {member.user!.firstName[0].toUpperCase() +
          member.user!.firstName.slice(1)}{' '}
        {member.user!.lastName[0].toUpperCase() +
          member.user!.lastName.slice(1)}{' '}
      </h1>
      <div className="flex items-center gap-3">
        <StarIcon className="w-5 h-5 text-yellow-500" />
        <h2 className="text-hotpink font-semibold">{member.rating}</h2>
      </div>
    </div>
  )
}

export default Rank
