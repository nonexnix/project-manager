import { useState } from 'react'
import { ISuggestion } from '../../library/schemas/interfaces'
import useClientStore from '../../library/stores/client'

interface IProps {
  suggestion: ISuggestion
}
const SuggestionStatus = ({suggestion}: IProps) => {
  const updateSuggestionStatus = useClientStore(
    (state) => state.update.suggestion.status
  )


  return (
    <div className="flex items-center gap-3 mt-4 md:mt-0">
      {suggestion.status === 'PENDING' && (
        <button
          onClick={() => {
            updateSuggestionStatus({ id: suggestion.id, key: 'status', value: 'APPROVED' })
            console.log(suggestion.status)
          }}
          className="px-4 py-2 text-xs text-white bg-green-600 font-medium hover:bg-green-700 rounded-md transition-colors duration-500"
        >
          Approved
        </button>
      )}
      {/* approved suggestion.status */}
      {suggestion.status === 'APPROVED' && (
        <button
          className="hidden px-4 py-2 text-xs text-white bg-green-600 font-medium hover:bg-green-700 rounded-md transition-colors duration-500"
        >
          Approved
        </button>
      )}

      {/* approved result */}
      {suggestion.status === 'APPROVED' && (
        <h1 className="text-sm tracking-wide text-green-600 font-semibold cursor-pointer">
          Approved
        </h1>
      )}

      {/* pending suggestion.status */}
      {suggestion.status === 'PENDING' && (
        <button
          onClick={() =>
            updateSuggestionStatus({
              id: suggestion.id,
              key: 'status',
              value: 'DECLINED',
            })
          }
          className="px-4 py-2 text-xs text-white bg-red-500 font-medium hover:bg-red-700 rounded-md transition-colors duration-500"
        >
          Decline
        </button>
      )}

      {/* decline suggestion.status */}
      {suggestion.status === 'DECLINED' && (
        <button
          onClick={() =>
            updateSuggestionStatus({
              id: suggestion.id,
              key: 'status',
              value: 'DECLINED',
            })
          }
          className="hidden px-4 py-2 text-xs text-white bg-red-500 font-medium hover:bg-red-700 rounded-md transition-colors duration-500"
        >
          Decline
        </button>
      )}

      {/* declined result */}
      {suggestion.status === 'DECLINED' && (
        <h1 className="text-sm tracking-wide text-red-600 font-semibold cursor-pointer">
          Declined
        </h1>
      )}
    </div>
  )
}

export default SuggestionStatus
