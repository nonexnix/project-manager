interface IProps {
  lastName:string
  firstName:string
}
const Member = ({firstName, lastName}: IProps) => {
  return (
    <div className='border-[1px] border-gray-200 px-6 py-3 grid grid-cols-[auto,1fr] gap-5 items-center'>
      <input type="checkbox"/>
      <h1>{lastName} {firstName}</h1>
    </div>
  )
}

export default Member