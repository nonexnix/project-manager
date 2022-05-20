import useClientStore from "../../library/stores/client"
import WhiteCard from "../card/white-card"
import IconCount from "../icon/icon-with-count"
import { CollectionIcon } from "@heroicons/react/outline"
import { PencilAltIcon } from "@heroicons/react/outline"
import { FolderOpenIcon } from "@heroicons/react/outline"
import { LightBulbIcon } from "@heroicons/react/outline"
import SnowCard from "../card/snow-card"
import Members from "../members/members"
import phase from "../../library/utilities/phase"

const Project = () => {
  const user = useClientStore((state) => state.user)
  
  return (
    <div>
      {user.members?.map((member) => (
        <div className='w-[450px] h-[300px] cursor-pointer hover:-translate-y-2 transiton-all duration-500'>
          <WhiteCard>
            <div className='grid gap-4'>
              <div className='grid gap-1'>
                <div className='text-md md:text-xl leading-relaxed font-semibold'>{member.project?.name}</div>
                <div className='text-sm leading-relaxed'>{String(phase(member.project!.dueAt,'LL'))}</div>
              </div>

              <div className='flex items-center ml-2'>
                <Members/>
                <Members/>
                <Members/>
                <Members/>
                <Members/>

                <h1 className='text-sm ml-5'>+ {member.project?.members?.length} more</h1>
              </div>

              <div className='grid grid-flow-col items-center'>
                <IconCount icon={<CollectionIcon/>} count={member.project?.tasks?.length}/>
                <IconCount icon={<PencilAltIcon/>} count={member.project?.tasks?.length}/>
                <IconCount icon={<FolderOpenIcon/>} count={member.project?.files?.length}/>
                <IconCount icon={<LightBulbIcon/>} count={member.project?.suggestions?.length}/>
              </div>
            </div>

              <SnowCard>
                <div>
                  <div className='grid grid-flow-col items-center'>
                    <h1 className='text-xs text-gray-500'>Completeness</h1>
                    <h1 className='text-xs text-gray-500 ml-auto'>60%</h1>
                  </div>
                  <div className='relative w-full h-4 mt-1 border-[1px] border-gray-200 rounded-full'>
                    <div className='absolute left-0 top-0 w-[60%] h-full bg-green-500 rounded-full'></div>
                  </div>
                </div>
              </SnowCard>
            </WhiteCard>
          </div>
      ))}
      
    </div>
  )
}

export default Project