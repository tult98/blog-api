export const mutations = `#graphql
  createCategory(title: String!, description: String!): Category!
  deleteCategory(id: String!): DeletedCategory
`
