import { MenuAlt1Icon, MenuIcon } from '@heroicons/react/outline'
import { GetServerSideProps, NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from '../../../../../../../components/button/button'
import SnowCard from '../../../../../../../components/card/snow-card'
import WhiteCard from '../../../../../../../components/card/white-card'
import Foundation from '../../../../../../../components/foundation'
import Header from '../../../../../../../components/header'
import Icon from '../../../../../../../components/icon/icon'
import Layout from '../../../../../../../components/layout'
import Linker from '../../../../../../../components/link/link'
import Main from '../../../../../../../components/main'
import CreateTodoModal from '../../../../../../../components/modals/create-todo'
import Sidebar from '../../../../../../../components/sidebar/sidebar'
import Todo from '../../../../../../../components/todo'
import {
  IMember,
  IProject,
  ITask,
  IUser,
} from '../../../../../../../library/schemas/interfaces'
import useClientStore from '../../../../../../../library/stores/client'
import objectified from '../../../../../../../library/utilities/objectified'
import phase from '../../../../../../../library/utilities/phase'
import prisma from '../../../../../../../library/utilities/prisma'
import EditTask from '../../edit/task'

interface IProps {
  initialUser: IUser
  initialMember: IMember
  initialProject: IProject
  initialTask: ITask
}

const Task: NextPage<IProps> = ({
  initialUser,
  initialMember,
  initialProject,
  initialTask,
}) => {
  const user = useClientStore((state) => state.user)
  const member = useClientStore((state) => state.member)
  const project = useClientStore((state) => state.project)
  const task = useClientStore((state) => state.task)
  const deleteTask = useClientStore((state) => state.delete.task)
  const completeTask = useClientStore((state) => state.update.task.over)
  const [ready, setReady] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenOption, setIsOpenOption] = useState(false)
  const [isCreate, setIsCreate] = useState(false)

  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.member(initialMember)
    useClientStore.getState().read.project(initialProject)
    useClientStore.getState().read.task(initialTask)
  }, [initialUser, initialMember, initialProject, initialTask])

  if (!ready) return <></>

  console.log('Dashboard Rendered')

  return (
    <Foundation title="Project Task">
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
              
              {/* task details */}
              <div className="grid">
                <WhiteCard>
                  <div className="grid gap-5">
                    {/* project name and option btn */}
                    <div className="grid grid-cols-[1fr,auto]">
                      <h1 className="md:font-lg font-semibold">{task.name}</h1>
                      <button onClick={() => setIsOpenOption(!isOpenOption)}>
                        <Icon icon={<MenuIcon />} />
                      </button>

                      {isOpenOption && (
                        <div className="absolute top-11 right-7 bg-white shadow-md shadow-violet grid z-50">
                          {/* Edit Task */}
                          <Linker
                            name={'Edit Task'}
                            link={`/connect/${user.id}/view/${member.id}/edit/task`}
                            style={
                              'py-4 px-8 hover:bg-snow transition-all duration-300'
                            }
                          />

                          {/* Set as done */}
                          {task.over === true ? (
                            <button
                              onClick={() =>
                                completeTask({
                                  id: task.id,
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
                                completeTask({
                                  id: task.id,
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

                          {/* Delete Task */}
                          <button
                            onClick={() => {
                              deleteTask({
                                id: task.id,
                              })
                              Router.push(
                                `/connect/${user.id}/view/${member.id}/dashboard`
                              )
                            }}
                          >
                            <Linker
                              name={'Delete Task'}
                              link={'#'}
                              style={
                                'py-4 px-8 hover:bg-snow transition-all duration-300'
                              }
                            />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* task description */}
                    <p className="leading-relaxed text-sm md:text-md font-light w-[90%] mb-28 lg:mb-16">
                      {task.description}
                    </p>
                  </div>

                  <SnowCard>
                    <div className="grid grid-cols-[1fr,auto] gap-2 md:gap-48 lg:gap-64 items-center">
                      <div className="flex gap-10 items-center">
                        {/* start and due date */}
                        <div className="text-sm tracking-wide">
                          {String(phase(task.createdAt, 'LL'))} -{' '}
                          {String(phase(task.dueAt, 'LL'))}
                        </div>

                        {/* completeness */}
                        {String(phase(new Date(), 'LL')) >
                        String(phase(task?.dueAt, 'LL')) ? (
                          <h1 className="text-red-600 font-bold tracking-wide">
                            Overdue
                          </h1>
                        ) : (
                          <div>
                            {task!.over === true ? (
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
                      {/* Create Todo Button */}
                      <Button
                        name={'Create New Todo'}
                        color={'bg-pink'}
                        handler={() => setIsCreate(!isCreate)}
                      />

                      {isCreate && (
                        <CreateTodoModal
                          handler={() => setIsCreate(false)}
                          taskId={task.id}
                        />
                      )}
                    </div>
                  </SnowCard>
                </WhiteCard>
              </div>

              {/* Task Todos */}
              <div className="grid mt-5 gap-10">
                {/* todos count*/}
                <h1>
                  All (<span className="font-bold">{task.todos!.length}</span>)
                </h1>
                {/* all task todos */}
                <div className="grid gap-3">
                  {task.todos?.map((todo, index) => (
                    <Todo key={todo.id} todo={todo} index={index + 1} />
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

export default Task

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(query!.userId) },
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
    where: { id: String(query!.memberId) },
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
          member: {
            include: {
              user: true,
            },
          },
        },
      },
      suggestions: true,
      files: true,
      announcements: true,
    },
  })

  const task = await prisma.task.findUnique({
    where: { id: String(query!.taskId) },
    include: {
      todos: true,
    },
  })

  return {
    props: {
      initialUser: objectified(user),
      initialMember: objectified(member),
      initialProject: objectified(project),
      initialTask: objectified(task),
    },
  }
}
