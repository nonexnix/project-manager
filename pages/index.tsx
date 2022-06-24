import { ArrowRightIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { IUser } from '../library/schemas/interfaces'
import useClientStore from '../library/stores/client'
import objectified from '../library/utilities/objectified'

interface IProps {
  user: IUser
}

export default function Component({ user }: IProps) {
  const { data: session } = useSession()
  console.log(user)
  return (
    <div className="h-screen bg-white grid grid-rows-[1fr,auto] relative bg-[url('/images/bg.jpg')] bg-no-repeat">
      {/* headings */}
      <div className="grid grid-rows-[1fr,auto] gap-2 max-w-3xl h-96 my-auto ml-20">
        <div className="relative">
          <Image src="/images/heading.png" layout="fill" objectFit="contain" />
        </div>

        {/* button */}
        {!session ? (
          <button
            onClick={() => signIn('google')}
            className="w-96 h-32 relative hover:-translate-y-1 transition-all duration-500 cursor-pointer"
          >
            <Image src="/images/button.png" layout="fill" objectFit="contain" />
          </button>
        ) : (
          <Link href={`/connect/${user.id}`}>
            <a className="bg-white rounded-md flex items-center gap-5">
              <span className="text-2xl font-semibold">GO TO DASHBOARD</span>
              <ArrowRightIcon className="w-8 h-8 text-[#0099FF]" />
            </a>
          </Link>
        )}
      </div>

      {/* ellipses */}
      <div className="z-50 flex gap-3 justify-items-center items-center m-auto mb-10">
        <button className="rounded-full w-5 h-5 border-2 border-gray-300 bg-white hover:bg-[#0099FF] transition-all duration-300 cursor-pointer"></button>
        <button className="rounded-full w-5 h-5 border-2 border-gray-300 bg-white hover:bg-[#0099FF] transition-all duration-300 cursor-pointer"></button>
        <button className="rounded-full w-5 h-5 border-2 border-gray-300 bg-white hover:bg-[#0099FF] transition-all duration-300 cursor-pointer"></button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if(!session) {
    return {
      props: {
        session
      }
    }
  }
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email?.toString()},
  })

  return {
    props: {
      session,
      user:objectified(user),
    },
  }
}
