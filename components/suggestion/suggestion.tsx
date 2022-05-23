import { DotsHorizontalIcon, ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { ISuggestion } from "../../library/schemas/interfaces"
import Icon from "../icon/icon"
import IconLabel from "../icon/icon-with-label"
import Linker from "../link/link"
import Profile from "../members/profile"

interface IProps {
  suggestion:ISuggestion
  firstName:string
  lastName:string
}

const Suggestion = ({suggestion, firstName, lastName} : IProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='bg-white py-5 px-8 grid gap-8'>
      <div className='grid grid-cols-[1fr,auto] items-center'>
        {/* description */}
        <p className='leading-relaxed text-sm tracking-wide'>{suggestion.description}</p>

        {/* options */}
        <div className='relative'>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Icon icon={<DotsHorizontalIcon/>}/>
          </button>

          {isOpen && 
            <div className='absolute top-6 right-0 bg-white shadow-md shadow-violet'>
              {/* Edit Suggestion */}
              <Linker
                name={'Edit Suggestion'}
                link={'#'}
                style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
              />

              {/* Delete Suggestion */}
              <Linker
                name={'Delete Suggestion'}
                link={'#'}
                style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
              />
            </div>
          }
        </div>
      </div>

      <div className='grid grid-cols-[1fr,auto] items-center'>
        {/* created by and reactions */}
        <div className='flex items-center gap-16'>
          {/* created by */}
          <h1 className='text-xs text-gray-500 tracking-wide'>Posted by {firstName} {lastName}</h1>

          {/* reactions */}
          <div className='flex items-center gap-10'>
            <IconLabel icon={<ThumbUpIcon/>} label={20} style={'w-5 h-5'}/>
            <IconLabel icon={<ThumbDownIcon/>} label={12} style={'w-5 h-5'}/>
          </div>
        </div>

        {/* status */}
        <h1 className='text-sm font-semibold tracking-wide'>{suggestion.status}</h1>
      </div>
    </div>
  )
}

export default Suggestion