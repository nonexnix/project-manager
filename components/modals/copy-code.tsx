import { ClipboardIcon, XIcon } from "@heroicons/react/outline"
import Icon from "../icon/icon"

interface IProps {
  handler:any
  code:string
}
const ProjectCodeModal = ({handler, code}:IProps) => {
  return (
    <div className='absolute top-0 md:-top-1/3 -left-[1200px] -bottom-42 right-0 w-full lg:w-[800px] grid items-center z-50'>
      <div className="bg-white w-md shadow-xl shadow-violet px-10 py-8 z-50 grid gap-5">
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
        <div className='bg-snow py-3 pl-4 w-full'>{code}</div>
      </div>
    </div>
  )
}

export default ProjectCodeModal