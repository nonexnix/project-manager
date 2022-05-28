import { useState } from "react"
import useClientStore from "../../library/stores/client"

interface IProps {
  id:string
  status: string
}
const Status = ({ id, status }: IProps) => {
  const fileStatus = useClientStore((state) => state.update.file.status)
  const [show, setShow] = useState(true)

  return (
    <div className="flex items-center gap-3">
      {status === 'PENDING' && (
        <button
          onClick={() => {
            fileStatus({
              id: id,
              key: 'status',
              value: 'APPROVED',
            })
            setShow(false)
          }}
          className="px-4 py-2 text-xs text-white bg-green-600 font-medium hover:bg-green-700 rounded-md transition-colors duration-500"
        >
          Approved
        </button>
      )}
      {/* approved status */}
      {status === 'APPROVED' && (
        <button
          onClick={() => {
            fileStatus({
              id: id,
              key: 'status',
              value: 'APPROVED',
            })
            setShow(false)
          }}
          className="hidden px-4 py-2 text-xs text-white bg-green-600 font-medium hover:bg-green-700 rounded-md transition-colors duration-500"
        >
          Approved
        </button>
      )}

      {/* approved result */}
      {status === 'APPROVED' && (
        <h1 className="text-sm tracking-wide text-green-600 font-semibold cursor-pointer">
          Approved
        </h1>
      )}

      {/* pending status */}
      {status === 'PENDING' && (
        <button
          onClick={() => {
            fileStatus({
              id: id,
              key: 'status',
              value: 'DECLINED',
            })
            setShow(false)
          }}
          className="px-4 py-2 text-xs text-white bg-red-500 font-medium hover:bg-red-700 rounded-md transition-colors duration-500"
        >
          Decline
        </button>
      )}

      {/* decline status */}
      {status === 'DECLINED' && (
        <button
          onClick={() => {
            fileStatus({
              id: id,
              key: 'status',
              value: 'DECLINED',
            })
            setShow(false)
          }}
          className="hidden px-4 py-2 text-xs text-white bg-red-500 font-medium hover:bg-red-700 rounded-md transition-colors duration-500"
        >
          Decline
        </button>
      )}

      {/* declined result */}
      {status === 'DECLINED' && (
        <h1 className="text-sm tracking-wide text-red-600 font-semibold cursor-pointer">
          Declined
        </h1>
      )}
    </div>
  )
}

export default Status
