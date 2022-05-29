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
import JoinProjectModal from '../../../components/modals/join-project'

interface IProps {
  initialUser: IUser
}

const Home: NextPage<IProps> = ({ initialUser }) => {
  const [ready, setReady] = useState(false)
  const user = useClientStore((state) => state.user)
  const [isCreate, setIsCreate] = useState(false)
  const [isJoin, setIsJoin] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
  }, [initialUser])

  if (!ready) return <></>

  return (
    <Foundation title="Home">
      <Layout>
        <Header
          firstName={user.firstName[0].toUpperCase() + user.firstName.slice(1)}
          lastName={user.lastName[0].toUpperCase() + user.lastName.slice(1)}
          id={user.id}
        />
        <Main>
          <section>
            {/* Search , Buttons */}
            <div className="grid">
              <WhiteCard>
                <div className="flex items-center gap-2 mb-14">
                  <Icon icon={<SearchIcon />} />
                  <input
                    type="string"
                    className="w-full h-full py-2 pl-4 placeholder:text-typography placeholder:text-sm md:placeholder:text-md placeholder:opacity-30 outline-none"
                    placeholder="Search Project"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <SnowCard>
                  <div className="grid">
                    <div className="ml-auto flex items-center gap-2 md:gap-6">
                      <Button
                        name={'Join Project'}
                        color={'bg-blue'}
                        handler={() => setIsJoin(!isJoin)}
                      />
                      {/* {isJoin && (
                        <JoinProjectModal
                          handler={() => setIsJoin(!isJoin)}
                          // userId={user?.id}
                          // projectId={user?.members?.projectId}
                        />
                      )} */}

                      {isJoin && (
                        <JoinProjectModal handler={() => setIsJoin(!isJoin)} />
                      )}
                      <Button
                        name={'Create New Project'}
                        color={'bg-pink'}
                        handler={() => setIsCreate(!isCreate)}
                      />
                      {isCreate && (
                        <CreateProjectModal
                          handler={() => setIsCreate(!isCreate)}
                        />
                      )}
                    </div>
                  </div>
                </SnowCard>
              </WhiteCard>
            </div>

            {/* User Projects */}
            <div className="grid mt-10 gap-10">
              {/* projects count */}
              <h1>
                All ({' '}
                <span className="font-bold">
                  {user.members?.filter(({ active }) => active).length}
                </span>
                )
              </h1>
              {/* all users' project */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {searchInput === '' &&
                  user?.members
                    ?.filter((member) => {
                      return member.active === true
                    })
                    .map((member) => (
                      <Project key={member?.id} member={member} />
                    ))}
              </div>
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
              members: {
                include: {
                  user: true,
                  tasks: true,
                  files: true,
                  suggestions: true,
                  todos: true,
                },
              },
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
