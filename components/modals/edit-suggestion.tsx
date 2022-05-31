import { LightBulbIcon } from "@heroicons/react/outline"
import EditTextField from "../edit-input-field"
import Icon from "../icon/icon"

interface IProps {
  defaultTitle:string
  titleHandler:any
  btnTitle:any
  defaultDescription: string
  descriptionHandler:any
  btnDescription:any
  cancelBtn:any
}
const EditSuggestion = ({defaultTitle, btnTitle, defaultDescription, titleHandler, descriptionHandler, btnDescription, cancelBtn}: IProps) => {

  return (
    <div className="fixed inset-0">
      <div className="bg-white max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<LightBulbIcon />} />
          <h1 className="text-md font-semibold">Edit Suggestion</h1>
        </div>

        {/* Inputs field */}
        <div className="mt-8 grid gap-5">
          {/* title */}
          <EditTextField 
            inputLabel='Name'
            inputType="input"
            onChange={titleHandler}
            btnLabel='Save'
            defaultText={defaultTitle}
            btnHandler={btnTitle}
          />

          {/* description */}
          <EditTextField 
            inputLabel='Description'
            inputType="textarea"
            onChange={descriptionHandler}
            btnLabel='Save'
            defaultText={defaultDescription}
            btnHandler={btnDescription}
          />
        </div>

        {/* buttons */}
        <div className="flex ml-auto mt-8">
          <button onClick={cancelBtn} className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditSuggestion