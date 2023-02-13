import { Article } from './articles'
import { Auth } from './auth'

const resolvers = {
  Query: {
    ...Auth.resolvers.queries,
    ...Article.resolvers.queries,
  },
  Mutation: {
    ...Auth.resolvers.mutations,
    ...Article.resolvers.mutations,
  },
}

export default resolvers
