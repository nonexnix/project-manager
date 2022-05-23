import { DotsHorizontalIcon } from "@heroicons/react/outline"
import { useState } from "react"
import Icon from "../icon/icon"
import Linker from "../link/link"

interface IProps {
  name: string
  description:string
}
const Announcement = ({name, description} : IProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='bg-white py-5 px-8 grid gap-8'>
        <div className='grid grid-cols-[1fr,auto] items-center'>
          {/* name and date */}
          <div className="grid gap-1">
            <h1 className='text-lg font-semibold tracking-wide'>{name}</h1>
            <h2 className='text-xs text-gray-500 tracking-wider'>September 22, 2022</h2>
          </div>

          {/* options */}
          <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)}>
              <Icon icon={<DotsHorizontalIcon/>}/>
            </button>

            {isOpen && 
              <div className='absolute top-6 right-0 bg-white shadow-md shadow-violet'>
                {/* Edit Announcements */}
                <Linker
                  name={'Edit Announcement'}
                  link={'#'}
                  style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                />
  
                {/* Delete Announcements */}
                <Linker
                  name={'Delete Announcement'}
                  link={'#'}
                  style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                />
            </div>
            }
          </div>
        </div>
        {/* description */}
        <p className='leading-relaxed text-sm tracking-wide'>{description}</p>
      </div>
  )
}

export default Announcement