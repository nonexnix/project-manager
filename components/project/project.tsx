import WhiteCard from '../card/white-card'
import IconLabel from '../icon/icon-with-label'
import { CollectionIcon, SpeakerphoneIcon } from '@heroicons/react/outline'
import { PencilAltIcon } from '@heroicons/react/outline'
import { FolderOpenIcon } from '@heroicons/react/outline'
import { LightBulbIcon } from '@heroicons/react/outline'
import SnowCard from '../card/snow-card'
import Profile from '../members/profile'
import phase from '../../library/utilities/phase'
import Link from 'next/link'
import { IMember } from '../../library/schemas/interfaces'

interface IProps {
  member: IMember
}

const Project = ({ member }: IProps) => {
  return (
    <Link href={`/connect/${member?.userId}/view/${member.id}/dashboard`}>
      <div className="lg:w-[500px] cursor-pointer hover:-translate-y-2 transiton-all duration-500">
        <WhiteCard>
          <div className="grid gap-4">
            {/* name */}
            <div className="text-md md:text-xl leading-relaxed font-semibold">
              {member?.project?.name}
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
              {member.project?.over === true ? (
                <h1 className="text-green-600 font-bold tracking-wide">
                  Completed
                </h1>
              ) : (
                <h1 className="text-red-600 font-bold tracking-wide">
                  Incomplete
                </h1>
              )}
            </div>
          </SnowCard>
        </WhiteCard>
      </div>
    </Link>
  )
}

export default Project
