import { FolderOpenIcon } from '@heroicons/react/outline'
import React from 'react'
import useClientStore from '../../library/stores/client'
import useFieldStore from '../../library/stores/field'
import Button from '../button/button'
import Icon from '../icon/icon'

interface IProps { 
  memberId:string
  projectId:string
  handler:any
}
const SubmitFile = ({memberId, projectId, handler}:IProps) => {
  const submitFile = useClientStore((state) => state.create.file)
  const fileField = useFieldStore((state) => state.file)
  
  console.log(fileField.value)
  const handleSubmitFile = () => {
    submitFile({
      name: fileField.value.name,
      extension: fileField.value.extension,
      description:fileField.value.description,
      path: fileField.value.path,
      memberId:memberId,
      projectId:projectId
    })

    fileField.clear()

    console.log("name " + fileField.value.name)
    console.log("extension " + fileField.value.extension)
    console.log("path " + fileField.value.extension)
  }

  return (
    <div className="fixed inset-0">
      <div className="bg-white max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<FolderOpenIcon />} />
          <h1 className="text-md font-semibold">Submit File</h1>
        </div>

        {/* Submit File field */}
        <div className="mt-8">
          {/* file */}
          <input
            type="file"
            className="bg-snow py-3 pl-4 outline-none w-full"
            placeholder="Enter File"
            value={fileField.value.path}
            onChange={(e) => {
              fileField.set({ 
                ...fileField.value, 
                path: e.target.value,
                name: e.target.value.split('\\')[e.target.value.split('\\').length - 1].toString().split('.')[0].toString(),
                extension: e.target.value.split('.')[e.target.value.split('.').length - 1].toString()
              })
            }}
          />

          {/* description */}
          <textarea
            className="bg-snow py-3 pl-4 outline-none w-full mt-3"
            placeholder="Enter File Description"
            value={fileField.value.description}
            onChange={(e) =>
              fileField.set({ ...fileField.value, description: e.target.value })
            }
          />
        </div>

        {/* buttons */}
        <div className="flex items-center gap-3 ml-auto mt-8">
          <button onClick={handler} className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105">
            Cancel
          </button>
          <Button name="Submit File" color={'bg-blue'}  handler={handleSubmitFile}/>
        </div>
      </div>
    </div>
  )
}

export default SubmitFile
