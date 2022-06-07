import { TMark, TStatus } from '../types'
import IMember from './member'
import IParticipant from './participant'
import IProject from './project'
import IVote from './vote'

interface ISuggestion {
  id: string
  name: string
  description: string
  rate: number
  status: TStatus
  createdAt: string | Date
  updatedAt: string | Date
  member?: IMember
  memberId: string
  project?: IProject
  projectId: string
  participants?: IParticipant[]
  votes: IVote[]
}

export default ISuggestion
