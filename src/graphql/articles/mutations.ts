export const mutations = `#graphql
  createArticle(title: String!, thumbnail: String!, preface: String!, body: String!, category: String!, tags: [String!]!): Article!
  updateArticle(id: String!, title: String!, thumbnail: String!, preface: String!, body: String!, category: String!, tags: [String!]!): Article!
`
