import { CalendarIcon, MenuAlt1Icon } from '@heroicons/react/outline'
import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Button from '../../../../../../components/button/button'
import Foundation from '../../../../../../components/foundation'
import Header from '../../../../../../components/header'
import Icon from '../../../../../../components/icon/icon'
import Layout from '../../../../../../components/layout'
import Main from '../../../../../../components/main'
import Sidebar from '../../../../../../components/sidebar/sidebar'
import useClientStore from '../../../../../../library/stores/client'
import phase from '../../../../../../library/utilities/phase'
import EditTextField from '../../../../../../components/edit-input-field'
import useFieldStore from '../../../../../../library/stores/field'
import { IMember, IProject, IUser } from '../../../../../../library/schemas/interfaces'
import objectified from '../../../../../../library/utilities/objectified'
import Member from '../../../../../../components/members/member'

interface IProps {
  initialUser: IUser
  initialMember: IMember
  initialProject: IProject
}

const EditTask: NextPage<IProps> = ({
  initialUser,
  initialMember,
  initialProject,
}) => {
  const user = useClientStore((state) => state.user)
  const member = useClientStore((state) => state.member)
  const project = useClientStore((state) => state.project)
  const [ready, setReady] = useState(false)
  const taskField = useFieldStore((state) => state.task)
  const updateTaskName = useClientStore((state) => state.update.task.name)
  const updateTaskDue = useClientStore((state) => state.update.task.dueAt)
  const updateTaskDescription = useClientStore(
    (state) => state.update.project.description
  )
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.member(initialMember)
    useClientStore.getState().read.project(initialProject)
  }, [initialUser, initialMember, initialProject])

  if (!ready) return <></>


  return (
    <Foundation title="Project Task">
      <Layout>
        <Header
          firstName={user.firstName[0].toUpperCase() + user.firstName.slice(1)}
          lastName={user.lastName[0].toUpperCase() + user.lastName.slice(1)}
          id={user.id}
        />
        <Main>
          <section className="bg-snow grid gap-5 max-w-7xl mx-auto">
            {project.tasks!.map((task) => (
            <div key={task.id} className="grid gap-10">
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
                  taskField.set({
                    ...taskField.value,
                    name: e.target.value,
                  })
                }
                btnLabel={'Save'}
                defaultText={task.name}
                btnHandler={() =>
                  updateTaskName({
                    id: task.id,
                    key: 'name',
                    value: taskField.value.name,
                  })
                }
              />

              {/* edit project description */}
              <EditTextField
                inputLabel={'Description'}
                inputType={'textarea'}
                onChange={(e: any) =>
                  taskField.set({
                    ...taskField.value,
                    description: e.target.value,
                  })
                }
                btnLabel={'Save'}
                defaultText={task.description}
                btnHandler={() =>
                  updateTaskDescription({
                    id: task.id,
                    key: 'description',
                    value: taskField.value.description,
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
                      type="date"
                      className="relative bg-white py-3 pl-6 outline-none w-[80%]"
                      defaultValue={String(
                        phase(taskField.value.dueAt, 'LL')
                      )}
                      onChange={(e) =>
                        taskField.set({
                          ...taskField.value,
                          dueAt: e.target.value,
                        })
                      }
                    />
                    <Icon icon={<CalendarIcon />} />
                  </div>

                  <Button
                    name="Save"
                    color="bg-blue"
                    handler={() =>
                      updateTaskDue({
                        id: task.id,
                        key: 'dueAt',
                        value: String(phase(taskField.value.dueAt)),
                      })
                    }
                  />
                </div>
              </div>

              {/* Edit task members */}
              {/* <div className="grid gap-3">
                <h1 className="text-sm tracking-wide text-gray-500">Members</h1>

                <div className="grid grid-cols-2 grid-rows-6 bg-white w-full py-4 px-6 overflow-y-scroll">
                  {task.participants?.map((participant) => (
                    <Member
                      key={participant.id}
                      firstName={
                        participant.member!.user!.firstName[0].toUpperCase() +
                        participant.member!.user!.firstName.slice(1)
                      }
                      lastName={
                        participant.member!.user!.firstName[0].toUpperCase() +
                        participant.member!.user!.firstName.slice(1)
                      }
                      handler={() =>
                        updateParticipants({
                          id: participant.member!.id,
                          key: 'active',
                          value: false,
                        })
                      }
                    />
                  ))}
                </div>
              </div> */}
            </div>
            ))}
          </section>
        </Main>
      </Layout>
    </Foundation>
  )
}

export default EditTask


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
              user:true
            }
          }
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
  }
}