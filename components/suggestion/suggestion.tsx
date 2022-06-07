import {
  DotsHorizontalIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'
import cuid from 'cuid'
import { useEffect, useState } from 'react'
import { ISuggestion } from '../../library/schemas/interfaces'
import IVote from '../../library/schemas/interfaces/vote'
import { TMark } from '../../library/schemas/types'
import useClientStore from '../../library/stores/client'
import useFieldStore from '../../library/stores/field'
import Icon from '../icon/icon'
import Linker from '../link/link'
import EditSuggestion from '../modals/edit-suggestion'
import SuggestionStatus from './status'

interface IProps {
  suggestion: ISuggestion
  firstName: string
  lastName: string
  id: string
}

const Suggestion = ({ suggestion, firstName, lastName, id }: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [votes, setVotes] = useState(suggestion.votes)
  const deleteSuggestion = useClientStore((state) => state.delete.suggestion)
  const createMark = useClientStore((state) => state.create.vote)
  const updateMark = useClientStore((state) => state.update.vote.mark)
  const deleteMark = useClientStore((state) => state.delete.vote)
  const member = useClientStore((state) => state.member)
  const [colorMyVote, setColorMyVote] = useState({
    positive: 'text-slate-500',
    neutral: 'text-slate-500',
    negative: 'text-slate-500',
  })
  const updateSuggestionName = useClientStore(
    (state) => state.update.suggestion.name
  )
  const updateSuggestionDescription = useClientStore(
    (state) => state.update.suggestion.description
  )
  const suggestionField = useFieldStore((state) => state.suggestion)

  const handleVote = (mark: TMark) => {
    const myVote = votes.filter((vote) => {
      if (vote.memberId === member.id) {
        return vote
      }
    })

    if (myVote.length > 0 && myVote[0].mark === mark) {
      const updatedVotes = votes.filter((vote) => {
        if (vote.memberId !== member.id) {
          return vote
        }
      })
      setVotes(updatedVotes)
      deleteMark({ id: myVote[0].id })
    } else if (myVote.length > 0) {
      const updatedVotes = votes.map((vote) => {
        if (vote.memberId === member.id) {
          return {
            ...vote,
            mark: mark,
          }
        }
        return vote
      })
      setVotes(updatedVotes)
      updateMark({
        id: myVote[0].id,
        key: 'mark',
        value: mark,
      })
    } else {
      const voteId = cuid()
      const updatedVotes = [
        ...votes,
        {
          id: voteId,
          memberId: member.id,
          suggestionId: suggestion.id,
          mark: mark,
        },
      ]
      setVotes(updatedVotes)
      createMark({
        id: voteId,
        mark: mark,
        memberId: member.id,
        suggestionId: suggestion.id,
      })
    }
  }

  useEffect(() => {
    for (const vote of votes) {
      if (vote.memberId === member.id) {
        if (vote.mark === 'POSITIVE') {
          setColorMyVote({
            positive: 'text-green-500',
            neutral: 'text-slate-500',
            negative: 'text-slate-500',
          })
        } else if (vote.mark === 'NEUTRAL') {
          setColorMyVote({
            positive: 'text-slate-500',
            neutral: 'text-yellow-500',
            negative: 'text-slate-500',
          })
        } else {
          setColorMyVote({
            positive: 'text-slate-500',
            neutral: 'text-slate-500',
            negative: 'text-red-500',
          })
        }
      } else {
        setColorMyVote({
          positive: 'text-slate-500',
          neutral: 'text-slate-500',
          negative: 'text-slate-500',
        })
      }
    }
  }, [votes])

  return (
    <div className="bg-white py-5 px-8 grid gap-8">
      <div className="grid grid-cols-[1fr,auto] items-center">
        {/* title & description */}
        <div className="grid gap-3">
          <h1 className="leading-relaxed font-semibold tracking-wide">
            {suggestion.name}
          </h1>
          <p className="leading-relaxed text-sm tracking-wide">
            {suggestion.description}
          </p>
        </div>
        {/* options */}
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Icon icon={<DotsHorizontalIcon />} />
          </button>

          {isOpen && (
            <div className="absolute top-6 right-0 bg-white shadow-md shadow-violet">
              {/* Edit Suggestion */}
              <button onClick={() => setIsEdit(true)}>
                <Linker
                  name={'Edit Suggestion'}
                  link={'#'}
                  style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                />
              </button>

              {isEdit && (
                <EditSuggestion
                  defaultTitle={suggestion.name}
                  titleHandler={(e: any) =>
                    suggestionField.set({
                      ...suggestionField.value,
                      name: e.target.value,
                    })
                  }
                  btnTitle={() =>
                    updateSuggestionName({
                      id: suggestion.id,
                      key: 'name',
                      value: suggestionField.value.name,
                    })
                  }
                  defaultDescription={suggestion.description}
                  descriptionHandler={(e: any) =>
                    suggestionField.set({
                      ...suggestionField.value,
                      description: e.target.value,
                    })
                  }
                  btnDescription={() =>
                    updateSuggestionDescription({
                      id: suggestion.id,
                      key: 'description',
                      value: suggestionField.value.description,
                    })
                  }
                  cancelBtn={() => setIsEdit(false)}
                />
              )}

              {/* Delete Suggestion */}
              <button onClick={() => deleteSuggestion({ id: id })}>
                <Linker
                  name={'Delete Suggestion'}
                  link={'#'}
                  style={'py-4 px-8 hover:bg-snow transition-all duration-300'}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr,auto] items-center gap-8">
        {/* created by and reactions */}
        <div className="flex items-center gap-16">
          {/* created by */}
          <h1 className="text-xs text-gray-500 tracking-wide">
            Posted by {firstName} {lastName}
          </h1>

          {/* reactions */}
          <div className="flex items-center gap-5 ml-12 md:ml-0">
            <div className="flex items-center gap-3">
              <button onClick={() => handleVote('POSITIVE')}>
                <ThumbUpIcon
                  className={`${
                    colorMyVote!.positive
                  } w-5 h-5 cursor-pointer hover:scale-125 transiton-all duration-300`}
                />
              </button>
              <span className="font-medium">
                {votes.filter((vote) => vote.mark === 'POSITIVE').length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => handleVote('NEUTRAL')}>
                <ThumbUpIcon
                  className={`${
                    colorMyVote!.neutral
                  } w-5 h-5 cursor-pointer -rotate-90 hover:scale-125 transiton-all duration-300`}
                />
              </button>

              <span className="font-medium">
                {votes.filter((vote) => vote.mark === 'NEUTRAL').length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => handleVote('NEGATIVE')}>
                <ThumbDownIcon
                  className={`${
                    colorMyVote!.negative
                  } w-5 h-5 cursor-pointer hover:scale-125 transiton-all duration-300`}
                />
              </button>

              <span className="font-medium">
                {votes.filter((vote) => vote.mark === 'NEGATIVE').length}
              </span>
            </div>
          </div>
        </div>

        {/* status */}
        <SuggestionStatus suggestion={suggestion} />
      </div>
    </div>
  )
}

export default Suggestion
