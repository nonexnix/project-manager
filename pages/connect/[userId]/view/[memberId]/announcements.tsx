import prisma from '../../../../../library/utilities/prisma'
import Foundation from '../../../../../components/foundation'
import Header from '../../../../../components/header'
import Layout from '../../../../../components/layout'
import Main from '../../../../../components/main'
import useClientStore from '../../../../../library/stores/client'
import objectified from '../../../../../library/utilities/objectified'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import {
  IMember,
  IProject,
  IUser,
} from '../../../../../library/schemas/interfaces'
import { useEffect, useState } from 'react'
import Button from '../../../../../components/button/button'
import Announcement from '../../../../../components/announcement/announcement'
import { MenuAlt1Icon } from '@heroicons/react/outline'
import Icon from '../../../../../components/icon/icon'
import Sidebar from '../../../../../components/sidebar/sidebar'
import PostAnnouncement from '../../../../../components/modals/post-announcement'
import phase from '../../../../../library/utilities/phase'

interface IProps {
  initialUser: IUser
  initialProject: IProject
  initialMember: IMember
}

const Announcements: NextPage<IProps> = ({
  initialUser,
  initialMember,
  initialProject,
}) => {
  const [ready, setReady] = useState(false)
  const user = useClientStore((state) => state.user)
  const project = useClientStore((state) => state.project)
  const member = useClientStore((state) => state.member)
  const [isOpen, setIsOpen] = useState(false)
  const [isPost, setIsPost] = useState(false)


  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.member(initialMember)
    useClientStore.getState().read.project(initialProject)
  }, [initialMember, initialProject])

  if (!ready) return <></>

  console.log(user)

  return (
    <Foundation title="Project Announcements">
      <Layout>
        <Header
          firstName={user.firstName[0].toUpperCase() + user.firstName.slice(1)}
          lastName={user.lastName[0].toUpperCase() + user.lastName.slice(1)}
        />
        <Main>
          <section>
            <div className="max-w-7xl mx-auto full grid gap-20">

              <div className='grid grid-cols-[1fr,auto] items-center'>
                {/* sidebar */}
                <div className="grid relative">
                  <button onClick={() => setIsOpen(!isOpen)} className="relative">
                    <Icon icon={<MenuAlt1Icon />} />
                  </button>

                  {/* side bar */}
                  {isOpen && <Sidebar userId={user.id} memberId={member.id} />}
                </div>

                {/* post button */}
                <Button name={"Post Announcement"} color={'bg-pink'} handler={() => setIsPost(!isPost)}/>
                {isPost && <PostAnnouncement memberId={member.id} projectId={project.id} handler={() => setIsPost(false)}/>}
              </div>

              {/* announcements */}
              <div className='h-full grid gap-3'>
                {project?.announcements?.map((announcement) => (
                  <Announcement key={announcement.id} name={announcement.name} description={announcement.description} id={announcement.id} date={String(phase(announcement.createdAt, 'LL'))}/>
                ))}
              </div>
            </div>
          </section>
        </Main>
      </Layout>
    </Foundation>
  )
}

export default Announcements

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
