import { DotsHorizontalIcon } from "@heroicons/react/outline"
import { useState } from "react"
import useClientStore from "../../library/stores/client"
import Icon from "../icon/icon"
import Linker from "../link/link"

interface IProps {
  name: string
  description:string
  id:string
  date:string
}
const Announcement = ({name, description, id, date} : IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const deleteAnnouncement = useClientStore((state) => state.delete.announcement)

  return (
    <div className='bg-white py-5 px-8 grid gap-8'>
        <div className='grid grid-cols-[1fr,auto] items-center'>
          {/* name and date */}
          <div className="grid gap-1">
            <h1 className='font-semibold'>{name}</h1>
            <h2 className='text-xs text-gray-500 tracking-wider'>{date}</h2>
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
                <button onClick={() => deleteAnnouncement({ id: id })}>
                  <Linker
                    name={'Delete Announcement'}
                    link={'#'}
                    style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                  />
                </button>
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