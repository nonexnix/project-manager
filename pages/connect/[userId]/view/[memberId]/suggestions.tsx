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
import Suggestion from '../../../../../components/suggestion/suggestion'
import useFieldStore from '../../../../../library/stores/field'

interface IProps {
  initialUser: IUser
  initialProject: IProject
  initialMember: IMember
}

const Suggestions: NextPage<IProps> = ({
  initialUser,
  initialMember,
  initialProject,
}) => {
  const [ready, setReady] = useState(false)
  const user = useClientStore((state) => state.user)
  const project = useClientStore((state) => state.project)
  const member = useClientStore((state) => state.member)
  const [isOpen, setIsOpen] = useState(false)
  const suggestionField = useFieldStore((state) => state.suggestion)
  const postSuggestion = useClientStore((state) => state.create.suggestion)

  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.member(initialMember)
    useClientStore.getState().read.project(initialProject)
  }, [initialMember, initialProject])

  if (!ready) return <></>

  const handlePostSubmission = () => {
    postSuggestion({
      name: suggestionField.value.name,
      description: suggestionField.value.description,
      memberId: member.id,
      projectId: project.id,
    })

    suggestionField.clear()
  
    console.log('description ' + suggestionField.value.description)
    console.log('title ' + suggestionField.value.name)
  }

  return (
    <Foundation title="Project Suggestions">
      <Layout>
        <Header
          firstName={user.firstName[0].toUpperCase() + user.firstName.slice(1)}
          lastName={user.lastName[0].toUpperCase() + user.lastName.slice(1)}
          id={user.id}
        />
        <Main>
          <section>
            <div className="max-w-7xl mx-auto full grid gap-20">
              <div className="grid gap-5">
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

                {/* post */}
                <div className="grid gap-5 bg-white py-5 px-8">
                  <input
                    type="text"
                    placeholder={"Enter Suggestion Title"}
                    className="border-none bg-white py-2 pl-2 outline-none focus-none"
                    value={suggestionField.value.name}
                    onChange={(e) =>
                      suggestionField.set({
                        ...suggestionField.value,
                        name: e.target.value,
                      })
                    }
                  />
                  <textarea
                    placeholder={"What are you suggesting?"}
                    className="border-none bg-white py-2 pl-2 outline-none focus-none"
                    value={suggestionField.value.description}
                    onChange={(e) =>
                      suggestionField.set({
                        ...suggestionField.value,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                {/* post button */}
                <div className="ml-auto">
                  <Button
                    name={'Post Suggestion'}
                    color={'bg-pink'}
                    handler={handlePostSubmission}
                  />
                </div>
              </div>

              {/* suggestions */}
              <div className="h-full grid gap-3">
                {project?.suggestions?.map((suggestion) => (
                  <Suggestion
                    key={suggestion.id}
                    suggestion={suggestion}
                    firstName={
                      user.firstName[0].toUpperCase() + user.firstName.slice(1)
                    }
                    lastName={
                      user.lastName[0].toUpperCase() + user.lastName.slice(1)
                    }
                    id={suggestion.id}
                  />
                ))}
              </div>
            </div>
          </section>
        </Main>
      </Layout>
    </Foundation>
  )
}

export default Suggestions

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
      suggestions: {
        include: {
          votes: true,
        },
      },
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
