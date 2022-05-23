import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/outline"
import { useState } from "react"
import { TPriority } from "../../library/schemas/types"
import useFieldStore from "../../library/stores/field"
import Icon from "../icon/icon"

const Priority = () => {
  const [isOpen, setIsOpen] = useState(false)
  const taskField = useFieldStore((state) => state.task)
  console.log(taskField)

  const handlePrioritySelection = (priority:TPriority) => {
    taskField.set({...taskField.value, priority:priority})
    setIsOpen(false)
  }
  return (
    <div className='grid gap-2'>
      <button className="bg-snow relative grid grid-cols-[1fr,auto] items-center py-3 px-5" onClick={() => setIsOpen(!isOpen)}>
        <h1 className='text-left'>{taskField.value.priority}</h1>
        {isOpen ? <Icon icon={<ChevronUpIcon/>}/> : <Icon icon={<ChevronDownIcon/>}/>}
        
      </button>

      {isOpen && 
        <div className="bg-snow grid w-full">
          <button onClick={() => handlePrioritySelection("LOW")} className="px-6 py-3 text-center text-pink font-semibold hover:bg-white transition-all duration-300">
            LOW
          </button>
          <button onClick={() => handlePrioritySelection("MEDIUM")}className="px-6 py-3 text-center text-green-500 font-semibold hover:bg-white transition-all duration-300">
            MEDIUM
          </button>
          <button onClick={() => handlePrioritySelection("HIGH")}className="px-6 py-3 text-center text-red-500 font-semibold hover:bg-white transition-all duration-300">
            HIGH
          </button>
        </div>
      }
    </div>
  )
}

export default Priority
