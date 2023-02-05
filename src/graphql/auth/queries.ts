export const queries = `#graphql
  user(id: ID!): User
  login(email: String!, password: String!): LoginToken
`
