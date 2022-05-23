interface IProps {
  children: React.ReactNode
}

const WhiteCard = ({ children }: IProps) => {
  return <div className="relative bg-white p-6 pt-4 shadow-md shadow-violet">
    <div>{children}</div>
  </div>
}

export default WhiteCard
