import { Article } from './articles'
import { Category } from './categories'
import { Auth } from './auth'

const resolvers = {
  Query: {
    ...Auth.resolvers.queries,
    ...Article.resolvers.queries,
    ...Category.resolvers.queries,
  },
  Mutation: {
    ...Auth.resolvers.mutations,
    ...Article.resolvers.mutations,
    ...Category.resolvers.mutations,
  },
}

export default resolvers
