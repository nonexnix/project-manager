import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import type { IUser } from '../../../library/schemas/interfaces'
import useClientStore from '../../../library/stores/client'
import objectified from '../../../library/utilities/objectified'
import prisma from '../../../library/utilities/prisma'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import Main from '../../../components/main'
import Foundation from '../../../components/foundation'
import WhiteCard from '../../../components/card/white-card'
import SnowCard from '../../../components/card/snow-card'
import Icon from '../../../components/icon/icon'
import { SearchIcon } from '@heroicons/react/outline'
import Button from '../../../components/button/button'
import Project from '../../../components/project/project'
import CreateProjectModal from '../../../components/modals/create-project'

interface IProps {
  initialUser: IUser
}

const Home: NextPage<IProps> = ({ initialUser }) => {
  const [ready, setReady] = useState(false)
  const user = useClientStore((state) => state.user)

  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
  }, [initialUser])

  if (!ready) return <></>

  console.log(user)

  return (
    <Foundation title="Home">
      <Layout>
        <Header />
        <Main>
          <section>
            {/* Search , Buttons */}
            <div className="grid">
              <WhiteCard>
                <div className="flex items-center gap-2">
                  <Icon icon={<SearchIcon />} />
                  <input
                    type="string"
                    className="w-full h-full py-2 pl-4 placeholder:text-typography placeholder:text-sm md:placeholder:text-md placeholder:opacity-30 outline-none"
                    placeholder="Search Project"
                  />
                </div>
                <SnowCard>
                  <div className='grid'>
                    <div className='ml-auto flex items-center gap-2 md:gap-6'>
                      <Button name={'Join Project'} color={'blue'}/>
                      <Button name={'Create New Project'} color={'pink'}/>
                    </div>
                  </div>
                </SnowCard>
              </WhiteCard>
            </div>

            {/* User Projects */}

            <div className='grid mt-10 gap-10'>
              <h1>All ( <span className='font-bold'>{user.members?.length}</span> )</h1>

              <div className='grid grid-cols-2 md:grid-cols-3 items-center'>
                {user.members?.map((member) => (
                  <div key={member.id}>
                    <Project/>
                  </div>
                ))}
              </div>

              <CreateProjectModal/>
            </div>
          </section>
        </Main>
      </Layout>
    </Foundation>
  )
}

export default Home

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany()

  const paths = users.map((user) => {
    return {
      params: { userId: user.id },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(params!.userId) },
    include: {
      members: {
        include: {
          _count: { select: { tasks: true } },
          project: {
            include: {
              _count: { select: { members: true, tasks: true } },
            },
          },
        },
      },
    },
  })

  return {
    props: {
      initialUser: objectified(user),
    },
    revalidate: 1,
  }
}
