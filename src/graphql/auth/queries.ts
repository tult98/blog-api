export const queries = `#graphql
  login(email: String!, password: String!): LoginToken
  getNewToken(refreshToken: String!): LoginToken
  me: User
`
