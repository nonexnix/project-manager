import useClientStore from '../../library/stores/client'

interface IProps {
  firstName: string
  lastName: string
  userId: string
  projectId: string
  ticketId: string
}

const Request = ({
  lastName,
  firstName,
  userId,
  projectId,
  ticketId,
}: IProps) => {
  const ticketApproved = useClientStore((state) => state.create.member)
  const deleteRequest = useClientStore((state) => state.delete.ticket)

  return (
    <div className="bg-white shadow-md shadow-violet grid gap-5 hover:-translate-y-2 transition-all duration-500 px-5 py-4 cursor-pointer">
      {/* name */}
      <p className="font-medium tracking-wide w-[90%] whitespace-wrap">
        {firstName} {lastName}
      </p>

      {/* request status */}
      <div className="ml-auto flex items-center gap-5">
        <button
          onClick={() => {
            ticketApproved({ userId: userId, projectId: projectId })
            deleteRequest({ id: ticketId })
          }}
          className="px-4 py-2 text-xs text-white bg-green-600 font-medium hover:bg-green-700 rounded-md transition-colors duration-500"
        >
          Approved
        </button>

        <button
          onClick={() => deleteRequest({ id: ticketId })}
          className="px-4 py-2 text-xs text-white bg-red-600 font-medium hover:bg-red-700 rounded-md transition-colors duration-500"
        >
          Declined
        </button>
      </div>
    </div>
  )
}

export default Request
