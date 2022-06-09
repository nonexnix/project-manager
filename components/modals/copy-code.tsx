import { ClipboardIcon, XIcon } from "@heroicons/react/outline"
import Icon from "../icon/icon"

interface IProps {
  handler:any
  code:string
}
const ProjectCodeModal = ({handler, code}:IProps) => {
  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-white max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50">
        {/* title logo and close btn*/}
        <div className='grid grid-cols-[1fr,auto] items-center'>
          <div className="flex items-center gap-3">
            <Icon icon={<ClipboardIcon />} />
            <h1 className="text-md font-semibold">Project Code</h1>
          </div>
          
          <button onClick={handler}>
            <Icon icon={<XIcon/>}/>
          </button>
        </div>

        {/* Paste code field */}
        <div className='bg-snow py-3 pl-4 w-full mt-6'>{code}</div>
      </div>
    </div>
  )
}

export default ProjectCodeModal