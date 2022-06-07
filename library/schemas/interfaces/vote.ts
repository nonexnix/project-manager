import { TMark } from '../types'
import IMember from './member'
import ISuggestion from './suggestion'

interface IVote{
  id: string
  memberId: string
  suggestionId: string
  member?: IMember
  suggestion?: ISuggestion
  mark?: TMark
}

export default IVote