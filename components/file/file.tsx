import { DotsHorizontalIcon} from '@heroicons/react/outline'
import { useState } from 'react'
import Icon from '../icon/icon'
import Linker from '../link/link'

interface IProps {
  name:string
  extension:string
  date:string
}

const File = ({name, extension, date} :IProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='bg-white shadow-md shadow-violet grid gap-5 hover:-translate-y-2 transition-all duration-500 px-5 py-4'>
      <div className='grid grid-cols-[1fr,auto] gap-5 items-center '>
        {/* name */}
        <p className="font-semibold tracking-wider w-[80%] whitespace-wrap">{name}.{extension}</p>

        {/* option button */}
        <div className='relative'>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Icon icon={<DotsHorizontalIcon />} />
          </button>

          {isOpen && 
            <div className='absolute top-6 right-0 bg-white shadow-md shadow-violet'>
              {/* Delete File */}
              <Linker
                name={'Delete File'}
                link={'#'}
                style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
              />

              {/* File Points */}
              <Linker
                name={'Give Points'}
                link={'#'}
                style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
              />
            </div>
          }
        </div>  
      </div>

      {/* date */}
      <h1 className='text-right text-sm tracking-wide text-gray-00'>{date}</h1>
    </div>
  )
}

export default File
