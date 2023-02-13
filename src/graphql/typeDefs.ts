import { Article } from './articles'
import { Auth } from './auth'

const typeDefs = `#graphql
  scalar Date

  # types from submodules
  ${Auth.types}
  ${Article.types}
  # queries
  type Query {
    ${Auth.queries}
    ${Article.queries}
  }
  # mutations
  type Mutation {
    ${Auth.mutations}
    ${Article.mutations}
  }
`
export default typeDefs
