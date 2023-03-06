export const mutations = `#graphql
  createCategory(input: CategoryInput): Category
  updateCategory(id: ID!, input: CategoryInput): Category
  deleteCategory(id: ID!): DeletedCategory
`
