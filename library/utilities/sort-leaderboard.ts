import { IMember } from "../schemas/interfaces";

type SortLeaderBoard = (members: IMember[], ascending?: boolean) => IMember[]

const sortLeaderBoard: SortLeaderBoard = (members, ascending = true) => {
  for (let i = 0; i < members.length; i++) {
    for (let j = 0; j < members.length - 1; j++) {
      if (ascending) {
        if (members[j].rating < members[j + 1].rating) continue
        ;[members[j], members[j + 1]] = [members[j + 1], members[j]]
        continue
      }
      if (members[j].rating > members[j + 1].rating) continue
      ;[members[j], members[j + 1]] = [members[j + 1], members[j]]
    }
  }
  return members
}

export default sortLeaderBoard
