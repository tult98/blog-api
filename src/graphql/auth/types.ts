export const types = `
  input UserCreateInput {
    email: String!
    firstName: String!
    lastName: String!
    fullName: String!
    password: String!
    confirmPassword: String!
  }

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
`
