import { XIcon } from "@heroicons/react/outline"

interface IProps {
  lastName:string
  firstName:string
  handler:any
}
const Member = ({firstName, lastName, handler}: IProps) => {
  return (
    <div className='border-[1px] border-gray-200 px-6 py-3 grid grid-cols-[1fr,auto] gap-5 items-center hover:bg-snow'>
      <h1>{lastName} {firstName}</h1>
      <button onClick={handler}>
        <XIcon className='text-red-600 w-5 h-5 hover:text-red-700 cursor-pointer'/>
      </button>
    </div>
  )
}

export default Member