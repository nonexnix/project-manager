import { MenuAlt1Icon, SearchIcon } from '@heroicons/react/outline'
import prisma from '../../../../../library/utilities/prisma'
import WhiteCard from '../../../../../components/card/white-card'
import Foundation from '../../../../../components/foundation'
import Header from '../../../../../components/header'
import Icon from '../../../../../components/icon/icon'
import Layout from '../../../../../components/layout'
import Main from '../../../../../components/main'
import useClientStore from '../../../../../library/stores/client'
import objectified from '../../../../../library/utilities/objectified'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { IMember, IProject, IUser } from '../../../../../library/schemas/interfaces'
import { useEffect, useState } from 'react'
import Sidebar from '../../../../../components/sidebar/sidebar'
import File from '../../../../../components/file/file'

interface IProps {
  initialUser: IUser
  initialProject: IProject
  initialMember: IMember
}

const Files: NextPage<IProps> = ({ initialUser, initialMember, initialProject }) => {
  const [ready, setReady] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const user = useClientStore((state) => state.user)
  const project = useClientStore((state) => state.project)
  const member = useClientStore((state) => state.member)

  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.member(initialMember)
    useClientStore.getState().read.project(initialProject)
  }, [initialMember, initialProject])

  if (!ready) return <></>

  return (
    <Foundation title="Project Files">
      <Layout>
        <Header
          firstName={user.firstName[0].toUpperCase() + user.firstName.slice(1)}
          lastName={user.lastName[0].toUpperCase() + user.lastName.slice(1)}
        />
        <Main>
          <section>
            <div className="grid gap-10">
              {/* Search */}
              <WhiteCard>
                <div className="flex items-center gap-2">
                  <Icon icon={<SearchIcon />} />
                  <input
                    type="string"
                    className="w-full h-full py-2 pl-4 placeholder:text-typography placeholder:text-sm md:placeholder:text-md placeholder:opacity-30 outline-none"
                    placeholder="Search Files"
                  />
                </div>
              </WhiteCard>

              {/* sidebar */}
              <div className="grid relative">
                <button onClick={() => setIsOpen(!isOpen)} className="relative">
                  <Icon icon={<MenuAlt1Icon />} />
                </button>

                {/* side bar */}
                {isOpen && <Sidebar userId={user.id} memberId={member.id} />}
              </div>

              {/* member counts */}
              <h1>
                All (<span className="font-bold">{project?.files?.length}</span>
                )
              </h1>

              {/* project members */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                <File/>
              </div>
            </div>
          </section>
        </Main>
      </Layout>
    </Foundation>
  )
}

export default Files

export const getStaticPaths: GetStaticPaths = async () => {
  const members = await prisma.member.findMany()

  const paths = members.map((member) => {
    return {
      params: { userId: member.userId, memberId: member.id },
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

  const member = await prisma.member.findUnique({
    where: { id: String(params!.memberId) },
  })

  const project = await prisma.project.findUnique({
    where: { id: member?.projectId },
    include: {
      members: {
        include: {
          user: true,
          authorizations: {
            include: {
              role: true,
            },
          },
        },
      },
      tasks: {
        include: {
          todos: true,
        },
      },
      suggestions: true,
      files: true,
      announcements: true,
    },
  })

  return {
    props: {
      initialUser: objectified(user),
      initialMember: objectified(member),
      initialProject: objectified(project),
    },
    revalidate: 1,
  }
}
