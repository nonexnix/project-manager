import { XIcon } from "@heroicons/react/outline"
import useClientStore from "../../library/stores/client"
import Icon from "../icon/icon"

const Member = () => {
  const project = useClientStore((state) => state.project)

  return (
    <>
      {project?.members?.map((member) => (
        <div className='border-[1px] border-gray-200 px-6 py-2 grid grid-flow-col items-center'>
          <h1>{member?.user?.firstName} {member?.user?.lastName}</h1>
          <div className='ml-auto'><Icon icon={<XIcon/>}/></div>
        </div>
      ))}
    </>
  )
}

export default Member