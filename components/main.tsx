interface IProps {
  children: React.ReactNode
}

const Main = ({ children }: IProps) => {
  return (
    <main>
      <div className="area mt-10">{children}</div>
    </main>
  )
}

export default Main
