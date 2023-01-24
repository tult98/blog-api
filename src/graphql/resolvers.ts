import { Auth } from './auth'

const resolvers = {
  Query: {
    ...Auth.resolvers.queries,
  },
  Mutation: {
    ...Auth.resolvers.mutations,
  },
}

export default resolvers
