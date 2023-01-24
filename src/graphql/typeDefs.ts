import { Auth } from './auth'

const typeDefs = `#graphql
  scalar Date

  # types from submodules
  ${Auth.types}
  # queries
  type Query {
    ${Auth.queries}
  }
  # mutations
  type Mutation {
    ${Auth.mutations}
  }
`
export default typeDefs
