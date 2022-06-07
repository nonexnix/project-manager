import { KeyIcon } from '@heroicons/react/outline'
import React from 'react'
import Icon from '../icon/icon'
import Permission from '../permission'

interface IProps {
  handler: any
}

const CreatePermissionModal = ({handler} :IProps) => {

  

  return (
    <div className="fixed inset-0">
      <div className="bg-white max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50 grid">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<KeyIcon />} />
          <h1 className="text-md font-semibold">Give Permission</h1>
        </div>


        {/* checkboxes */}
        <div className='grid gap-3 mt-6'>
          <Permission label="Project"/>
          <Permission label="Task"/>
          <Permission label="Files"/>
          <Permission label="Suggestion"/>
          <Permission label="Announcement"/>
        </div>


        {/* buttons */}
        <div className="flex items-center gap-3 ml-auto mt-8">
          <button onClick={handler} className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105">
            Cancel
          </button>

          <button className="bg-blue text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:scale-105">
            Give Permission
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePermissionModal
