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
  const fileName:string = fileField!.value.path!.split(".")[0].toString()
  const fileExtension:string = fileField!.value!.path.split(".")[0].toString()

  const handleSubmitFile = () => {
    submitFile({
      name: fileName,
      extension: fileExtension,
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
    <div className="fixed top-0 left-0 translate-y-1/2 w-full grid justify-center items-center z-50">
      <div className="bg-white w-md shadow-xl shadow-violet px-8 py-6 z-50">
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
            onChange={(e) =>
              fileField.set({ ...fileField.value, path: e.target.value })
            }
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
          <Button name="Submit File" color={'bg-blue'} handler={handleSubmitFile} />
        </div>
      </div>
    </div>
  )
}

export default SubmitFile
