import React, { useState } from 'react'
import { IAuthorization } from '../../library/schemas/interfaces'
import useClientStore from '../../library/stores/client'

interface IProps {
  authorization:IAuthorization
}
const Member = ({authorization}: IProps) => {
  const [isCheck, setIsCheck] = useState(true)
  const deleteAuthorization = useClientStore(
    (state) => state.delete.authorization
  )
  const createAuthorization = useClientStore(
    (state) => state.create.authorization
  )

  return (
    <div
      className="border-[1px] border-gray-200 px-6 py-3 grid grid-cols-[auto,1fr] gap-5 items-center"
    >
      <input
        type="checkbox"
        checked={isCheck}
        onChange={() => {
          if (!isCheck) {
            setIsCheck(true)
            createAuthorization({memberId:authorization.memberId,roleId:authorization.roleId})
          } else {
            setIsCheck(false)
            deleteAuthorization({id:authorization.id})
          }
        }}
      />
      <h1>
        {authorization.member!.user?.firstName[0].toUpperCase() +
          authorization.member!.user!.firstName!.slice(1)}{' '}
        {authorization.member!.user?.lastName[0].toUpperCase() +
          authorization.member!.user!.lastName!.slice(1)}
      </h1>
    </div>
  )
}

export default Member
