import { Article } from './articles'
import { Category } from './categories'
import { Auth } from './auth'

const typeDefs = `#graphql
  scalar Date

  # types from submodules
  ${Auth.types}
  ${Article.types}
  ${Category.types}
  # queries
  type Query {
    ${Auth.queries}
    ${Article.queries}
    ${Category.queries}
  }
  # mutations
  type Mutation {
    ${Auth.mutations}
    ${Article.mutations}
    ${Category.mutations}
  }
`
export default typeDefs
