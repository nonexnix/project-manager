interface IProps {
  children: React.ReactNode
}

const SnowCard = ({ children }: IProps) => {
  return <div className="bg-snow w-full px-6 py-4 absolute bottom-0 left-0">{children}</div>
}

export default SnowCard