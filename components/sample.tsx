import useFetch from '../library/hooks/fetch'
import useClientStore from '../library/stores/client'
import useFieldStore from '../library/stores/field'

const Sample = () => {
  const user = useClientStore((state) => state.user)
  const createProject = useClientStore((state) => state.create.project)
  const deleteProject = useClientStore((state) => state.delete.project)
  const projectField = useFieldStore((state) => state.project)
  const setProjectField = useFieldStore((state) => state.set.project)

  const handleSubmit = () => {
    createProject({
      name: projectField.name,
      description: projectField.description,
      dueAt: String(projectField.dueAt),
      userId: user.id,
    })
  }

  const handleDelete = (id:any) => {
    deleteProject({id:id})
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Project Name"
          value={projectField.name}
          onChange={(e) =>
            setProjectField({ ...projectField, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter Project Description"
          value={projectField.description}
          onChange={(e) =>
            setProjectField({ ...projectField, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter Project Due Date"
          value={String(projectField.dueAt)}
          onChange={(e) =>
            setProjectField({ ...projectField, dueAt: e.target.value })
          }
        />
      </div>

      <button onClick={handleSubmit}>Create New Project</button>

      <div>
        {user.members?.map((member) => (
          <div key={member.id} className='border-2 border-black'>
            <h1>{member.project?.name}</h1>
            <h1>{member.project?.description}</h1>
            <h1>{String(member.project?.dueAt)}</h1>
            <button onClick={() => handleDelete(member.project?.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sample
