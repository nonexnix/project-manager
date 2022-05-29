import { StarIcon } from "@heroicons/react/solid"

const TopRank = () => {
  return (
    <div className="grid gap-4 items-center bg-white shadow-md shadow-violet py-4 px-6 cursor-pointer hover:-translate-y-1 transition-all duration-500">
      <div className="flex flex-col items-center gap-1">
        {/* picture and star */}
        <div className="relative w-10 h-10 -ml-6 border-[2px] border-gray-200 rounded-full grid items-center justify-center">
          <div className="w-8 h-8 bg-blue rounded-full"></div>
          <StarIcon className="w-5 h-5 text-yellow-500 absolute -bottom-1 left-6" />
        </div>
        {/* name */}
        <h1 className="text-xs font-medium tracking-wide mr-4">
          Jazztine Cruz
        </h1>
      </div>

      <h2 className="text-hotpink text-center font-bold text-lg tracking-wider mr-4">
        500 POINTS
      </h2>
    </div>
  )
}

export default TopRank
