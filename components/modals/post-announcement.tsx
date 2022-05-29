import { SpeakerphoneIcon } from "@heroicons/react/outline"
import useClientStore from "../../library/stores/client"
import useFieldStore from "../../library/stores/field"
import Button from "../button/button"
import Icon from "../icon/icon"

interface IProps {
  memberId:string
  projectId:string
  handler:any
}

const PostAnnouncement = ({memberId, projectId, handler}: IProps) => {

  const postAnnouncement = useClientStore((state) => state.create.announcement)
  const announcementField = useFieldStore((state) => state.announcement)

  const handlePostAnnouncement = () => {
    postAnnouncement({
      name:announcementField.value.name,
      description: announcementField.value.description,
      memberId:memberId,
      projectId: projectId,
    })

    announcementField.clear()

    console.log("name" + announcementField.value.name)
    console.log("description" + announcementField.value.description)
  }

  return (
    <div className="absolute -top-64 left-0 bottom-0 right-0  w-full grid justify-center items-center z-50">
      <div className="bg-white w-md shadow-xl shadow-violet px-8 py-6 z-50">
        {/* title logo */}
        <div className="flex items-center gap-3">
          <Icon icon={<SpeakerphoneIcon />} />
          <h1 className="text-md font-semibold">Post Announcement</h1>
        </div>

        {/* Submit File field */}
        <div className="mt-8">
          {/* file */}
          <input
            type="text"
            className="bg-snow py-3 pl-4 outline-none w-full"
            placeholder="Announcement Title"
            value={announcementField.value.name}
            onChange={(e) => announcementField.set({ ...announcementField.value, name: e.target.value })}
          />

          {/* description */}
          <textarea
            className="bg-snow py-3 pl-4 outline-none w-full mt-3"
            placeholder="What is your Announcement?"
            value={announcementField.value.description}
            onChange={(e) => announcementField.set({ ...announcementField.value, description: e.target.value })}
          />
        </div>

        {/* buttons */}
        <div className="flex items-center gap-3 ml-auto mt-8">
          <button onClick={handler} className="border-[1px] border-gray-200 rounded-md bg-transparent px-4 py-2 text-sm hover:text-red-500 transition-all duration-300 hover:scale-105">
            Cancel
          </button>
          <Button name="Post Announcement" color={'bg-blue'} handler={handlePostAnnouncement}/>
        </div>
      </div>
    </div>
  )
}

export default PostAnnouncement