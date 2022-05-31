import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import Foundation from '../../../../../../components/foundation'
import Header from '../../../../../../components/header'
import Layout from '../../../../../../components/layout'
import Main from '../../../../../../components/main'
import {
  IMember,
  IProject,
  IUser,
} from '../../../../../../library/schemas/interfaces'
import useClientStore from '../../../../../../library/stores/client'
import objectified from '../../../../../../library/utilities/objectified'
import prisma from '../../../../../../../vision-main/library/utilities/prisma'
import useFieldStore from '../../../../../../library/stores/field'
import Button from '../../../../../../components/button/button'
import Link from 'next/link'
import EditTextField from '../../../../../../components/edit-input-field'
import Icon from '../../../../../../components/icon/icon'
import { CalendarIcon, MenuAlt1Icon } from '@heroicons/react/outline'
import phase from '../../../../../../library/utilities/phase'
import Member from '../../../../../../components/members/delete-member'
import Roles from '../../../../../../components/role/roles'
import Sidebar from '../../../../../../components/sidebar/sidebar'

interface IProps {
  initialUser: IUser
  initialMember: IMember
  initialProject: IProject
}

const EditProject: NextPage<IProps> = ({
  initialUser,
  initialMember,
  initialProject,
}) => {
  const user = useClientStore((state) => state.user)
  const member = useClientStore((state) => state.member)
  const project = useClientStore((state) => state.project)
  const projectField = useFieldStore((state) => state.project)
  const updateProjectName = useClientStore((state) => state.update.project.name)
  const updateProjectDescription = useClientStore(
    (state) => state.update.project.description
  )
  const updateProjectDue = useClientStore((state) => state.update.project.dueAt)
  const updateMember = useClientStore((state) => state.update.member.active)
  const [ready, setReady] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.member(initialMember)
    useClientStore.getState().read.project(initialProject)
  }, [initialUser, initialMember, initialProject])

  if (!ready) return <></>

  console.log(project)

  return (
    <Foundation title="Dashboard">
      <Layout>
        <Header
          firstName={user.firstName[0].toUpperCase() + user.firstName.slice(1)}
          lastName={user.lastName[0].toUpperCase() + user.lastName.slice(1)}
          id={user.id}
        />
        <Main>
          <section className="bg-snow grid gap-5 max-w-7xl mx-auto">
            <div className="grid gap-10">
              {/* sidebar */}
              <div className="grid relative">
                <button onClick={() => setIsOpen(!isOpen)} className="relative">
                  <Icon icon={<MenuAlt1Icon />} />
                </button>

                {/* side bar */}
                {isOpen && <Sidebar userId={user.id} memberId={member.id} />}
              </div>

              {/* edit name */}
              <EditTextField
                inputLabel={'Name'}
                inputType={'input'}
                onChange={(e: any) =>
                  projectField.set({
                    ...projectField.value,
                    name: e.target.value,
                  })
                }
                btnLabel={'Save'}
                defaultText={project.name}
                btnHandler={() =>
                  updateProjectName({
                    id: project.id,
                    key: 'name',
                    value: projectField.value.name,
                  })
                }
              />

              {/* edit project description */}
              <EditTextField
                inputLabel={'Description'}
                inputType={'textarea'}
                onChange={(e: any) =>
                  projectField.set({
                    ...projectField.value,
                    description: e.target.value,
                  })
                }
                btnLabel={'Save'}
                defaultText={project.description}
                btnHandler={() =>
                  updateProjectDescription({
                    id: project.id,
                    key: 'description',
                    value: projectField.value.description,
                  })
                }
              />

              {/* edit project date */}
              <div className="grid gap-3">
                <h1 className="text-sm tracking-wide text-gray-500">
                  Due Date
                </h1>

                <div className="grid grid-cols-[1fr,auto] items-center gap-10">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      className="relative bg-white py-3 pl-6 outline-none w-[80%]"
                      defaultValue={String(phase(project.dueAt, 'LL'))}
                      onChange={(e) =>
                        projectField.set({
                          ...projectField.value,
                          dueAt: e.target.value,
                        })
                      }
                    />
                    <Icon icon={<CalendarIcon />} />
                  </div>

                  <Button
                    name={'Save'}
                    color={'bg-blue'}
                    handler={() =>
                      updateProjectDue({
                        id: project.id,
                        key: 'dueAt',
                        value: 'projectField.value.dueAt',
                      })
                    }
                  />
                </div>
              </div>

              {/* Edit project members */}
              <div className="grid gap-3">
                <h1 className="text-sm tracking-wide text-gray-500">Members</h1>

                <div className="grid grid-cols-2 grid-rows-6 bg-white w-full py-4 px-6 overflow-y-scroll">
                  {project.members?.map((member) => (
                    <Member
                      key={member.id}
                      firstName={
                        member!.user!.firstName[0].toUpperCase() +
                        member!.user!.firstName.slice(1)
                      }
                      lastName={
                        member!.user!.lastName[0].toUpperCase() +
                        member!.user!.lastName.slice(1)
                      }
                      handler={() =>
                        updateMember({
                          id: member.id,
                          key: 'active',
                          value: false,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Main>
      </Layout>
    </Foundation>
  )
}

export default EditProject

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
    include: {
      authorizations: {
        include: {
          role: true,
        },
      },
      user: true,
    },
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
      roles: true,
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
