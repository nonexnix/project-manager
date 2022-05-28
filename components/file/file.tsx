import useClientStore from '../../library/stores/client'
import phase from '../../library/utilities/phase'
import Option from './option'
import Status from './status'

const File = () => {
  const files = useClientStore((state) => state.project.files)

  return (
    <>
      {files?.map((file) => (
        <div
          key={file.id}
          className="bg-white shadow-md shadow-violet grid gap-5 hover:-translate-y-2 transition-all duration-500 px-5 py-4"
        >
          <div className="grid grid-cols-[1fr,auto] gap-5 items-center ">
            {/* name */}
            <p className="font-medium tracking-wide w-[90%] whitespace-wrap">
              {file.name}.{file.extension}
            </p>

            {/* option button */}
            <Option id={file.id}/>
          </div>

          {/* date */}
          <div className="grid grid-cols-[1fr,auto] items-center">
            <h1 className="text-xs tracking-wide text-gray-500">
              {String(phase(file.createdAt, 'LL'))}
            </h1>

            {/* file status */}
            <Status id={file.id} status={file.status}/>
          </div>
        </div>
      ))}
    </>
  )
}

export default File
