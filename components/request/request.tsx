const Request = () => {
  return (
    <div className="bg-white shadow-md shadow-violet grid gap-5 hover:-translate-y-2 transition-all duration-500 px-5 py-4 cursor-pointer">
      {/* name */}
      <p className="font-medium tracking-wide w-[90%] whitespace-wrap">
        Jazztine Cruz
      </p>

      {/* request status */}
      <div className='ml-auto flex items-center gap-5'>
        <button className="px-4 py-2 text-xs text-white bg-green-600 font-medium hover:bg-green-700 rounded-md transition-colors duration-500">
          Approved
        </button>

        <button className="px-4 py-2 text-xs text-white bg-red-600 font-medium hover:bg-red-700 rounded-md transition-colors duration-500">
          Declined
        </button>
      </div>
    </div>
  )
}

export default Request
