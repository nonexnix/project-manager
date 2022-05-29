import { StarIcon } from "@heroicons/react/solid"
import TopRank from "./top-rank"

const TopRanks = () => {
  return (
    <div className='w-full grid md:grid-cols-3 gap-6'>
      <TopRank/>
      <TopRank/>
      <TopRank/>
    </div>
  )
}

export default TopRanks