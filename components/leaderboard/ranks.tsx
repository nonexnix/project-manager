import { IMember } from '../../library/schemas/interfaces'
import { useState } from 'react'
import sortLeaderBoard from '../../library/utilities/sort-leaderboard'
import Rank from './rank'

interface IProps {
  members: IMember[]
}

const Ranks = ({ members }: IProps) => {
  const [sortedMembers] = useState(sortLeaderBoard(members, false))

  return (
    <div>
      {sortedMembers.slice(3).map((member, index) => (
        <Rank key={member.id} member={member} index={index} />
      ))}
    </div>
  )
}

export default Ranks
