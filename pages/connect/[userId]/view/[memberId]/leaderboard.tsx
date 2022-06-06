import { MenuAlt1Icon } from '@heroicons/react/outline'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import Foundation from '../../../../../components/foundation'
import Header from '../../../../../components/header'
import Icon from '../../../../../components/icon/icon'
import Layout from '../../../../../components/layout'
import Rank from '../../../../../components/leaderboard/rank'
import Ranks from '../../../../../components/leaderboard/ranks'
import TopRank from '../../../../../components/leaderboard/top-rank'
import TopRanks from '../../../../../components/leaderboard/top-ranks'
import Main from '../../../../../components/main'
import Sidebar from '../../../../../components/sidebar/sidebar'
import {
  IMember,
  IProject,
  IUser,
} from '../../../../../library/schemas/interfaces'
import useClientStore from '../../../../../library/stores/client'
import objectified from '../../../../../library/utilities/objectified'
import prisma from '../../../../../library/utilities/prisma'

interface IProps {
  initialUser: IUser
  initialProject: IProject
  initialMember: IMember
}

const Leaderboard: NextPage<IProps> = ({
  initialUser,
  initialMember,
  initialProject,
}) => {
  const [ready, setReady] = useState(false)
  const user = useClientStore((state) => state.user)
  const project = useClientStore((state) => state.project)
  const member = useClientStore((state) => state.member)
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.member(initialMember)
    useClientStore.getState().read.project(initialProject)
  }, [initialMember, initialProject])

  if (!ready) return <></>

  return (
    <Foundation title="Project Leaderboard">
      <Layout>
        <Header
          firstName={user.firstName[0].toUpperCase() + user.firstName.slice(1)}
          lastName={user.lastName[0].toUpperCase() + user.lastName.slice(1)}
          id={user.id}
        />
        <Main>
          <section>
            <div className="max-w-7xl mx-auto full grid gap-20">
              <div className="grid grid-cols-[auto,1fr] gap-6 items-start">
                {/* sidebar */}
                <div className="grid relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative"
                  >
                    <Icon icon={<MenuAlt1Icon />} />
                  </button>

                  {/* side bar */}
                  {isOpen && <Sidebar userId={user.id} memberId={member.id} />}
                </div>

                {/* top ranks and title */}
                <div className="grid gap-8">
                  <h1 className="text-lg text-center font-semibold tracking-wide">
                    Team Top Contributors
                  </h1>
                  
                  {/* top ranks */}
                  <TopRanks members={project.members!}/>
                </div>
              </div>

              {/* ranks */}
              <div className="grid gap-3">
                <Ranks members={project.members!}/>
              </div>
            </div>
          </section>
        </Main>
      </Layout>
    </Foundation>
  )
}

export default Leaderboard

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
