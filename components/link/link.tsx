import Link from 'next/link'

interface IProps {
  name: string
  link: any
}
const Linker = ({ name, link }: IProps) => {
  return (
    <Link href={link}>
      <a className="text-sm md:text-md whitespace-nowrap">
        {name}
      </a>
    </Link>
  )
}

export default Linker
