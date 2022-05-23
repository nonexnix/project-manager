import React from 'react'
import { IMember, IUser } from '../../library/schemas/interfaces'
import Linker from '../link/link'

interface IProps {
  userId:string
  memberId: string
}
const Sidebar = ({userId, memberId}:IProps) => {
  return (
    <div className="absolute top-11 bg-white shadow-md shadow-violet grid z-50">
      {/* dashboarrd */}
      <Linker
        name={'Dashboard'}
        link={`/connect/${userId}/view/${memberId}/dashboard`}
        style={
          'py-4 px-16 hover:bg-snow transition-all duration-300'
        }
      />
      {/* members */}
      <Linker
        name={'Members'}
        link={`/connect/${userId}/view/${memberId}/members`}
        style={
          'py-4 px-16 hover:bg-snow transition-all duration-300'
        }
      />
      {/* files */}
      <Linker
        name={'Files'}
        link={`/connect/${userId}/view/${memberId}/files`}
        style={
          'py-4 px-16 hover:bg-snow transition-all duration-300'
        }
      />
      {/* suggestions */}
      <Linker
        name={'Suggestions'}
        link={`/connect/${userId}/view/${memberId}/suggestions`}
        style={
          'py-4 px-16 hover:bg-snow transition-all duration-300'
        }
      />
      {/* announcement */}
      <Linker
        name={'Announcement'}
        link={`/connect/${userId}/view/${memberId}/announcements`}
        style={
          'py-4 px-16 hover:bg-snow transition-all duration-300'
        }
      />
      {/* Leaderboard */}
      <Linker
        name={'Leaderboard'}
        link={`/connect/${userId}/view/${memberId}/leaderboard`}
        style={
          'py-4 px-16 hover:bg-snow transition-all duration-300'
        }
      />
    </div>
  )
}

export default Sidebar