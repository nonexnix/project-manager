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
            {/* name and due date */}
            <div className="grid gap-1">
              <div className="text-md md:text-xl leading-relaxed font-semibold">
                {member?.project?.name}
              </div>
              <div className="text-sm leading-relaxed">
                {String(phase(member?.project?.dueAt!, 'LL'))}
              </div>
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
            <div className="grid grid-flow-col items-center mb-16">
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
            {/* progress bar */}
            <div>
              <div className="grid grid-flow-col items-center">
                <h1 className="text-xs text-gray-500">Completeness</h1>
                <h1 className="text-xs text-gray-500 ml-auto">60%</h1>
              </div>
              <div className="relative w-full h-4 mt-1 border-[1px] border-gray-200 rounded-full">
                <div className="absolute left-0 top-0 w-[60%] h-full bg-green-500 rounded-full"></div>
              </div>
            </div>
          </SnowCard>
        </WhiteCard>
      </div>
    </Link>
  )
}

export default Project
