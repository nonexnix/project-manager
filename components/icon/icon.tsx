interface IProps {
  icon: any
}
const Icon = ({ icon }: IProps) => {
  return <div className='w-6 h-6 text-blue'>{icon}</div>
}

export default Icon
