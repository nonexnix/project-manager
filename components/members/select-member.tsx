import useFieldStore from '../../library/stores/field'

interface IProps {
  lastName: string
  firstName: string
  memberId: string
}

const Member = ({ firstName, lastName, memberId }: IProps) => {
  const taskField = useFieldStore((state) => state.task)

  console.log(taskField.value.participants)
  const handleTaskMembers = (e: any) => {
    console.log(memberId, e.target.checked)

    if (e.target.checked) {
      if(taskField.value.participants!.length < 1) {
        taskField.set({
          ...taskField.value,
          participants: [
            {id:"123",access:false,memberId: memberId },
          ],
        })
      }

      else {
        taskField.set({
          ...taskField.value,
          participants: [
            ...taskField.value.participants!,
            {id:"123",access:false,memberId: memberId },
          ],
        })
      }
    }

    else {
      const filteredTaskMembers = taskField!.value.participants!.filter((participant) => {
        return participant.memberId !== memberId
      })

      taskField.set({
        ...taskField.value,
        participants: filteredTaskMembers,
      })
    }
  }

  return (
    <div className="border-[1px] border-gray-200 px-6 py-3 grid grid-cols-[auto,1fr] gap-5 items-center">
      <input type="checkbox" onChange={(e) => handleTaskMembers(e)} />
      <h1>
        {firstName} {lastName}
      </h1>
    </div>
  )
}

export default Member
