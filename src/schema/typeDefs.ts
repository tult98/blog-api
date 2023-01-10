export const typeDefs = `#graphql
  type Query {
    users: [User]
  }

  type User {
    email: String!
    firstName: String!
    lastName: String!
  }
`
