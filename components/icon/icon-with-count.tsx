interface IProps {
  icon: any
  count: any
}
const IconCount = ({ icon, count }: IProps) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 rounded-full grid items-center justify-center'>
        <div className="w-6 h-6 text-blue z-50">{icon}</div>
      </div>

      <h1 className='font-bold text-md'>{count}</h1>
    </div>
  )
}

export default IconCount
