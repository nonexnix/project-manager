import { DotsHorizontalIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import useClientStore from '../../library/stores/client'
import Icon from '../icon/icon'
import Linker from '../link/link'

interface IProps {
  id: string
}
const Option = ({ id }: IProps) => {
  const deleteFile = useClientStore((state) => state.delete.file)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Icon icon={<DotsHorizontalIcon />} />
      </button>

      {isOpen && (
        <div className="absolute top-6 right-0 bg-white shadow-md shadow-violet">
          {/* Delete File */}
          <button onClick={() => deleteFile({ id: id })}>
            <Linker
              name={'Delete File'}
              link={'#'}
              style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default Option
