import { CollectionIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { EToken } from "../../library/schemas/enums"
import { IProject } from "../../library/schemas/interfaces"
import useClientStore from "../../library/stores/client"
import useFieldStore from "../../library/stores/field"
import Button from "../button/button"
import Icon from "../icon/icon"

interface IProps {
  handler:any
  projects:IProject[]
}
const JoinProjectModal = ({handler, projects}:IProps) => {
  const user = useClientStore((state) => state.user)
  const joinProject = useClientStore((state) => state.create.ticket)
  const projectTicket = useFieldStore((state) => state.project)
  const [isCodeFound, setIsCodeFound] = useState(true)
  
  //input code
  // enter / join
  // check project code exists
  // exists: create ticket
  // otherwise: project not found 

  const handleJoinButton = () => {
    setIsCodeFound(false)
    for(const {code, id} of projects) {
      if(projectTicket.value.code === code) {
        setIsCodeFound(true)
        joinProject({
          code:code,
          token:EToken.REQUEST,
          userId:user.id,
          projectId:id
        })
        projectTicket.clear()
      }
    }
  }

  console.log(projects)

  return (
    <div className="fixed inset-0">
      <div className="bg-white max-w-7xl relative inset-2/4 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-violet px-10 py-6 z-50">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<CollectionIcon />} />
          <h1 className="text-md font-semibold">Join Project</h1>
        </div>

        {/* code found status */}
        <div>
          {!isCodeFound && <span className='text-red-600 text-xs font-medium'>Code not Found</span>}
        </div>

        {/* Paste code field */}
        <div className='mt-8'>
          <input
            type="text"
            className="bg-snow py-2 pl-4 outline-none w-full"
            placeholder="Paste Code"
            value={projectTicket.value.code}
            onChange={(e) => projectTicket.set({...projectTicket.value, code:e.target.value})}
          />
        </div>

        {/* buttons */}
        <div className="flex items-center gap-3 ml-auto mt-8">
          <button onClick={handler} className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105">
            Cancel
          </button>
          <Button name="Join Project" color={'bg-blue'} handler={handleJoinButton}/>
        </div>
      </div>
    </div>
  )
}

export default JoinProjectModal
