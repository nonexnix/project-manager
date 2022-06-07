import React from 'react'

interface IProps {
  label:string
}

const Permission = ({label} : IProps) => {
  return (
    <div className='flex items-center gap-6 border-[1px] border-gray-200 py-3 px-4'>
      <input type="checkbox"/>
      <h4 className="text-sm font-medium">{label}</h4>
    </div>
  )
}

export default Permission