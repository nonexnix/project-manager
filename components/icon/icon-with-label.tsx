interface IProps {
  icon:any
  label:any
  style ? : string
}

const IconLabel = ({ icon,label, style }: IProps) => {
  return (
    <div className='flex items-center gap-3'>
      <div className={`${style} w-7 h-7 text-blue`}>{icon}</div>
      <h1 className='font-medium text-md'>{label}</h1>
    </div>
  )
}

export default IconLabel
