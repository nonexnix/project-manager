import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import Chatbox from '../../../../../components/chatbox'
import Header from '../../../../../components/header'
import Layout from '../../../../../components/layout'
import Main from '../../../../../components/main'
import type {
  IMember,
  IMessage,
  IProject,
  IUser,
} from '../../../../../library/schemas/interfaces'
import useClientStore from '../../../../../library/stores/client'
import objectified from '../../../../../library/utilities/objectified'
import prisma from '../../../../../library/utilities/prisma'
import Foundation from '../../../../../components/foundation'
import Icon from '../../../../../components/icon/icon'
import {
  CollectionIcon,
  FolderOpenIcon,
  LightBulbIcon,
  MenuAlt1Icon,
  MenuIcon,
  SpeakerphoneIcon,
} from '@heroicons/react/outline'
import Linker from '../../../../../components/link/link'
import SnowCard from '../../../../../components/card/snow-card'
import WhiteCard from '../../../../../components/card/white-card'
import IconLabel from '../../../../../components/icon/icon-with-label'
import Button from '../../../../../components/button/button'
import Task from '../../../../../components/task/task'
import CreateTaskModal from '../../../../../components/modals/create-task'
import ProjectCodeModal from '../../../../../components/modals/copy-code'
import phase from '../../../../../library/utilities/phase'
import Router, { useRouter } from 'next/router'
import Sidebar from '../../../../../components/sidebar/sidebar'
import GivePermission from '../../../../../components/modals/create-authorization'
import CreateRoleModal from '../../../../../components/modals/create-role'

interface IProps {
  initialUser: IUser
  initialMember: IMember
  initialProject: IProject
  initialMessages: IMessage[]
}

const Dashboard: NextPage<IProps> = ({
  initialUser,
  initialMember,
  initialProject,
  initialMessages,
}) => {
  const user = useClientStore((state) => state.user)
  const member = useClientStore((state) => state.member)
  const project = useClientStore((state) => state.project)
  const deleteProject = useClientStore((state) => state.delete.project)
  const completeProject = useClientStore((state) => state.update.project.over)
  const updateMembership = useClientStore(
    (state) => state.update.member?.active
  )
  const [ready, setReady] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenOption, setIsOpenOption] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [copyCode, setCopyCode] = useState(false)
  const [createRole, setCreateRole] = useState(false)

  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.member(initialMember)
    useClientStore.getState().read.project(initialProject)
    useClientStore.getState().read.messages(initialMessages)
  }, [initialUser, initialMember, initialProject, initialMessages])

  if (!ready) return <></>

  console.log('Dashboard Rendered')

  const handleLeaveProject = () => {
    member?.active === !member.active
  }

  return (
    <Foundation title="Dashboard">
      <Layout>
        <Header
          fullname={user.name} image={user.image} id={user.id}
        />
        <Main>
          <section>
            <div className="grid gap-5 relative">
              <button onClick={() => setIsOpen(!isOpen)}>
                <Icon icon={<MenuAlt1Icon />} />
              </button>

              {/* side bar */}
              {isOpen && <Sidebar userId={user.id} memberId={member.id} />}

              {/* project details */}
              <div className="grid">
                <WhiteCard>
                  <div className="grid gap-5">
                    {/* project name and option btn */}
                    <div className="grid grid-cols-[1fr,auto]">
                      <h1 className="md:font-lg font-semibold">
                        {project?.name}
                      </h1>
                      <button onClick={() => setIsOpenOption(!isOpenOption)}>
                        <Icon icon={<MenuIcon />} />
                      </button>

                      {isOpenOption && (
                        <div className="absolute top-11 right-7 bg-white shadow-md shadow-violet grid z-50">
                          {/* Edit Project */}
                          <Linker
                            name={'Edit Project'}
                            link={`/connect/${user.id}/view/${member.id}/edit/project`}
                            style={
                              'py-4 px-8 hover:bg-snow transition-all duration-300'
                            }
                          />

                          {/* Set as done */}
                          {project.over === true ? (
                            <button
                              onClick={() =>
                                completeProject({
                                  id: project.id,
                                  key: 'over',
                                  value: false,
                                })
                              }
                            >
                              <Linker
                                name={'Set as Incomplete'}
                                link={'#'}
                                style={
                                  'py-4 px-8 hover:bg-snow transition-all duration-300'
                                }
                              />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                completeProject({
                                  id: project.id,
                                  key: 'over',
                                  value: true,
                                })
                              }
                            >
                              <Linker
                                name={'Set as Done'}
                                link={'#'}
                                style={
                                  'py-4 px-8 hover:bg-snow transition-all duration-300'
                                }
                              />
                            </button>
                          )}

                          {/* Copy */}
                          <button onClick={() => setCopyCode(!copyCode)}>
                            <Linker
                              name={'Copy Code'}
                              link={'#'}
                              style={
                                'py-4 px-8 hover:bg-snow transition-all duration-300'
                              }
                            />
                          </button>
                          {copyCode && (
                            <ProjectCodeModal
                              handler={() => setCopyCode(!copyCode)}
                              code={project?.code}
                            />
                          )}

                          {/* create role */}
                          <button onClick={() => setCreateRole(!createRole)}>
                            <Linker
                              name={'Add Role'}
                              link={'#'}
                              style={
                                'py-4 px-8 hover:bg-snow transition-all duration-300'
                              }
                            />
                          </button>

                          {createRole && (
                            <CreateRoleModal
                              handler={() => setCreateRole(!createRole)}
                              projectId={project.id}
                            />
                          )}

                          {/* Delete Project */}
                          <button
                            onClick={() => {
                              deleteProject({ id: project?.id })
                              Router.push(`/connect/${user.id}`)
                            }}
                          >
                            <Linker
                              name={'Delete Project'}
                              link={'#'}
                              style={
                                'py-4 px-8 hover:bg-snow transition-all duration-300'
                              }
                            />
                          </button>

                          {/* Leave Project */}
                          <button
                            onClick={() => {
                              updateMembership({
                                id: member?.id,
                                key: 'active',
                                value: false,
                              })
                              Router.push(`/connect/${user.id}`)
                            }}
                          >
                            <Linker
                              name={'Leave Project'}
                              link={'#'}
                              style={
                                'py-4 px-8 hover:bg-snow transition-all duration-300'
                              }
                            />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* project description */}
                    <p className="leading-relaxed text-sm md:text-md font-light w-[90%]">
                      {project?.description}
                    </p>

                    {/* user's contribution and copy code */}
                    <div className="flex gap-10 items-center mb-20 lg:mb-16">
                      <IconLabel
                        icon={<CollectionIcon />}
                        label={project?.tasks?.length}
                      />
                      <IconLabel
                        icon={<FolderOpenIcon />}
                        label={project?.files?.length}
                      />
                      <IconLabel
                        icon={<SpeakerphoneIcon />}
                        label={project?.announcements?.length}
                      />
                      <IconLabel
                        icon={<LightBulbIcon />}
                        label={project?.suggestions?.length}
                      />
                    </div>
                  </div>
                  <SnowCard>
                    <div className="grid grid-cols-[1fr,auto] gap-2 md:gap-48 lg:gap-64 items-center">
                      <div className="flex gap-10 items-center">
                        {/* start and due date */}
                        <div className="text-sm tracking-wide">
                          {String(phase(initialProject?.createdAt, 'LL'))} -{' '}
                          {String(phase(initialProject?.dueAt, 'LL'))}
                        </div>
                        {/* completeness */}
                        {String(phase(new Date(), 'LL')) >
                        String(phase(initialProject?.dueAt, 'LL')) ? (
                          <h1 className="text-red-600 font-bold tracking-wide">
                            Overdue
                          </h1>
                        ) : (
                          <div>
                            {project!.over === true ? (
                              <h1 className="text-green-600 font-bold tracking-wide">
                                Completed
                              </h1>
                            ) : (
                              <h1 className="text-red-600 font-bold tracking-wide">
                                Incomplete
                              </h1>
                            )}
                          </div>
                        )}
                      </div>
                      {/* Create Task Button */}
                      <Button
                        name={'Create New Task'}
                        color={'bg-pink'}
                        handler={() => setIsCreate(!isCreate)}
                      />

                      {isCreate && (
                        <CreateTaskModal
                          handler={() => setIsCreate(!isCreate)}
                        />
                      )}
                    </div>
                  </SnowCard>
                </WhiteCard>
              </div>

              {/* Project Tasks */}
              <div className="grid mt-5 gap-10">
                {/* tasks count*/}
                <h1>
                  All (
                  <span className="font-bold">
                    {initialProject?.tasks?.length}
                  </span>
                  )
                </h1>

                <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,auto] gap-10 items-center text-sm tracking-wide font-semibold">
                  <h1>No.</h1>
                  <h1>Title</h1>
                  <h1>Participants</h1>
                  <h1 className="text-center">Priority</h1>
                  <h1>Due Date</h1>
                  <h1>Completeness</h1>
                </div>
                {/* all users' project */}
                <div className="grid gap-3">
                  {project?.tasks?.map((task, index) => (
                    <Task
                      task={task}
                      index={index + 1}
                      userId={user.id}
                      memberId={member.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Main>
        {/* <Chatbox /> */}
      </Layout>
    </Foundation>
  )
}

export default Dashboard

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

  const messages = await prisma.message.findMany({
    where: { projectId: member!.projectId },
  })

  return {
    props: {
      initialUser: objectified(user),
      initialMember: objectified(member),
      initialProject: objectified(project),
      initialMessages: objectified(messages),
    },
    revalidate: 1,
  }
}
