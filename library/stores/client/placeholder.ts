import type { IMember, IMessage, IProject, ITask, IUser } from '../../schemas/interfaces'

const placeholder: { user: IUser; member: IMember; project: IProject; task:ITask; messages: IMessage[] } = {
  user: {
    id: '',
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    image: '',
    createdAt: '',
    updatedAt: '',
  },
  member: {
    id: '',
    rating: 100,
    active: true,
    createdAt: '',
    updatedAt: '',
    userId: '',
    projectId: '',
  },
  project: {
    id: '',
    name: '',
    description: '',
    code: '',
    preserve: true,
    over: false,
    createdAt: '',
    updatedAt: '',
    dueAt: '',
    userId: '',
  },
  task: {
    id: '',
    name: '',
    description: '',
    over: false,
    createdAt: '',
    updatedAt: '',
    dueAt: '',
    rate: 10,
    memberId: '',
    projectId: '',
    priority: 'LOW'
  },
  messages: [],
}

export default placeholder
