export const types = `#graphql
  type Article {
    id: ID!
    title: String!
    slug: String!
    preface: String!
    body: String!
    category: String
    tags: [String!]!
    createdAt: Date!
    updatedAt: Date!
  }
`
