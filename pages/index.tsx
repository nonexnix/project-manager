import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session!.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <div className="h-screen bg-white grid grid-rows-[1fr,auto] relative bg-[url('/images/bg.jpg')] bg-no-repeat">
      {/* headings */}
      <div className="grid grid-rows-[1fr,auto] gap-2 max-w-3xl h-96 my-auto ml-20">
        <div className="relative">
          <Image src="/images/heading.png" layout="fill" objectFit="contain" />
        </div>

        {/* button */}
        <button onClick={() => signIn('google')} className="w-96 h-32 relative hover:-translate-y-1 transition-all duration-500 cursor-pointer">
          <Image src="/images/button.png" layout="fill" objectFit="contain" />
        </button>
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
