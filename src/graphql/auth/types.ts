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

  type Tokens {
    accessToken: String!,
    refreshToken: String!
    expiresAt: Date!
  }

  input AccountInput {
    email: String!
    firstName: String!
    lastName: String!
    fullName: String!
    password: String!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }
`
