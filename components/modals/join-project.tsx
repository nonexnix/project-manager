import { CollectionIcon } from "@heroicons/react/outline"
import useClientStore from "../../library/stores/client"
import useFieldStore from "../../library/stores/field"
import Button from "../button/button"
import Icon from "../icon/icon"

const JoinProjectModal = ({handler}:any) => {
  const user = useClientStore((state) => state.user)
  const joinProject = useClientStore((state) => state.create.ticket)
  const projectTicket = useFieldStore((state) => state.project)

  // const handleJoinButton = () => {
  //   joinProject({
  //     code:projectTicket.value.code,
  //     userId:user?.id,
  //     projectId:
  //   })

  //   projectTicket?.clear
  // }

  return (
    <div className='absolute top-0 left-0 bottom-0 right-0  w-full grid justify-center items-center z-50'>
      <div className="bg-white w-md shadow-xl shadow-violet px-8 py-6 z-50">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<CollectionIcon />} />
          <h1 className="text-md font-semibold">Join Project</h1>
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
          <button onClick={handler}>
            <Button name="Join Project" color={'bg-blue'}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default JoinProjectModal