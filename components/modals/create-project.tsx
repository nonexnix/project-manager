import Icon from "../icon/icon"
import { CollectionIcon} from '@heroicons/react/outline'
import { XIcon} from '@heroicons/react/outline'
import Button from "../button/button"
import useClientStore from "../../library/stores/client"
import Member from "../members/member"

const CreateProjectModal = () => {
  const project = useClientStore((state) => state.project)

  return (
    <div className='bg-gray-500 w-[1125px] shadow-md shadow-violet z-50 px-10 py-6'>
      {/* title logo */}
      <div className='flex items-center gap-3'>
        <Icon icon={<CollectionIcon/>}/>
        <h1 className='text-md font-semibold'>Create New Project</h1>
        <div className='ml-auto'><Icon icon={<XIcon/>}/></div>
      </div>

      {/* project name */}
      <div className='grid gap-6 mt-10'>
        <div className='grid gap-2'>
          <h1 className='text-sm leading-relaxed'>Project Name</h1>
          <input type='text' className='bg-white py-2 pl-4 outline-none w-full'/>
        </div>

        <div className='grid gap-2'>
          <h1 className='text-sm leading-relaxed'>Project Description</h1>
          <input type='text' className='bg-white py-2 pl-4 outline-none w-full'/>
        </div>

        <div className='grid gap-2'>
          <h1 className='text-sm leading-relaxed'>Due Date</h1>
          <input type='text' className='bg-white py-2 pl-4 outline-none'/>
        </div>

        <div className='grid gap-2'>
          <div className='grid grid-flow-col items-center'>
            <h1 className='text-sm leading-relaxed'>Project Members</h1>
            <div className='ml-auto'><Button name='Add Member' color='pink'/></div>
          </div>

          <div className='bg-white grid grid-cols-2 items-center px-6 py-4'>
            {project?.members?.map((member) => (
              <div key={member?.id}><Member/></div>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-3 ml-auto'>
          <button className='border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm'>Cancel</button>
          <Button name='Create New Project' color='blue'/>
        </div>
      </div>
    </div>
  )
}

export default CreateProjectModal