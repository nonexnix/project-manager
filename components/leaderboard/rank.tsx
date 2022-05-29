import Profile from '../members/profile'

const Rank = () => {
  return (
    <div className="grid grid-cols-[auto,auto,1fr,auto] gap-10 items-center px-10 py-2 bg-white shadow-md shadow-violet cursor-pointer hover:bg-snow transition-colors duration-300">
      <span className="font-medium text-xs mr-12">4</span>
      <Profile />
      <h1 className="tracking-wide font-medium ml-6">Jazztine Cruz</h1>
      <h2 className="text-hotpink font-semibold">500 points</h2>
    </div>
  )
}

export default Rank
