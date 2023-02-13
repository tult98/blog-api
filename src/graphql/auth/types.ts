export const types = `#graphql
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    fullName: String!
    role: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type LoginToken {
    accessToken: String!,
    refreshToken: String!
  }
`
