import { useState } from "react"
import { IRole } from "../../library/schemas/interfaces"
import Sidebar from "../sidebar/sidebar"
import Option from "./option"

interface IProps {
  role: IRole
}

const ProjectRole = ({role} :IProps) => {
  console.log(role)
  return (
    <div className="bg-white shadow-md shadow-violet grid gap-5 hover:-translate-y-2 transition-all duration-500 px-5 py-4">
      <div className="grid grid-cols-[1fr,auto] gap-5 items-center ">
        {/* role name */}
        <p className="font-medium tracking-wide w-[90%] whitespace-wrap">
          {role.name}
        </p>

       {/* option */}
       <Option role={role}/>
      </div>
    </div>
  )
}

export default ProjectRole
