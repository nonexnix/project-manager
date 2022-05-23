import Link from 'next/link'

interface IProps {
  name: string
  link: any
  style ? : string
}
const Linker = ({ name, link, style }: IProps) => {
  return (
    <Link href={link}>
      <div className={`text-sm md:text-md whitespace-nowrap grid items-center cursor-pointer z-50 ${style}`}>
          {name}
      </div>
    </Link>
  )
}

export default Linker
