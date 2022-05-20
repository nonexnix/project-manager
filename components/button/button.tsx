interface IProps {
  name: string
  color: string
}
const Button = ({ name, color }: IProps) => {
  return (
    <div>
      <button
        className={`bg-${color} py-2 px-4 text-white font-medium cursor-pointer text-sm md:text-md rounded-md hover:scale-105 transition-all duration-300 whitespace-nowrap `}
      >
        {name}
      </button>
    </div>
  )
}

export default Button
