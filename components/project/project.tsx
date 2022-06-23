import WhiteCard from '../card/white-card'
import IconLabel from '../icon/icon-with-label'
import {
  CollectionIcon,
  MenuIcon,
  SpeakerphoneIcon,
} from '@heroicons/react/outline'
import { PencilAltIcon } from '@heroicons/react/outline'
import { FolderOpenIcon } from '@heroicons/react/outline'
import { LightBulbIcon } from '@heroicons/react/outline'
import SnowCard from '../card/snow-card'
import Profile from '../members/profile'
import phase from '../../library/utilities/phase'
import Link from 'next/link'
import { IMember } from '../../library/schemas/interfaces'
import Linker from '../link/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useClientStore from '../../library/stores/client'
import Icon from '../icon/icon'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import ProjectCodeModal from '../modals/copy-code'

interface IProps {
  member: IMember
}

const Project = ({ member }: IProps) => {
  const [isOpenOption, setIsOpenOption] = useState(false)
  const deleteProject = useClientStore((state) => state.delete.project)
  const completeProject = useClientStore((state) => state.update.project.over)
  const updateMembership = useClientStore(
    (state) => state.update.member?.active
  )
  const [copyCode, setCopyCode] = useState(false)
  return (
    <div>
      <Link href={`/connect/${member?.userId}/view/${member.id}/dashboard`}>
        <div className="lg:w-[500px] cursor-pointer hover:-translate-y-2 transiton-all duration-500">
          <WhiteCard>
            <div className="grid gap-4">
              <div className="grid grid-cols-[1fr,auto] items-center">
                {/* name */}
                <div className="text-md md:text-lg font-medium">
                  {member?.project?.name}
                </div>

                <button
                  className="absolute right-4 top-3"
                  onClick={() => setIsOpenOption(!isOpenOption)}
                >
                  <Icon icon={<DotsHorizontalIcon />} />
                </button>

                {isOpenOption && (
                  <div className="absolute top-11 right-7 bg-white shadow-md shadow-violet grid z-50">
                    {/* Set as done */}
                    {member!.project!.over === true ? (
                      <button
                        onClick={() =>
                          completeProject({
                            id: member!.project!.id,
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
                            id: member!.project!.id,
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

                    {/* Copy Code */}
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
                        code={member.project!.code}
                      />
                    )}

                    {/* Delete Project */}
                    <button onClick={() => deleteProject({ id: member.id })}>
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
                      onClick={() =>
                        updateMembership({
                          id: member?.id,
                          key: 'active',
                          value: false,
                        })
                      }
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

              {/* projectmember members */}
              <div className="flex items-center gap-3 ml-4">
                {member?.project?.members?.map((member) => (
                  <Profile key={member?.id} />
                ))}
                {member?.project!.members!.length > 5 && (
                  <h1 className="text-sm ml-5 text-gray-500">
                    + {member?.project!.members!.length - 5} more
                  </h1>
                )}
              </div>

              {/* user's contribution */}
              <div className="grid grid-flow-col items-center mb-12">
                <IconLabel
                  icon={<CollectionIcon />}
                  label={member?.project?.files?.length}
                />
                <IconLabel
                  icon={<FolderOpenIcon />}
                  label={member?.project?.files?.length}
                />
                <IconLabel
                  icon={<SpeakerphoneIcon />}
                  label={member?.project?.announcements?.length}
                />
                <IconLabel
                  icon={<LightBulbIcon />}
                  label={member?.project?.suggestions?.length}
                />
              </div>
            </div>

            <SnowCard>
              <div className="grid grid-cols-[1fr,auto] items-center">
                {/* start and due date */}
                <div className="text-sm tracking-wide">
                  {String(phase(member!.project!.createdAt, 'LL'))} -{' '}
                  {String(phase(member!.project!.dueAt, 'LL'))}
                </div>
                {/* completeness */}
                {/* completeness */}
                {String(phase(Date.now(), 'LL')) >
                String(phase(member.project?.dueAt!, 'LL')) ? (
                  <h1 className="text-red-600 font-bold tracking-wide">
                    Overdue
                  </h1>
                ) : (
                  <div>
                    {member.project!.over === true ? (
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
            </SnowCard>
          </WhiteCard>
        </div>
      </Link>
    </div>
  )
}

export default Project
