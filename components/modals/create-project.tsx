import Icon from '../icon/icon'
import { CollectionIcon } from '@heroicons/react/outline'
import { CalendarIcon } from '@heroicons/react/outline'
import Button from '../button/button'
import useClientStore from '../../library/stores/client'
import Member from '../members/select-member'
import useFieldStore from '../../library/stores/field'

const CreateProjectModal = ({handler} : any) => {
  const user = useClientStore((state) => state.user)
  const createProject = useClientStore((state) => state.create.project)
  const projectField = useFieldStore((state) => state.project)

  const handleCreateButton = () => {
    createProject({
      name: projectField.value.name,
      description: projectField.value.description,
      dueAt: String(projectField.value.dueAt),
      userId: user.id
    })
    projectField.clear()
  }

  return (
    <div className='fixed top-0 left-0 translate-y-1/2 w-full lg:w-[800px] grid items-center z-50'>
      <div className="bg-white w-md shadow-xl shadow-violet px-10 py-6 z-50">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<CollectionIcon />} />
          <h1 className="text-md font-semibold">Create New Project</h1>
        </div>

        <div className="grid gap-6 mt-10">
          {/* project name */}
          <div className="grid gap-2">
            <h1 className="text-sm leading-relaxed">Project Name</h1>
            <input
              type="text"
              className="bg-snow py-2 pl-4 outline-none w-full"
              value={projectField.value.name}
              onChange={(e) =>
                projectField.set({ ...projectField.value, name: e.target.value })
              }
            />
          </div>

          {/* project description */}
          <div className="grid gap-2">
            <h1 className="text-sm leading-relaxed">Project Description</h1>
            <textarea
              className="bg-snow py-2 pl-4 outline-none w-full"
              value={projectField.value.description}
              onChange={(e) =>
                projectField.set({ ...projectField.value, description: e.target.value })
              }
            ></textarea>
          </div>

          {/* project due date */}
          <div className="flex flex-col gap-2">
            <h1 className="text-sm leading-relaxed">Due Date</h1>
            <div className='grid grid-cols-[1fr,auto] gap-5 items-center'>
              <input
                type="text"
                className="relative bg-snow py-2 pl-4 outline-none"
                value={String(projectField.value.dueAt)}
                onChange={(e) =>
                  projectField.set({ ...projectField.value, dueAt: e.target.value })
              }/>
              <Icon icon={<CalendarIcon/>} />
            </div>
          </div>

          {/* buttons */}
          <div className="flex items-center gap-3 ml-auto mt-8">
            <button onClick={handler} className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105">
              Cancel
            </button>
            <button onClick={handler}>
              <Button name="Create New Project" color={'bg-blue'} handler={handleCreateButton} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProjectModal
