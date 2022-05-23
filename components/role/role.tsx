interface IProps {
  role: any
}

const Role = ({ role }: IProps) => {
  return <div className="bg-pink py-2 px-4 font-semibold text-xs text-center text-white whitespace-nowrap rounded-md mr-2">{role}</div>
}

export default Role
