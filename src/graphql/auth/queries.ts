export const queries = `#graphql
  login(input: CredentialsInput!): Tokens
  getNewToken(refreshToken: String!): Tokens
  me: User
`
