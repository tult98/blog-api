import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    email: String!
    firstName: String!
    lastName: String!
  }
`
