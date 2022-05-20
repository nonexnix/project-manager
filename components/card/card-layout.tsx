interface IProps {
  children: React.ReactNode
}

const CardLayout = ({ children }: IProps) => {
  return <div className="bg-white p-6">{children}</div>
}

export default CardLayout
